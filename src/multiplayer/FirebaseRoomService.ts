import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { GameAction, GameState } from '../game/types';
import { firebaseConfig, isFirebaseConfigured } from './firebaseConfig';
import { generateRoomCode, RoomInfo, RoomService } from './RoomService';

/**
 * Online kamers via Cloud Firestore.
 *
 * Structuur:
 *   rooms/{code}            → { hostId, createdAt, state? (JSON van GameState) }
 *   rooms/{code}/actions/*  → { playerId, action (JSON), createdAt }
 *
 * De host luistert op de actions-collectie, voert acties uit met de
 * reducer uit src/game en schrijft de nieuwe staat terug op het kamerdocument.
 * Alle spelers luisteren op het kamerdocument voor de actuele staat.
 */
export class FirebaseRoomService implements RoomService {
  private db;
  private selfId = `speler-${Math.random().toString(36).slice(2, 10)}`;

  constructor() {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is niet geconfigureerd; zie src/multiplayer/firebaseConfig.ts.');
    }
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  async createRoom(hostName: string): Promise<RoomInfo> {
    const code = generateRoomCode();
    await setDoc(doc(this.db, 'rooms', code), {
      hostId: this.selfId,
      hostName,
      createdAt: serverTimestamp(),
      state: null,
    });
    return { code, selfId: this.selfId, isHost: true };
  }

  async joinRoom(code: string, playerName: string): Promise<RoomInfo> {
    const room = await getDoc(doc(this.db, 'rooms', code));
    if (!room.exists()) {
      throw new Error(`Kamer ${code} bestaat niet.`);
    }
    await addDoc(collection(this.db, 'rooms', code, 'actions'), {
      playerId: this.selfId,
      action: JSON.stringify({ type: 'JOIN', playerId: this.selfId, name: playerName }),
      createdAt: serverTimestamp(),
    });
    return { code, selfId: this.selfId, isHost: false };
  }

  async publishState(code: string, state: GameState): Promise<void> {
    await updateDoc(doc(this.db, 'rooms', code), { state: JSON.stringify(state) });
  }

  onState(code: string, listener: (state: GameState) => void): () => void {
    return onSnapshot(doc(this.db, 'rooms', code), (snapshot) => {
      const raw = snapshot.data()?.state;
      if (typeof raw === 'string') listener(JSON.parse(raw) as GameState);
    });
  }

  async sendAction(code: string, action: GameAction): Promise<void> {
    await addDoc(collection(this.db, 'rooms', code, 'actions'), {
      playerId: this.selfId,
      action: JSON.stringify(action),
      createdAt: serverTimestamp(),
    });
  }

  onAction(code: string, listener: (action: GameAction) => void): () => void {
    const seen = new Set<string>();
    const actions = query(
      collection(this.db, 'rooms', code, 'actions'),
      orderBy('createdAt', 'asc'),
      where('createdAt', '!=', null)
    );
    return onSnapshot(actions, (snapshot) => {
      for (const change of snapshot.docChanges()) {
        if (change.type !== 'added' || seen.has(change.doc.id)) continue;
        seen.add(change.doc.id);
        const raw = change.doc.data().action;
        if (typeof raw === 'string') listener(JSON.parse(raw) as GameAction);
      }
    });
  }

  async leaveRoom(code: string): Promise<void> {
    await addDoc(collection(this.db, 'rooms', code, 'actions'), {
      playerId: this.selfId,
      action: JSON.stringify({ type: 'LEAVE', playerId: this.selfId }),
      createdAt: serverTimestamp(),
    });
  }
}
