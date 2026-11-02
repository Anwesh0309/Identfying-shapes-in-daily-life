import { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle, RotateCw, RefreshCw } from 'lucide-react';
import { narrate, say, stopNarration, sfxCorrect, sfxLevelUp } from '../../utils/audio.js';
import { simulateStationNarration } from '../../utils/narration.js';
import { shapes } from '../../data/shapeData.js';
import stationCBg from '../../assets/station_c_bg.png';

// ── Utility ──
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}

// ── STATION A DATA ──
const TWO_D_SHAPES = ['circle', 'triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
const DROP_ZONES = [
  { id: 'zone_3', label: '3 Sides & Corners', match: ['triangle'] },
  { id: 'zone_4', label: '4 Sides & Corners', match: ['square', 'rectangle'] },
  { id: 'zone_5_6', label: '5 or 6 Sides', match: ['pentagon', 'hexagon'] },
  { id: 'zone_0', label: '0 Sides & Corners', match: ['circle'] }
];

// ── STATION B DATA ──
const THREE_D_SOLIDS = ['sphere', 'cylinder', 'cone', 'cube', 'cuboid', 'pyramid'];
const SOLID_MATCHES = {
  sphere: { label: 'Football', emoji: '⚽' },
  cylinder: { label: 'Milo Can', emoji: '🥫' },
  cone: { label: 'Ice Cream', emoji: '🍦' },
  cube: { label: 'Game Dice', emoji: '🎲' },
  cuboid: { label: 'Tissue Box', emoji: '📦' },
  pyramid: { label: 'Teabag', emoji: '🫖' }
};

// ── STATION C DATA — positions match reference outdoor park scene ──
const HIDING_ITEMS = [
  { id: 'c1', label: 'Football',    emoji: '⚽', shapeId: 'sphere',   top: '72%', left: '8%'  },
  { id: 'c2', label: 'Dice',        emoji: '🎲', shapeId: 'cube',     top: '60%', left: '24%' },
  { id: 'c3', label: 'Ice Cream',   emoji: '🍦', shapeId: 'cone',     top: '62%', left: '42%' },
  { id: 'c4', label: 'Traffic Cone',emoji: '🚧', shapeId: 'cone',     top: '58%', left: '58%' },
  { id: 'c5', label: 'Rubik\'s Cube',emoji:'🧊', shapeId: 'cuboid',   top: '62%', left: '76%' },
  { id: 'c6', label: 'Pyramid',     emoji: '🔺', shapeId: 'pyramid',  top: '74%', left: '60%' },
];

export default function SimulatePhase({ state, onStationComplete, onComplete }) {
  // Always start at Station A; completedStations comes from reset state (all false)
  const [stationId, setStationId] = useState('explorer');
  const [completedStations, setCompletedStations] = useState([false, false, false]);

  // Station A state
  const [selectedShape, setSelectedShape] = useState(null);
  const [explorerPlacements, setExplorerPlacements] = useState(
    TWO_D_SHAPES.reduce((acc, id) => ({ ...acc, [id]: null }), {})
  );

  // Station B state
  const [activeSolidId, setActiveSolidId] = useState('cube');
  const [rotationY, setRotationY] = useState(45);
  const [rotationX, setRotationX] = useState(-15);
  const [spinnerMatches, setSpinnerMatches] = useState(
    THREE_D_SOLIDS.reduce((acc, id) => ({ ...acc, [id]: false }), {})
  );

  // Station C state
  const [huntFound, setHuntFound] = useState([]);

  const timerRef = useRef(null);

  // Narrate on station change and cleanup on unmount/station switch
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    stopNarration();

    if (state.audioEnabled) {
      const nar = simulateStationNarration[stationId];
      if (nar) {
        timerRef.current = setTimeout(() => {
          narrate(nar);
        }, 150);
      }
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      stopNarration();
    };
  }, [stationId, state.audioEnabled]);

  // Overall unmount cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      stopNarration();
    };
  }, []);

  // Mark station complete helpers
  const markStationComplete = (index) => {
    if (!completedStations[index]) {
      const updated = [...completedStations];
      updated[index] = true;
      setCompletedStations(updated);
      onStationComplete(index);
      sfxLevelUp();

      // Auto-advance to the NEXT station (A→B, B→C) but NOT past C
      const stationIds = ['explorer', 'spinner', 'hunt'];
      if (index < 2) {
        setTimeout(() => setStationId(stationIds[index + 1]), 400);
      }
      // Station C (index=2): stay on C, show Go to Practice button

      if (state.audioEnabled) {
        stopNarration();
        const allComplete = updated.every(s => s);
        if (allComplete) {
          narrate([say('Fantastic! You completed all three simulation stations! Click Go to Practice below.')]);
        } else {
          narrate([say('Great job! Station complete! Moving to the next one.')]);
        }
      }
    }
  };

  // ── STATION A LOGIC ──
  const handleSelectExplorerShape = (shapeId) => {
    setSelectedShape(shapeId);
  };

  const handlePlaceExplorerShape = (zoneId) => {
    if (!selectedShape) return;
    const zone = DROP_ZONES.find(z => z.id === zoneId);
    
    if (zone.match.includes(selectedShape)) {
      sfxCorrect();
      setExplorerPlacements(prev => {
        const next = { ...prev, [selectedShape]: zoneId };
        // Check if all 6 shapes are correctly sorted
        const allPlaced = TWO_D_SHAPES.every(sId => next[sId] !== null);
        if (allPlaced) {
          markStationComplete(0);
        }
        return next;
      });
      setSelectedShape(null);
    } else {
      // Wrong placement effect
      if (state.audioEnabled) {
        stopNarration();
        narrate([say(`No, a ${shapes[selectedShape].name} does not belong in this zone. Let us look at its properties.`)]);
      }
    }
  };

  // ── STATION B LOGIC ──
  const handleSwipeRotate = (e) => {
    // Simple mock swipe rotate
    setRotationY(prev => (prev + 30) % 360);
  };

  const handleMatchSolid = (matchedId) => {
    if (matchedId === activeSolidId) {
      sfxCorrect();
      setSpinnerMatches(prev => {
        const next = { ...prev, [activeSolidId]: true };
        // Check if all 6 solids matched
        const allMatched = THREE_D_SOLIDS.every(sId => next[sId]);
        if (allMatched) {
          markStationComplete(1);
        }
        return next;
      });
    } else {
      if (state.audioEnabled) {
        stopNarration();
        narrate([say(`Not quite! A ${shapes[activeSolidId].name} does not match that object. Try again!`)]);
      }
    }
  };

  // ── STATION C LOGIC ──
  const handleHuntClick = (itemId) => {
    if (huntFound.includes(itemId)) return;

    const item = HIDING_ITEMS.find(i => i.id === itemId);
    const nextFound = [...huntFound, itemId];
    setHuntFound(nextFound);
    sfxCorrect();

    if (state.audioEnabled) {
      stopNarration();
      narrate([say(`You found the ${item.label}! It is a ${shapes[item.shapeId].name}!`)]);
    }

    // Check if all 6 items are found
    if (nextFound.length >= HIDING_ITEMS.length) {
      markStationComplete(2);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 'clamp(56px, 7vh, 72px) clamp(10px, 2.5vw, 20px) clamp(8px, 1.5vh, 16px)',
        gap: 'clamp(8px, 1.5vh, 14px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* STATION SELECTION TABS — Unlocked all sections */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {[
          { id: 'explorer', label: 'Station A: Shape Explorer', icon: '🏃', index: 0 },
          { id: 'spinner', label: 'Station B: Solid Spinner', icon: '🧪', index: 1 },
          { id: 'hunt', label: 'Station C: Shape Hunt', icon: '🔍', index: 2 }
        ].map((tab) => {
          const isLocked = false; // Unlocked all sections per prompt
          const isActive = stationId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStationId(tab.id)}
              style={{
                background: isActive ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.08)',
                border: isActive ? '2px solid #38bdf8' : '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: '9px 18px',
                fontFamily: 'Fredoka One, sans-serif',
                fontWeight: 900,
                color: isActive ? '#38bdf8' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 'clamp(12px, 1.3vw, 14px)',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 0 12px rgba(56, 189, 248, 0.4)' : 'none',
              }}
            >
              <span>{completedStations[tab.index] ? '✅' : tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CORE STATION WORKSPACE */}
      <div
        className="glass-card"
        style={{
          flex: 1,
          borderRadius: 20,
          border: '1.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── STATION A: SHAPE EXPLORER ── */}
        {stationId === 'explorer' && (
          <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', padding: '12px 14px', gap: 12, overflow: 'hidden' }}>
            {/* Shapes list — 6 items in a 3×2 grid */}
            <div style={{ flex: '0 0 auto', width: '36%', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
              <h3 style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#facc15', margin: 0, fontSize: 14, flexShrink: 0 }}>
                2D Shapes — tap to select:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 8, flex: 1, minHeight: 0 }}>
                {TWO_D_SHAPES.map(id => {
                  const isPlaced = explorerPlacements[id] !== null;
                  const isSelected = selectedShape === id;
                  const color = shapes[id].color;
                  return (
                    <button
                      key={id}
                      onClick={() => !isPlaced && handleSelectExplorerShape(id)}
                      disabled={isPlaced}
                      style={{
                        background: isSelected ? `rgba(${hexToRgb(color)}, 0.25)` : 'rgba(255,255,255,0.06)',
                        border: isSelected ? `3px solid ${color}` : `1.5px dashed ${isPlaced ? 'rgba(255,255,255,0.1)' : color}`,
                        borderRadius: 14,
                        opacity: isPlaced ? 0.25 : 1,
                        cursor: isPlaced ? 'default' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        padding: '6px 4px',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? `0 0 12px ${color}88` : 'none',
                      }}
                    >
                      <span style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color, lineHeight: 1 }}>
                        {id === 'circle' && '●'}
                        {id === 'triangle' && '▲'}
                        {id === 'rectangle' && '▬'}
                        {id === 'square' && '■'}
                        {id === 'pentagon' && '⬟'}
                        {id === 'hexagon' && '⬡'}
                      </span>
                      <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#fff', fontSize: 'clamp(10px, 1vw, 12px)', textAlign: 'center', lineHeight: 1.1 }}>
                        {shapes[id].name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drop Zones — 4 columns */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, height: '100%' }}>
              {DROP_ZONES.map(zone => {
                const placedShapes = TWO_D_SHAPES.filter(id => explorerPlacements[id] === zone.id);
                return (
                  <div
                    key={zone.id}
                    onClick={() => handlePlaceExplorerShape(zone.id)}
                    style={{
                      background: 'rgba(10, 8, 32, 0.45)',
                      border: selectedShape ? '2px dashed #facc15' : '1.5px solid rgba(255,255,255,0.15)',
                      borderRadius: 16,
                      padding: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      cursor: selectedShape ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 12, color: '#4ade80', textAlign: 'center' }}>
                      {zone.label}
                    </span>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
                      {placedShapes.map(sId => (
                        <div
                          key={sId}
                          style={{
                            background: `rgba(${hexToRgb(shapes[sId].color)}, 0.2)`,
                            border: `1.5px solid ${shapes[sId].color}`,
                            borderRadius: 10,
                            padding: '4px 6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <span style={{ fontSize: 14, color: shapes[sId].color }}>●</span>
                          <span style={{ fontFamily: 'Fredoka One', fontWeight: 900, fontSize: 11, color: '#fff' }}>
                            {shapes[sId].name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STATION B & C WORKSPACE RENDER CONTINUED ── */}
        {stationId === 'spinner' && (
          <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', padding: '12px 14px', gap: 12, overflow: 'hidden' }}>
            {/* 3D Solid Viewer */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <h3 style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#facc15', margin: 0, fontSize: 16 }}>
                Inspect 3D Solid: {shapes[activeSolidId]?.name}
              </h3>
              <div
                onClick={handleSwipeRotate}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 20,
                  background: 'rgba(10, 8, 32, 0.6)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 56,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                {activeSolidId === 'sphere' && '⚽'}
                {activeSolidId === 'cylinder' && '🥫'}
                {activeSolidId === 'cone' && '🍦'}
                {activeSolidId === 'cube' && '🎲'}
                {activeSolidId === 'cuboid' && '📦'}
                {activeSolidId === 'pyramid' && '🫖'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {THREE_D_SOLIDS.map(id => (
                  <button
                    key={id}
                    onClick={() => setActiveSolidId(id)}
                    style={{
                      background: activeSolidId === id ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: 12,
                      padding: '6px 12px',
                      color: activeSolidId === id ? '#0f0a2e' : '#fff',
                      fontFamily: 'Fredoka One, sans-serif',
                      fontWeight: 900,
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    {shapes[id].name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                flex: 1, background: 'rgba(10, 8, 32, 0.5)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'
              }}>
                {/* 3D wireframe render using CSS transform */}
                <div
                  onClick={handleSwipeRotate}
                  style={{
                    width: 90, height: 90, cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                    transformStyle: 'preserve-3d', transition: 'transform 0.4s',
                  }}
                >
                  {/* Sphere render */}
                  {activeSolidId === 'sphere' && (
                    <div style={{
                      width: 80, height: 80, borderRadius: '50%', border: `3px solid ${shapes.sphere.color}`,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.6) 100%)'
                    }} />
                  )}
                  {/* Cube / Cuboid render wireframes */}
                  {(activeSolidId === 'cube' || activeSolidId === 'cuboid') && (
                    <div style={{
                      width: 60, height: activeSolidId === 'cube' ? 60 : 80,
                      border: `2px solid ${shapes[activeSolidId].color}`,
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute', top: -10, left: 10, width: '100%', height: '100%',
                        border: `2px dashed ${shapes[activeSolidId].color}`, opacity: 0.5
                      }} />
                    </div>
                  )}
                  {/* Cylinder render wireframe */}
                  {activeSolidId === 'cylinder' && (
                    <div style={{
                      width: 50, height: 80, border: `2px solid ${shapes.cylinder.color}`, borderRadius: '25px/10px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute', bottom: 0, width: '100%', height: 20,
                        borderTop: `2px solid ${shapes.cylinder.color}`, borderRadius: '25px/10px'
                      }} />
                    </div>
                  )}
                  {/* Cone render wireframe */}
                  {activeSolidId === 'cone' && (
                    <div style={{
                      width: 0, height: 0,
                      borderLeft: '30px solid transparent', borderRight: '30px solid transparent',
                      borderBottom: `70px solid ${shapes.cone.color}`, position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute', bottom: -5, left: -30, width: 60, height: 10,
                        border: `1.5px solid ${shapes.cone.color}`, borderRadius: '50%'
                      }} />
                    </div>
                  )}
                  {/* Pyramid wireframe */}
                  {activeSolidId === 'pyramid' && (
                    <div style={{
                      width: 0, height: 0,
                      borderLeft: '40px solid transparent', borderRight: '40px solid transparent',
                      borderBottom: `70px solid ${shapes.pyramid.color}`, position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute', bottom: -20, left: -40, width: 80, height: 30,
                        border: `1.5px dashed ${shapes.pyramid.color}`, transform: 'rotateX(60deg)'
                      }} />
                    </div>
                  )}
                </div>

                <div style={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <RotateCw size={12} color="#fff" />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Nunito' }}>
                    Tap shape area to spin it!
                  </span>
                </div>

                <span style={{
                  position: 'absolute', top: 8, right: 8,
                  fontSize: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '2px 8px',
                  fontFamily: 'Fredoka One', color: shapes[activeSolidId].color
                }}>
                  FACES: {shapes[activeSolidId].faces || 0} | EDGES: {shapes[activeSolidId].edges || 0}
                </span>
              </div>

              {/* Match buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'Fredoka One', color: '#fff', fontSize: 11 }}>
                  Match {shapes[activeSolidId].name} to its real-world object:
                </span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {THREE_D_SOLIDS.map(solidKey => {
                    const match = SOLID_MATCHES[solidKey];
                    return (
                      <button
                        key={solidKey}
                        onClick={() => handleMatchSolid(solidKey)}
                        style={{
                          flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 12, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                          cursor: 'pointer', transition: 'all 0.2s', gap: 2,
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#facc15'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      >
                        <span style={{ fontSize: 20 }}>{match.emoji}</span>
                        <span style={{ fontSize: 9, fontFamily: 'Nunito', color: 'rgba(255,255,255,0.8)' }}>
                          {match.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STATION C: SHAPE HUNT ── */}
        {stationId === 'hunt' && (
          <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', position: 'relative' }}>
            {/* ── Outdoor Park Scene Background Image ── */}
            <div style={{
              flex: 1.3, position: 'relative', overflow: 'hidden',
              backgroundImage: `url(${stationCBg})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}>
              {/* Subtle ambient lighting vignette */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.2) 100%)', pointerEvents: 'none' }} />

              {/* ── Glowing clickable items ── */}
              {HIDING_ITEMS.map(item => {
                const isFound = huntFound.includes(item.id);
                const glowColor = shapes[item.shapeId].color;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleHuntClick(item.id)}
                    style={{
                      position: 'absolute', top: item.top, left: item.left,
                      background: isFound ? `${glowColor}33` : 'rgba(255,255,255,0.15)',
                      border: `2.5px solid ${glowColor}`,
                      borderRadius: '50%', width: 46, height: 46,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, cursor: 'pointer', zIndex: 10,
                      transition: 'all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
                      transform: isFound ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: isFound
                        ? `0 0 14px ${glowColor}88, 0 0 24px ${glowColor}44`
                        : `0 0 20px ${glowColor}bb, 0 0 35px ${glowColor}55`,
                      animation: !isFound ? 'wonderPulse 2s infinite ease-in-out' : 'none',
                    }}
                  >
                    <span>{item.emoji}</span>
                  </button>
                );
              })}
            </div>

            {/* Checklist Panel */}
            <div style={{
              flex: 0.8, padding: 16, background: 'rgba(15,10,46,0.3)', borderLeft: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto'
            }}>
              <h3 style={{ fontFamily: 'Fredoka One', color: '#fff', margin: 0, fontSize: 13 }}>
                Target Shape Hunt
              </h3>
              <p style={{ fontFamily: 'Nunito', color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 11, lineHeight: 1.3 }}>
                Find and tap all 6 hidden shapes in the scene!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {HIDING_ITEMS.map(item => {
                  const isFound = huntFound.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)',
                        borderRadius: 12, padding: 8, opacity: isFound ? 1 : 0.5, border: isFound ? '1px solid rgba(34,197,94,0.3)' : '1px solid transparent'
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{item.emoji}</span>
                      <span style={{ fontFamily: 'Fredoka One', fontSize: 11, color: '#fff' }}>
                        {item.label} ({shapes[item.shapeId].name})
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: 12 }}>{isFound ? '✅' : '❌'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER COMPLETE TRIGGER — only on Station C after completing it */}
      {completedStations[2] && stationId === 'hunt' && (
        <button
          onClick={onComplete}
          className="pulse"
          style={{
            background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)',
            border: 'none',
            borderRadius: 30,
            padding: '11px 28px',
            color: '#1a0f4e',
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 16,
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(250, 204, 21, 0.55)',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} />
          Go to Practice
        </button>
      )}
    </div>
  );
}
