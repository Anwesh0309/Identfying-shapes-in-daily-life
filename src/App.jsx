import { useState } from 'react';
import { useGameState } from './hooks/useGameState.js';
import FloatingBg from './components/shared/FloatingBg.jsx';
import Header from './components/shared/Header.jsx';
import BadgeToast from './components/shared/BadgeToast.jsx';

// Phase Components
import IntroPhase from './components/phases/IntroPhase.jsx';
import WonderPhase from './components/phases/WonderPhase.jsx';
import StoryPhase from './components/phases/StoryPhase.jsx';
import SimulatePhase from './components/phases/SimulatePhase.jsx';
import PlayPhase from './components/phases/PlayPhase.jsx';
import ReflectPhase from './components/phases/ReflectPhase.jsx';
import ResultsPhase from './components/phases/ResultsPhase.jsx';

import './index.css';

export default function App() {
  const { state, dispatch, ACTIONS } = useGameState();
  const [reflection, setReflection] = useState(null);

  // Phase order enforcement — only allow navigating to a phase if prerequisites are done
  const PHASE_ORDER = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect', 'results'];

  const canAccessPhase = (targetPhase) => {
    const idx = PHASE_ORDER.indexOf(targetPhase);
    if (idx <= 1) return true; // intro and wonder always accessible
    // Each phase requires the previous to be complete
    const prevPhase = PHASE_ORDER[idx - 1];
    if (prevPhase === 'intro') return true;
    return state.phaseComplete[prevPhase] === true;
  };

  // Safe phase transition — blocks if prereqs not met
  const goToPhase = (phase) => {
    if (!canAccessPhase(phase)) return;
    // Reset simulation state whenever entering simulate
    if (phase === 'simulate') {
      dispatch({ type: ACTIONS.RESET_SIM_STATIONS });
    }
    dispatch({ type: ACTIONS.SET_PHASE, payload: phase });
  };

  // Home navigation — always allowed (goes to intro)
  const handleHome = () => {
    dispatch({ type: ACTIONS.SET_PHASE, payload: 'intro' });
  };

  // Close / Exit URL redirect helper
  const handleClose = () => {
    window.location.href = 'https://intelliasg.com/courses/grade-2-math/lessons';
  };

  // Reset progress and fresh state helper
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your progress and badges?')) {
      dispatch({ type: ACTIONS.RESET });
      setReflection(null);
    }
  };

  // Sound toggling helper
  const handleToggleAudio = () => {
    dispatch({ type: ACTIONS.TOGGLE_AUDIO });
  };

  return (
    <div className="app-container">
      {/* Dynamic Cosmic Background */}
      <div className="cosmic-bg" />
      <FloatingBg />

      {/* Global Transparent Header */}
      <Header
        phase={state.phase}
        phaseComplete={state.phaseComplete}
        xp={state.xp}
        totalStars={state.totalStars}
        audioEnabled={state.audioEnabled}
        onHome={handleHome}
        onClose={handleClose}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
        {state.phase === 'intro' && (
          <IntroPhase
            state={state}
            onStart={() => goToPhase('wonder')}
            onReset={handleReset}
          />
        )}

        {state.phase === 'wonder' && (
          <WonderPhase
            state={state}
            onComplete={() => {
              dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'wonder' });
              goToPhase('story');
            }}
          />
        )}

        {state.phase === 'story' && (
          <StoryPhase
            state={state}
            onComplete={() => {
              dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'story' });
              goToPhase('simulate');
            }}
          />
        )}

        {state.phase === 'simulate' && (
          <SimulatePhase
            state={state}
            onStationComplete={(idx) => dispatch({ type: ACTIONS.COMPLETE_SIM_STATION, payload: idx })}
            onComplete={() => {
              dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'simulate' });
              goToPhase('play');
            }}
          />
        )}

        {state.phase === 'play' && canAccessPhase('play') && (
          <PlayPhase
            state={state}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
            onComplete={() => {
              dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'play' });
              goToPhase('reflect');
            }}
          />
        )}

        {/* Guard: if somehow on play but simulate not done, redirect */}
        {state.phase === 'play' && !canAccessPhase('play') && (
          <SimulatePhase
            state={state}
            onStationComplete={(idx) => dispatch({ type: ACTIONS.COMPLETE_SIM_STATION, payload: idx })}
            onComplete={() => {
              dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'simulate' });
              goToPhase('play');
            }}
          />
        )}

        {state.phase === 'reflect' && (
          <ReflectPhase
            state={state}
            onComplete={(data) => {
              if (data?.replay) {
                dispatch({ type: ACTIONS.RESET });
              } else {
                dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'reflect' });
                goToPhase('results');
              }
            }}
          />
        )}

        {state.phase === 'results' && (
          <ResultsPhase
            state={state}
            onReset={() => {
              dispatch({ type: ACTIONS.RESET });
              setReflection(null);
            }}
            onClose={handleClose}
            reflectionData={reflection}
          />
        )}
      </main>

      {/* Badge Unlock Celebration Overlay Toast — suppressed per design */}
      {false && state.newBadges && state.newBadges.length > 0 && (
        <BadgeToast
          newBadgeIds={state.newBadges}
          onClose={() => dispatch({ type: ACTIONS.CLEAR_NEW_BADGES })}
        />
      )}
    </div>
  );
}
