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
        padding: 'clamp(60px, 8vh, 80px) clamp(20px, 5vw, 60px) clamp(12px, 2vh, 24px)',
        boxSizing: 'border-box',
        gap: 'clamp(10px, 1.8vh, 18px)',
        overflow: 'hidden',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Progress bar — full width above card */}
      <div style={{ width: 'min(95%, 760px)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #a78bfa, #facc15)',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
          {panelIndex + 1}/{storyPanels.length}
        </span>
      </div>

      {/* ── Horizontal Story Card ── */}
      <div
        className="glass-card"
        style={{
          width: 'min(95%, 760px)',
          borderRadius: 20,
          backgroundColor: 'rgba(30, 20, 70, 0.6)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          flexShrink: 0,
          minHeight: 0,
          height: 'clamp(200px, 38vh, 280px)',
        }}
      >
        {/* Left: Illustration */}
        <div
          style={{
            flex: '0 0 auto',
            width: 'clamp(200px, 40%, 300px)',
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
            padding: 'clamp(14px, 2vh, 20px) clamp(14px, 2vw, 22px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 1.2vh, 12px)',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 'clamp(15px, 2vh, 20px)',
              color: '#facc15',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {currentPanel.title}
          </h2>

          {/* Body text */}
          <p
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(11px, 1.5vh, 14px)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {currentPanel.text}
          </p>

          {/* Highlight pill */}
          <div
            style={{
              background: 'rgba(251,146,60,0.08)',
              border: '1px dashed rgba(251,146,60,0.35)',
              borderRadius: 12,
              padding: '6px 12px',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 'clamp(10px, 1.3vh, 12px)',
              color: '#fb923c',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
            }}
          >
            ✨ {currentPanel.highlight} ✨
          </div>

          {/* Mascot bubble */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#facc15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 17,
                boxShadow: '0 3px 10px rgba(250,204,21,0.3)',
                flexShrink: 0,
              }}
            >
              🐻
            </div>
            <div
              style={{
                background: '#fff',
                color: '#1a0f4e',
                borderRadius: '12px 12px 12px 4px',
                padding: '5px 11px',
                fontFamily: 'Nunito, sans-serif',
                fontSize: 'clamp(9px, 1.2vh, 11px)',
                fontWeight: 800,
                boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                lineHeight: 1.3,
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
          width: 'min(95%, 760px)',
          flexShrink: 0,
        }}
      >
        {/* Back */}
        <button
          onClick={handleBack}
          disabled={panelIndex === 0}
          style={{
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.2)',
            color: '#fff',
            borderRadius: 24,
            padding: '8px 20px',
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 12,
            cursor: panelIndex === 0 ? 'default' : 'pointer',
            opacity: panelIndex === 0 ? 0.3 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {storyPanels.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === panelIndex ? 16 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === panelIndex ? '#facc15' : 'rgba(255,255,255,0.25)',
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
              padding: '8px 20px',
              color: '#1a0f4e',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(250,204,21,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>Simulation Lab</span>
            <Sparkles size={14} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)',
              border: 'none',
              borderRadius: 24,
              padding: '8px 20px',
              color: '#1a0f4e',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 6px 18px rgba(250,204,21,0.35)',
            }}
          >
            <span>Next</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
