import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { GameHeader } from '../components/GameHeader';
import { GameError, pendingPlayers, reduce } from '../game/engine';
import { GameAction, GameState } from '../game/types';
import { theme } from '../theme';
import { ClueScreen } from './ClueScreen';
import { GameOverScreen } from './GameOverScreen';
import { HandoffScreen } from './HandoffScreen';
import { RevealScreen } from './RevealScreen';
import { VotingScreen } from './VotingScreen';
import { SubmitScreen } from './SubmitScreen';

interface Props {
  initialState: GameState;
  onExit: () => void;
}

/**
 * Spelbesturing voor pas-en-speel op één telefoon. Routeert op spelfase en
 * schuift tussen iedere privé-actie een overdrachtsscherm, zodat niemand
 * andermans kaarten ziet.
 */
export function GameScreen({ initialState, onExit }: Props) {
  const [state, setState] = useState(initialState);
  // Speler die het overdrachtsscherm al heeft bevestigd.
  const [unlockedId, setUnlockedId] = useState<string | null>(null);

  const pending = pendingPlayers(state);
  const actorId = pending[0] ?? null;

  useEffect(() => {
    // Zodra een andere speler aan de beurt is, verschijnt het overdrachtsscherm opnieuw.
    if (actorId !== unlockedId) setUnlockedId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actorId]);

  const dispatch = (action: GameAction) => {
    try {
      setState((s) => reduce(s, action));
    } catch (e) {
      if (e instanceof GameError) {
        Alert.alert('Oeps', e.message);
      } else {
        throw e;
      }
    }
  };

  const renderPhase = () => {
    if (state.phase === 'gameOver') {
      return <GameOverScreen state={state} onPlayAgain={onExit} />;
    }
    if (state.phase === 'reveal' && state.lastResult) {
      return (
        <RevealScreen state={state} result={state.lastResult} onNext={() => dispatch({ type: 'NEXT_ROUND' })} />
      );
    }

    const round = state.roundState;
    const actor = state.players.find((p) => p.id === actorId);
    if (!round || !actor) return null;

    if (unlockedId !== actor.id) {
      return <HandoffScreen player={actor} phase={state.phase} onReady={() => setUnlockedId(actor.id)} />;
    }

    switch (state.phase) {
      case 'storytellerClue':
        return (
          <ClueScreen
            storyteller={actor}
            onSubmit={(cardId, clue) =>
              dispatch({ type: 'SUBMIT_CLUE', playerId: actor.id, cardId, clue })
            }
          />
        );
      case 'playersSubmit':
        return (
          <SubmitScreen
            player={actor}
            clue={round.clue ?? ''}
            onSubmit={(cardId) => dispatch({ type: 'SUBMIT_CARD', playerId: actor.id, cardId })}
          />
        );
      case 'voting':
        return (
          <VotingScreen
            player={actor}
            round={round}
            onVote={(cardId) => dispatch({ type: 'CAST_VOTE', playerId: actor.id, cardId })}
          />
        );
      default:
        return null;
    }
  };

  const showHeader = state.phase !== 'gameOver';
  return (
    <View style={styles.container}>
      {showHeader && <GameHeader state={state} />}
      <View style={styles.body}>{renderPhase()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  body: {
    flex: 1,
  },
});
