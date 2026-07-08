import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { hashString, mulberry32 } from '../game/rng';

/**
 * Procedureel gegenereerd, surrealistisch kaart-artwork.
 *
 * Elke kaart-id levert altijd exact dezelfde dromerige scène op: een lucht
 * met hemellichaam, zwevende eilanden of heuvels, en één symbolisch motief
 * (deur, sleutel, vogel, ballon, vuurtoren, ...). Dit is de basisset;
 * later kunnen echte illustraties of AI-gegenereerde beelden dezelfde
 * kaart-ids invullen zonder dat de spelregels veranderen.
 */

export const CARD_W = 100;
export const CARD_H = 140;

interface Palette {
  skyTop: string;
  skyBottom: string;
  land: string;
  landSoft: string;
  celestial: string;
  accent: string;
  detail: string;
}

const PALETTES: Palette[] = [
  { skyTop: '#2c2a4a', skyBottom: '#907ad6', land: '#1f1d36', landSoft: '#4f4a78', celestial: '#f7ecc9', accent: '#ffb997', detail: '#dabfff' },
  { skyTop: '#0b3954', skyBottom: '#5fa8d3', land: '#082a3d', landSoft: '#1b6a8f', celestial: '#fef9ef', accent: '#ffd166', detail: '#bee9e8' },
  { skyTop: '#5e3a5e', skyBottom: '#e8a09a', land: '#3d2645', landSoft: '#832161', celestial: '#fff3e4', accent: '#f9c784', detail: '#fbc3bc' },
  { skyTop: '#1a3a2a', skyBottom: '#a3c9a8', land: '#11241a', landSoft: '#3f6b4f', celestial: '#f4f9e9', accent: '#e9c46a', detail: '#cce3de' },
  { skyTop: '#232528', skyBottom: '#8d99ae', land: '#17181c', landSoft: '#495057', celestial: '#f8f7ff', accent: '#ef8354', detail: '#bfc0c0' },
  { skyTop: '#3a2e39', skyBottom: '#f4989c', land: '#241f24', landSoft: '#6c5b7b', celestial: '#fff8e8', accent: '#9ad1d4', detail: '#f2d0a4' },
  { skyTop: '#14213d', skyBottom: '#4361ee', land: '#0b132b', landSoft: '#3a506b', celestial: '#ffe8d6', accent: '#ffba08', detail: '#a9d6e5' },
  { skyTop: '#4a3f35', skyBottom: '#d4a373', land: '#332820', landSoft: '#7f5539', celestial: '#fefae0', accent: '#e07a5f', detail: '#ccd5ae' },
];

type MotifRenderer = (rand: () => number, p: Palette) => React.ReactElement;

/** Deur die zomaar in het landschap staat. */
const door: MotifRenderer = (rand, p) => {
  const x = 34 + rand() * 24;
  const y = 78 + rand() * 14;
  return (
    <G key="door">
      <Rect x={x} y={y} width={18} height={30} rx={2} fill={p.accent} />
      <Rect x={x + 3} y={y + 3} width={12} height={24} rx={1.5} fill={p.land} />
      <Circle cx={x + 13} cy={y + 16} r={1.4} fill={p.celestial} />
      <Rect x={x - 3} y={y + 29} width={24} height={2.5} rx={1.2} fill={p.landSoft} />
    </G>
  );
};

/** Zwevende sleutel. */
const key: MotifRenderer = (rand, p) => {
  const x = 36 + rand() * 24;
  const y = 46 + rand() * 26;
  return (
    <G key="key" rotation={-20 + rand() * 40} origin={`${x}, ${y}`}>
      <Circle cx={x} cy={y} r={6} fill="none" stroke={p.accent} strokeWidth={3} />
      <Line x1={x} y1={y + 6} x2={x} y2={y + 24} stroke={p.accent} strokeWidth={3} strokeLinecap="round" />
      <Line x1={x} y1={y + 20} x2={x + 6} y2={y + 20} stroke={p.accent} strokeWidth={3} strokeLinecap="round" />
      <Line x1={x} y1={y + 24} x2={x + 5} y2={y + 24} stroke={p.accent} strokeWidth={3} strokeLinecap="round" />
    </G>
  );
};

