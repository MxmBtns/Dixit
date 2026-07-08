import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { hashString, mulberry32 } from '../game/rng';

const VW = 400;
const VH = 800;

interface Star {
  cx: number;
  cy: number;
  r: number;
  o: number;
}

/**
 * Dromerige sterrennacht als achtergrond voor de homepagina: een paarse
 * hemel met een gloeiende maan, verre sterren en zachte silhouet-heuvels.
 * De sterren staan vast (deterministische seed), zodat het beeld rustig blijft.
 */
export function NightSky() {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(hashString('dixit-night-sky'));
    const arr: Star[] = [];
    for (let i = 0; i < 96; i++) {
      arr.push({
        cx: rand() * VW,
        cy: rand() * VH * 0.8,
        r: 0.4 + rand() * 1.7,
        o: 0.3 + rand() * 0.6,
      });
    }
    return arr;
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#140a2e" />
            <Stop offset="0.45" stopColor="#2a1650" />
            <Stop offset="0.8" stopColor="#43296f" />
            <Stop offset="1" stopColor="#5a3a7f" />
          </LinearGradient>
          <RadialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#fdf3d0" stopOpacity="0.85" />
            <Stop offset="0.35" stopColor="#fdf3d0" stopOpacity="0.35" />
            <Stop offset="1" stopColor="#fdf3d0" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="nebula" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#c77dff" stopOpacity="0.32" />
            <Stop offset="1" stopColor="#c77dff" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="nebula2" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#7b6cf0" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#7b6cf0" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Rect x="0" y="0" width={VW} height={VH} fill="url(#sky)" />

        {/* Zachte nevels voor diepte */}
        <Circle cx={90} cy={470} r={230} fill="url(#nebula)" />
        <Circle cx={340} cy={250} r={190} fill="url(#nebula2)" />

        {/* Maan met gloed */}
        <Circle cx={306} cy={130} r={120} fill="url(#moonGlow)" />
        <Circle cx={306} cy={130} r={42} fill="#fdf3d0" />
        <Circle cx={306} cy={130} r={42} fill="#fffdf3" opacity={0.25} />

        {/* Sterren */}
        {stars.map((s, i) => (
          <Circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fffaf0" opacity={s.o} />
        ))}

        {/* Silhouet-heuvels onderaan */}
        <Path
          d={`M0 ${VH - 150} Q ${VW * 0.25} ${VH - 220} ${VW * 0.5} ${VH - 160} T ${VW} ${VH - 180} L ${VW} ${VH} L 0 ${VH} Z`}
          fill="#241247"
          opacity={0.85}
        />
        <Path
          d={`M0 ${VH - 80} Q ${VW * 0.32} ${VH - 150} ${VW * 0.62} ${VH - 92} T ${VW} ${VH - 104} L ${VW} ${VH} L 0 ${VH} Z`}
          fill="#160b30"
        />
      </Svg>
    </View>
  );
}
