import { useEffect } from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { sfxBadge } from '../../utils/audio.js';
import { BADGES } from '../../utils/badgeEngine.js';

export default function BadgeToast({ newBadgeIds, onClose }) {
  useEffect(() => {
    sfxBadge();
  }, []);

  const badgeInfo = BADGES.find(b => b.id === newBadgeIds[0]);
  if (!badgeInfo) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(5, 3, 24, 0.75)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="glass-card pulse"
        style={{
          width: 'min(90%, 400px)',
          padding: 24,
          borderRadius: 24,
          border: '2px solid rgba(250, 204, 21, 0.4)',
          boxShadow: '0 12px 40px rgba(250, 204, 21, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 64, display: 'block', animation: 'float 3s infinite' }}>
          {badgeInfo.icon}
        </span>

        <span
          style={{
            background: 'rgba(250, 204, 21, 0.15)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 10,
            color: '#facc15',
            fontWeight: 800,
            fontFamily: 'Fredoka One, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Trophy size={10} />
          Badge Unlocked!
        </span>

        <h3
          style={{
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 22,
            color: '#fff',
            margin: 0,
          }}
        >
          {badgeInfo.name}
        </h3>

        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 13,
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {badgeInfo.desc}
        </p>

        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
            border: 'none',
            borderRadius: 20,
            padding: '10px 24px',
            color: '#0f0a2e',
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 12,
            cursor: 'pointer',
            marginTop: 8,
            boxShadow: '0 4px 15px rgba(250, 204, 21, 0.25)',
          }}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