/** Vogel in vlucht (twee gebogen vleugels). */
const bird: MotifRenderer = (rand, p) => {
  const flock = 1 + Math.floor(rand() * 3);
  const items: React.ReactElement[] = [];
  for (let i = 0; i < flock; i++) {
    const x = 20 + rand() * 55;
    const y = 26 + rand() * 34;
    const s = 6 + rand() * 6;
    items.push(
      <Path
        key={`bird-${i}`}
        d={`M ${x - s} ${y} Q ${x - s / 2} ${y - s * 0.8} ${x} ${y} Q ${x + s / 2} ${y - s * 0.8} ${x + s} ${y}`}
        stroke={p.accent}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  return <G key="bird">{items}</G>;
};

/** Luchtballon. */
const balloon: MotifRenderer = (rand, p) => {
  const x = 30 + rand() * 36;
  const y = 34 + rand() * 22;
  return (
    <G key="balloon">
      <Path d={`M ${x} ${y - 14} C ${x + 14} ${y - 14} ${x + 12} ${y + 8} ${x} ${y + 14} C ${x - 12} ${y + 8} ${x - 14} ${y - 14} ${x} ${y - 14} Z`} fill={p.accent} />
      <Path d={`M ${x} ${y - 14} C ${x + 5} ${y - 14} ${x + 4} ${y + 8} ${x} ${y + 14} C ${x - 4} ${y + 8} ${x - 5} ${y - 14} ${x} ${y - 14} Z`} fill={p.detail} opacity={0.7} />
      <Line x1={x - 4} y1={y + 13} x2={x - 3} y2={y + 20} stroke={p.landSoft} strokeWidth={1} />
      <Line x1={x + 4} y1={y + 13} x2={x + 3} y2={y + 20} stroke={p.landSoft} strokeWidth={1} />
      <Rect x={x - 4} y={y + 20} width={8} height={6} rx={1.5} fill={p.landSoft} />
    </G>
  );
};

/** Vuurtoren met lichtbundel. */
const lighthouse: MotifRenderer = (rand, p) => {
  const x = 30 + rand() * 34;
  const y = 74;
  return (
    <G key="lighthouse">
      <Path d={`M ${x + 4} ${y + 6} L ${x + 40} ${y - 6} L ${x + 40} ${y + 10} Z`} fill={p.celestial} opacity={0.35} />
      <Path d={`M ${x - 5} ${y + 34} L ${x - 2} ${y} L ${x + 6} ${y} L ${x + 9} ${y + 34} Z`} fill={p.accent} />
      <Rect x={x - 2.5} y={y + 8} width={9} height={5} fill={p.celestial} opacity={0.85} />
      <Rect x={x - 2.5} y={y + 20} width={9} height={5} fill={p.celestial} opacity={0.85} />
      <Rect x={x - 3} y={y - 7} width={10} height={7} rx={1.5} fill={p.land} />
      <Circle cx={x + 2} cy={y - 3.5} r={2.2} fill={p.celestial} />
    </G>
  );
};

/** Eenzame boom. */
const tree: MotifRenderer = (rand, p) => {
  const x = 32 + rand() * 32;
  const y = 92 + rand() * 8;
  return (
    <G key="tree">
      <Path d={`M ${x} ${y} C ${x - 1} ${y - 10} ${x + 3} ${y - 16} ${x + 1} ${y - 26}`} stroke={p.landSoft} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <Circle cx={x + 1} cy={y - 30} r={9} fill={p.accent} opacity={0.9} />
      <Circle cx={x - 6} cy={y - 24} r={6} fill={p.accent} opacity={0.75} />
      <Circle cx={x + 9} cy={y - 24} r={6} fill={p.accent} opacity={0.75} />
    </G>
  );
};

/** Papieren bootje op golven. */
const boat: MotifRenderer = (rand, p) => {
  const x = 30 + rand() * 36;
  const y = 96 + rand() * 8;
  return (
    <G key="boat">
      <Path d={`M ${x - 12} ${y} L ${x + 12} ${y} L ${x + 6} ${y + 7} L ${x - 6} ${y + 7} Z`} fill={p.accent} />
      <Line x1={x} y1={y} x2={x} y2={y - 14} stroke={p.landSoft} strokeWidth={1.6} />
      <Path d={`M ${x} ${y - 14} L ${x + 10} ${y - 3} L ${x} ${y - 3} Z`} fill={p.detail} />
      <Path d={`M ${x - 20} ${y + 10} Q ${x - 14} ${y + 7} ${x - 8} ${y + 10} T ${x + 4} ${y + 10} T ${x + 16} ${y + 10}`} stroke={p.detail} strokeWidth={1.4} fill="none" opacity={0.8} />
    </G>
  );
};

/** Oog dat vanuit de hemel toekijkt. */
const eye: MotifRenderer = (rand, p) => {
  const x = 34 + rand() * 30;
  const y = 40 + rand() * 20;
  return (
    <G key="eye">
      <Path d={`M ${x - 15} ${y} Q ${x} ${y - 12} ${x + 15} ${y} Q ${x} ${y + 12} ${x - 15} ${y} Z`} fill={p.celestial} opacity={0.92} />
      <Circle cx={x} cy={y} r={5} fill={p.accent} />
      <Circle cx={x} cy={y} r={2.2} fill={p.land} />
    </G>
  );
};

/** Paraplu in de regen. */
const umbrella: MotifRenderer = (rand, p) => {
  const x = 34 + rand() * 30;
  const y = 66 + rand() * 16;
  return (
    <G key="umbrella">
      <Path d={`M ${x - 15} ${y} Q ${x} ${y - 18} ${x + 15} ${y} Z`} fill={p.accent} />
      <Line x1={x} y1={y} x2={x} y2={y + 20} stroke={p.landSoft} strokeWidth={2} strokeLinecap="round" />
      <Path d={`M ${x} ${y + 20} Q ${x + 3} ${y + 24} ${x + 6} ${y + 21}`} stroke={p.landSoft} strokeWidth={2} fill="none" strokeLinecap="round" />
    </G>
  );
};

/** Ladder de lucht in. */
const ladder: MotifRenderer = (rand, p) => {
  const x = 38 + rand() * 22;
  const rungs: React.ReactElement[] = [];
  for (let i = 0; i < 6; i++) {
    const y = 36 + i * 12;
    rungs.push(<Line key={`rung-${i}`} x1={x - 6} y1={y} x2={x + 6} y2={y} stroke={p.accent} strokeWidth={2} strokeLinecap="round" />);
  }
  return (
    <G key="ladder" rotation={-8 + rand() * 16} origin={`${x}, 70`}>
      <Line x1={x - 6} y1={28} x2={x - 6} y2={104} stroke={p.accent} strokeWidth={2.4} strokeLinecap="round" />
      <Line x1={x + 6} y1={28} x2={x + 6} y2={104} stroke={p.accent} strokeWidth={2.4} strokeLinecap="round" />
      {rungs}
    </G>
  );
};

/** Walvis die door de lucht zwemt. */
const whale: MotifRenderer = (rand, p) => {
  const x = 36 + rand() * 24;
  const y = 44 + rand() * 22;
  return (
    <G key="whale">
      <Path d={`M ${x - 20} ${y} Q ${x - 8} ${y - 14} ${x + 10} ${y - 6} Q ${x + 20} ${y - 2} ${x + 14} ${y + 5} Q ${x - 4} ${y + 12} ${x - 20} ${y} Z`} fill={p.accent} />
      <Path d={`M ${x + 12} ${y + 2} L ${x + 22} ${y - 4} L ${x + 20} ${y + 7} Z`} fill={p.accent} />
      <Circle cx={x - 12} cy={y - 1} r={1.6} fill={p.land} />
      <Path d={`M ${x - 14} ${y - 10} Q ${x - 12} ${y - 16} ${x - 8} ${y - 14}`} stroke={p.detail} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </G>
  );
};

/** Zandloper / klok voor tijd en herinnering. */
const hourglass: MotifRenderer = (rand, p) => {
  const x = 38 + rand() * 24;
  const y = 58 + rand() * 20;
  return (
    <G key="hourglass">
      <Circle cx={x} cy={y} r={13} fill={p.celestial} opacity={0.95} />
      <Circle cx={x} cy={y} r={13} fill="none" stroke={p.accent} strokeWidth={2} />
      <Line x1={x} y1={y} x2={x} y2={y - 8} stroke={p.land} strokeWidth={2} strokeLinecap="round" />
      <Line x1={x} y1={y} x2={x + 6} y2={y + 3} stroke={p.land} strokeWidth={1.6} strokeLinecap="round" />
    </G>
  );
};

const MOTIFS: MotifRenderer[] = [door, key, bird, balloon, lighthouse, tree, boat, eye, umbrella, ladder, whale, hourglass];

function stars(rand: () => number, p: Palette): React.ReactElement {
  const items: React.ReactElement[] = [];
  const count = 6 + Math.floor(rand() * 10);
  for (let i = 0; i < count; i++) {
    items.push(
      <Circle
        key={`star-${i}`}
        cx={rand() * CARD_W}
        cy={rand() * 70}
        r={0.5 + rand() * 1.1}
        fill={p.celestial}
        opacity={0.4 + rand() * 0.6}
      />
    );
  }
  return <G key="stars">{items}</G>;
}

function celestialBody(rand: () => number, p: Palette): React.ReactElement {
  const cx = 18 + rand() * 64;
  const cy = 18 + rand() * 26;
  const r = 9 + rand() * 14;
  const crescent = rand() < 0.45;
  return (
    <G key="celestial">
      <Circle cx={cx} cy={cy} r={r + 5} fill={p.celestial} opacity={0.16} />
      <Circle cx={cx} cy={cy} r={r} fill={p.celestial} />
      {crescent && <Circle cx={cx + r * 0.42} cy={cy - r * 0.18} r={r * 0.85} fill={p.skyTop} opacity={0.9} />}
    </G>
  );
}

function floatingIslands(rand: () => number, p: Palette): React.ReactElement {
  const items: React.ReactElement[] = [];
  const count = 1 + Math.floor(rand() * 2);
  for (let i = 0; i < count; i++) {
    const cx = 20 + rand() * 60;
    const cy = 58 + rand() * 22;
    const w = 14 + rand() * 16;
    items.push(
      <G key={`island-${i}`}>
        <Ellipse cx={cx} cy={cy} rx={w} ry={4.5} fill={p.landSoft} />
        <Path d={`M ${cx - w * 0.7} ${cy + 2} L ${cx - w * 0.2} ${cy + 12 + rand() * 8} L ${cx + w * 0.4} ${cy + 3} Z`} fill={p.landSoft} opacity={0.75} />
      </G>
    );
  }
  return <G key="islands">{items}</G>;
}

function ground(rand: () => number, p: Palette): React.ReactElement {
  const h1 = 104 + rand() * 10;
  const h2 = 112 + rand() * 10;
  return (
    <G key="ground">
      <Path d={`M 0 ${h1} Q ${25 + rand() * 20} ${h1 - 16} 55 ${h1} T ${CARD_W} ${h1 - 6} L ${CARD_W} ${CARD_H} L 0 ${CARD_H} Z`} fill={p.landSoft} opacity={0.85} />
      <Path d={`M 0 ${h2} Q ${30 + rand() * 25} ${h2 - 12} 65 ${h2} T ${CARD_W} ${h2 - 4} L ${CARD_W} ${CARD_H} L 0 ${CARD_H} Z`} fill={p.land} />
    </G>
  );
}

function rain(rand: () => number, p: Palette): React.ReactElement {
  const drops: React.ReactElement[] = [];
  for (let i = 0; i < 14; i++) {
    const x = rand() * CARD_W;
    const y = rand() * 90;
    drops.push(<Line key={`drop-${i}`} x1={x} y1={y} x2={x - 2} y2={y + 6} stroke={p.detail} strokeWidth={1} opacity={0.5} strokeLinecap="round" />);
  }
  return <G key="rain">{drops}</G>;
}

export interface CardArtProps {
  cardId: string;
  width: number;
}

function CardArtInner({ cardId, width }: CardArtProps): React.ReactElement {
  const rand = mulberry32(hashString(cardId));
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
  const motif = MOTIFS[Math.floor(rand() * MOTIFS.length)];
  const hasFloating = rand() < 0.5;
  const hasRain = rand() < 0.22;
  const gradientId = `sky-${cardId}`;

  return (
    <Svg width={width} height={(width * CARD_H) / CARD_W} viewBox={`0 0 ${CARD_W} ${CARD_H}`}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={palette.skyTop} />
          <Stop offset="1" stopColor={palette.skyBottom} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={CARD_W} height={CARD_H} fill={`url(#${gradientId})`} />
      {stars(rand, palette)}
      {celestialBody(rand, palette)}
      {hasFloating && floatingIslands(rand, palette)}
      {ground(rand, palette)}
      {motif(rand, palette)}
      {hasRain && rain(rand, palette)}
    </Svg>
  );
}

export const CardArt = React.memo(CardArtInner);
