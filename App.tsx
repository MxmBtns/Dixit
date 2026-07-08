import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { createGame, NewPlayer } from './src/game/engine';
import { reduce } from './src/game/engine';
import { GameSettings, GameState } from './src/game/types';
import { GameScreen } from './src/screens/GameScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { HostRoomScreen } from './src/screens/HostRoomScreen';
import { HowToPlayScreen } from './src/screens/HowToPlayScreen';
import { JoinRoomScreen } from './src/screens/JoinRoomScreen';
import { LobbyScreen } from './src/screens/LobbyScreen';
import { theme } from './src/theme';

type Route =
  | { name: 'home' }
  | { name: 'lobby' }
  | { name: 'host' }
  | { name: 'join' }
  | { name: 'howToPlay' }
  | { name: 'game'; state: GameState };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const goHome = () => setRoute({ name: 'home' });

  const startGame = (players: NewPlayer[], settings: GameSettings) => {
    const state = reduce(createGame(players, settings), { type: 'START_GAME' });
    setRoute({ name: 'game', state });
  };

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="dark" />
      {route.name === 'home' && (
        <HomeScreen
          onPassAndPlay={() => setRoute({ name: 'lobby' })}
          onHostRoom={() => setRoute({ name: 'host' })}
          onJoinRoom={() => setRoute({ name: 'join' })}
          onHowToPlay={() => setRoute({ name: 'howToPlay' })}
        />
      )}
      {route.name === 'lobby' && <LobbyScreen onStart={startGame} onBack={goHome} />}
      {route.name === 'host' && (
        <HostRoomScreen onBack={goHome} onPlayOnDevice={() => setRoute({ name: 'lobby' })} />
      )}
      {route.name === 'join' && <JoinRoomScreen onBack={goHome} />}
      {route.name === 'howToPlay' && <HowToPlayScreen onBack={goHome} />}
      {route.name === 'game' && (
        <GameScreen key={route.state.seed} initialState={route.state} onExit={goHome} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
