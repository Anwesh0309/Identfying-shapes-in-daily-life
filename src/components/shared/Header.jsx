import { X, Volume2, VolumeX } from 'lucide-react';
import ProgressMap from '../ProgressMap.jsx';

export default function Header({
  phase,
  phaseComplete,
  audioEnabled,
  onHome,
  onClose,
  onToggleAudio,
  onSelectPhase,
}) {
  const isIntro = phase === 'intro';

  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 'clamp(60px, 8vh, 85px)',
        padding: '0 clamp(16px, 3vw, 32px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {/* LEFT SECTION: Home Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'auto',
          minWidth: 100,
        }}
      >
        {!isIntro && (
          <button
            onClick={onHome}
            className="btn-icon-glass"
            style={{
              padding: '6px 14px',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(11px, 1.4vh, 13px)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 30,
              cursor: 'pointer',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
            }}
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
        )}
      </div>

      {/* CENTER SECTION: Journey Progress Tracker + Mute Button Beside Nav Bar */}
      <div
        style={{
          pointerEvents: 'auto',
          display: isIntro ? 'none' : 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <ProgressMap currentPhase={phase} phaseComplete={phaseComplete} onSelectPhase={onSelectPhase} />

        <button
          onClick={onToggleAudio}
          className="btn-icon-glass"
          aria-label={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
          style={{
            width: 38,
            height: 38,
            padding: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(10, 8, 32, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* RIGHT SECTION: Close button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'auto',
          justifyContent: 'flex-end',
          minWidth: 100,
        }}
      >
        <button
          onClick={onClose}
          className="btn-close"
          aria-label="Exit Lesson"
          style={{
            background: '#3b82f6',
            border: 'none',
            borderRadius: 8,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>
    </header>
  );
}
