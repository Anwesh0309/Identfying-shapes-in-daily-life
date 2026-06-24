import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, RotateCw, RefreshCw } from 'lucide-react';
import { narrate, say, stopNarration, sfxCorrect, sfxLevelUp } from '../../utils/audio.js';
import { simulateStationNarration } from '../../utils/narration.js';
import { shapes } from '../../data/shapeData.js';

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

  // Narrate on station change
  useEffect(() => {
    stopNarration();
    if (state.audioEnabled) {
      const nar = simulateStationNarration[stationId];
      if (nar) {
        narrate(nar);
      }
    }
  }, [stationId, state.audioEnabled]);

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
      // Station C (index=2): stay on C, show Go to Play button

      if (state.audioEnabled) {
        const allComplete = updated.every(s => s);
        if (allComplete) {
          narrate([say('Fantastic! You completed all three simulation stations! Click Go to Play below.')]);
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
        narrate([say(`No, a ${shapes[selectedShape].name} does not belong in the ${zone.label} zone. Let us look at its properties.`)]);
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
      narrate([say(`You found the ${item.label}! It is a ${shapes[item.shapeId].name}!`)]);
    }

    // Check if all 6 items are found
    if (nextFound.length >= HIDING_ITEMS.length) {
      markStationComplete(2);
    }
  };

  const allStationsDone = completedStations.every(s => s);

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
      {/* STATION SELECTION TABS */}
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
        ].map((tab, i) => {
          // Station B locked until A done; Station C locked until B done
          const isLocked = i > 0 && !completedStations[i - 1];
          const isActive = stationId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => !isLocked && setStationId(tab.id)}
              disabled={isLocked}
              title={isLocked ? `Complete Station ${String.fromCharCode(64 + i)} first!` : ''}
              style={{
                background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                border: isActive ? '1.5px solid #38bdf8' : '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: '8px 16px',
                fontFamily: 'Fredoka One, sans-serif',
                color: isLocked ? 'rgba(255,255,255,0.25)' : isActive ? '#38bdf8' : 'rgba(255,255,255,0.6)',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                transition: 'all 0.2s',
                opacity: isLocked ? 0.5 : 1,
              }}
            >
              <span>{completedStations[tab.index] ? '✅' : isLocked ? '🔒' : tab.icon}</span>
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
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
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
              <h3 style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', margin: 0, fontSize: 13, flexShrink: 0 }}>
                2D Shapes — tap to select
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
                        background: isSelected ? `rgba(${hexToRgb(color)}, 0.15)` : 'rgba(255,255,255,0.03)',
                        border: isSelected ? `2.5px solid ${color}` : `1px dashed ${isPlaced ? 'rgba(255,255,255,0.05)' : color}`,
                        borderRadius: 14,
                        opacity: isPlaced ? 0.2 : 1,
                        cursor: isPlaced ? 'default' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        padding: '6px 4px',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? `0 0 10px ${color}55` : 'none',
                      }}
                    >
                      <span style={{ fontSize: 'clamp(16px, 2vw, 22px)', color, lineHeight: 1 }}>
                        {id === 'circle' && '●'}
                        {id === 'triangle' && '▲'}
                        {id === 'rectangle' && '▬'}
                        {id === 'square' && '■'}
                        {id === 'pentagon' && '⬟'}
                        {id === 'hexagon' && '⬡'}
                      </span>
                      <span style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', fontSize: 'clamp(9px, 0.9vw, 11px)', textAlign: 'center', lineHeight: 1.1 }}>
                        {shapes[id].name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drop Zones — 4 zones in a 2×2 grid */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
              <h3 style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', margin: 0, fontSize: 13, flexShrink: 0 }}>
                Classification Zones — select a shape, then tap a zone
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 8, flex: 1, minHeight: 0 }}>
                {DROP_ZONES.map(zone => {
                  const placedShapes = Object.keys(explorerPlacements).filter(
                    key => explorerPlacements[key] === zone.id
                  );
                  const isFull = zone.match.every(m => explorerPlacements[m] !== null);
                  return (
                    <button
                      key={zone.id}
                      onClick={() => handlePlaceExplorerShape(zone.id)}
                      style={{
                        background: isFull ? 'rgba(34, 197, 94, 0.08)' : 'rgba(10, 8, 32, 0.45)',
                        border: isFull ? '1.5px solid rgba(34,197,94,0.4)' : selectedShape ? '1.5px dashed #38bdf8' : '1.5px dashed rgba(255,255,255,0.2)',
                        borderRadius: 14,
                        padding: '8px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 6,
                        cursor: selectedShape ? 'pointer' : 'default',
                        transition: 'all 0.2s',
                        overflow: 'hidden',
                      }}
                    >
                      <span style={{ fontFamily: 'Fredoka One, sans-serif', color: isFull ? '#4ade80' : 'rgba(255,255,255,0.7)', fontSize: 'clamp(10px, 1vw, 12px)', textAlign: 'center', lineHeight: 1.2, flexShrink: 0 }}>
                        {isFull && '✅ '}{zone.label}
                      </span>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {placedShapes.map(sId => (
                          <div
                            key={sId}
                            style={{
                              background: shapes[sId].color,
                              color: '#0f0a2e',
                              borderRadius: 10,
                              padding: '2px 6px',
                              fontFamily: 'Fredoka One, sans-serif',
                              fontSize: 'clamp(8px, 0.8vw, 10px)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <span>✓</span>
                            <span>{shapes[sId].name}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── STATION B: SOLID SPINNER ── */}
        {stationId === 'spinner' && (
          <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', padding: 16, gap: 16 }}>
            {/* Sidebar Solid List */}
            <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto' }}>
              {THREE_D_SOLIDS.map(id => {
                const isMatched = spinnerMatches[id];
                const isActive = activeSolidId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveSolidId(id)}
                    style={{
                      background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: isActive ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      padding: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', fontSize: 12 }}>
                      {shapes[id].name}
                    </span>
                    <span style={{ fontSize: 12 }}>{isMatched ? '✅' : '❓'}</span>
                  </button>
                );
              })}
            </div>

            {/* Spinner Showcase area */}
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
            {/* ── Outdoor Park Scene ── */}
            <div style={{
              flex: 1.3, position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(180deg, #87CEEB 0%, #b8e4f7 35%, #c8f0a0 55%, #5a9e30 75%, #3d7520 100%)',
            }}>
              {/* Sky clouds */}
              {[[8,8,55],[25,5,40],[55,10,65],[72,6,45]].map(([l,t,w],i) => (
                <div key={i} style={{ position:'absolute', left:`${l}%`, top:`${t}%`,
                  width:`${w}px`, height:'18px', borderRadius:20,
                  background:'rgba(255,255,255,0.85)', boxShadow:'0 2px 8px rgba(255,255,255,0.4)' }} />
              ))}
              {/* Sunshine */}
              <div style={{ position:'absolute', top:'4%', right:'8%', width:40, height:40, borderRadius:'50%',
                background:'radial-gradient(circle, #ffe566 0%, #ffb300 70%, transparent 100%)',
                boxShadow:'0 0 20px 6px rgba(255,200,50,0.4)' }} />
              {/* Ground path */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%',
                background:'linear-gradient(180deg, #6db82e 0%, #4a8a1c 100%)' }} />
              {/* Pond / lake */}
              <div style={{ position:'absolute', bottom:'22%', left:'20%', width:'28%', height:'18%',
                borderRadius:'50% 60% 55% 50% / 50% 50% 60% 60%',
                background:'linear-gradient(135deg, #4fc3f7 0%, #29b6f6 50%, #0288d1 100%)',
                boxShadow:'0 4px 16px rgba(3,169,244,0.3)' }} />
              {/* Dock/pier */}
              <div style={{ position:'absolute', bottom:'30%', left:'26%', width:'6%', height:'4%',
                background:'#8B6914', borderRadius:'2px 2px 0 0' }} />
              {/* Fountain */}
              <div style={{ position:'absolute', bottom:'35%', left:'34%', width:16, height:16,
                borderRadius:'50%', background:'#29b6f6', boxShadow:'0 0 10px rgba(3,169,244,0.6)' }} />
              {/* Street lamp */}
              <div style={{ position:'absolute', bottom:'28%', left:'46%', width:4, height:'28%',
                background:'#4a4a5a', borderRadius:2 }}>
                <div style={{ position:'absolute', top:-8, left:-8, width:20, height:12, borderRadius:'50% 50% 0 0',
                  background:'#6a6a7a', boxShadow:'0 0 8px rgba(255,220,100,0.5)' }} />
              </div>
              {/* Signpost */}
              <div style={{ position:'absolute', bottom:'28%', left:'53%', width:3, height:'20%',
                background:'#8B6914', borderRadius:2 }}>
                {[['#e74c3c','-45deg',16],['#3498db','0deg',16],['#27ae60','25deg',16]].map(([c,r,w],i) => (
                  <div key={i} style={{ position:'absolute', top:`${10+i*30}%`, left:3, width:w, height:5,
                    background:c, borderRadius:2, transformOrigin:'left center', transform:`rotate(${r})` }} />
                ))}
              </div>
              {/* Gazebo/pavilion background */}
              <div style={{ position:'absolute', bottom:'28%', right:'22%', width:'12%', height:'20%',
                background:'rgba(200,160,80,0.3)', borderRadius:'50% 50% 0 0 / 30% 30% 0 0',
                border:'1px solid rgba(200,160,80,0.5)' }} />
              {/* Playground slide right */}
              <div style={{ position:'absolute', bottom:'27%', right:'4%', width:'14%', height:'28%',
                background:'rgba(56,120,200,0.4)', borderRadius:'8px 8px 0 0',
                border:'1px solid rgba(56,120,200,0.6)' }} />
              <div style={{ position:'absolute', bottom:'26%', right:'6%', width:'10%', height:'8%',
                background:'rgba(255,200,50,0.7)', borderRadius:'0 0 4px 4px',
                transform:'rotate(-15deg)', transformOrigin:'bottom left' }} />
              {/* Trees */}
              {[[2,18],[88,20],[72,24]].map(([l,s],i) => (
                <div key={i} style={{ position:'absolute', bottom:'28%', left:`${l}%` }}>
                  <div style={{ width:s, height:s, borderRadius:'50%',
                    background:`radial-gradient(circle, #5cb85c 0%, #3d8b3d 100%)`,
                    boxShadow:'0 4px 12px rgba(60,140,60,0.3)', marginLeft: -s/4 }} />
                  <div style={{ width:4, height:12, background:'#6b4423',
                    margin:'0 auto', borderRadius:'0 0 2px 2px' }} />
                </div>
              ))}
              {/* Path/walkway */}
              <div style={{ position:'absolute', bottom:'24%', left:'40%', width:'22%', height:'8%',
                background:'rgba(180,160,120,0.5)', borderRadius:4 }} />

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
            fontSize: 15,
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(250, 204, 21, 0.45)',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} />
          Go to Play
        </button>
      )}
    </div>
  );
}
