import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { narrate, stopNarration } from '../../utils/audio.js';
import { storyPanels } from '../../data/storyContent.js';
import { storyPanelNarration } from '../../utils/narration.js';

export default function StoryPhase({ state, onComplete }) {
  const [panelIndex, setPanelIndex] = useState(0);

  useEffect(() => {
    stopNarration();
    if (state.audioEnabled) {
      const segment = storyPanelNarration[panelIndex];
      if (segment) {
        const timer = setTimeout(() => narrate(segment), 150);
        return () => clearTimeout(timer);
      }
    }
  }, [panelIndex, state.audioEnabled]);

  const handleNext = () => {
    if (panelIndex < storyPanels.length - 1) setPanelIndex(p => p + 1);
  };

  const handleBack = () => {
    if (panelIndex > 0) setPanelIndex(p => p - 1);
  };

  const currentPanel = storyPanels[panelIndex];
  const isLastPanel = panelIndex === storyPanels.length - 1;
  const progressPercent = ((panelIndex + 1) / storyPanels.length) * 100;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 'clamp(56px, 7vh, 76px) clamp(16px, 4vw, 48px) clamp(10px, 1.5vh, 20px)',
        boxSizing: 'border-box',
        gap: 'clamp(10px, 1.6vh, 16px)',
        overflow: 'hidden',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Progress bar — full width above card */}
      <div style={{ width: 'min(96%, 920px)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 4 }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #a78bfa, #facc15)',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', flexShrink: 0, fontWeight: 900 }}>
          {panelIndex + 1}/{storyPanels.length}
        </span>
      </div>

      {/* ── Larger Horizontal Story Card ── */}
      <div
        className="glass-card"
        style={{
          width: 'min(96%, 920px)',
          borderRadius: 24,
          backgroundColor: 'rgba(30, 20, 70, 0.75)',
          border: '2px solid rgba(255,255,255,0.22)',
          boxShadow: '0 20px 56px rgba(0,0,0,0.55)',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          flexShrink: 0,
          minHeight: 0,
          height: 'clamp(280px, 54vh, 460px)',
        }}
      >
        {/* Left: Illustration Image */}
        <div
          style={{
            flex: '0 0 auto',
            width: 'clamp(260px, 44%, 420px)',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={`/assets/images/${currentPanel.image}.png`}
            alt={currentPanel.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        </div>

        {/* Right: Text Content */}
        <div
          style={{
            flex: 1,
            padding: 'clamp(16px, 3vh, 28px) clamp(20px, 3vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(10px, 1.8vh, 16px)',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(20px, 3.2vh, 26px)',
              color: '#facc15',
              margin: 0,
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            {currentPanel.title}
          </h2>

          {/* Body text */}
          <p
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(13px, 2.1vh, 16px)',
              color: '#ffffff',
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {currentPanel.text}
          </p>

          {/* Highlight pill */}
          <div
            style={{
              background: 'rgba(250,204,21,0.15)',
              border: '1.5px dashed rgba(250,204,21,0.5)',
              borderRadius: 14,
              padding: '8px 16px',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(12px, 1.7vh, 14px)',
              color: '#fde047',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
            }}
          >
            ✨ {currentPanel.highlight} ✨
          </div>

          {/* Mascot bubble */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#facc15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                boxShadow: '0 4px 12px rgba(250,204,21,0.4)',
                flexShrink: 0,
              }}
            >
              🐻
            </div>
            <div
              style={{
                background: '#fff',
                color: '#1a0f4e',
                borderRadius: '14px 14px 14px 4px',
                padding: '8px 15px',
                fontFamily: 'Fredoka One, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(12px, 1.7vh, 14px)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                lineHeight: 1.35,
                flex: 1,
              }}
            >
              {currentPanel.mascot}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'min(96%, 920px)',
          flexShrink: 0,
        }}
      >
        {/* Back */}
        <button
          onClick={handleBack}
          disabled={panelIndex === 0}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '2px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: 24,
            padding: '11px 26px',
            fontFamily: 'Fredoka One, sans-serif',
            fontWeight: 900,
            fontSize: 14,
            cursor: panelIndex === 0 ? 'default' : 'pointer',
            opacity: panelIndex === 0 ? 0.3 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {storyPanels.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === panelIndex ? 24 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: i === panelIndex ? '#facc15' : 'rgba(255,255,255,0.3)',
                boxShadow: i === panelIndex ? '0 0 12px rgba(250,204,21,0.7)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Next / Simulation Lab */}
        {isLastPanel ? (
          <button
            onClick={onComplete}
            className="pulse"
            style={{
              background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)',
              border: 'none',
              borderRadius: 24,
              padding: '11px 26px',
              color: '#1a0f4e',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 14,
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(250,204,21,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>Simulation Lab</span>
            <Sparkles size={18} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)',
              border: 'none',
              borderRadius: 24,
              padding: '11px 26px',
              color: '#1a0f4e',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 14,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 6px 20px rgba(250,204,21,0.5)',
            }}
          >
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
