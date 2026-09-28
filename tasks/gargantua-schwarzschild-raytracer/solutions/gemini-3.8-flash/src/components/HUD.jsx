// HUD.jsx - Collapsible Interstellar HUD with 21 Reactive Parameters and Diagnostics
import React, { useState } from 'react';
import {
  PARAMETER_DEFINITIONS,
  CAMERA_PRESETS,
  DEBUG_MODES,
  QUALITY_TIERS
} from '../contracts/stateDefaults.js';

export function HUD({
  state,
  fps,
  onParameterChange,
  onQualityChange,
  onPresetChange,
  onDebugChange,
  onCinematicToggle,
  onAudioToggle,
  onResetAll,
  onToggleHUD
}) {
  const [activeTab, setActiveTab] = useState('parameters'); // 'parameters' | 'presets' | 'debug' | 'info'
  const [collapsed, setCollapsed] = useState(false);

  if (!state.hudVisible) {
    return (
      <button
        onClick={onToggleHUD}
        title="Show HUD (H)"
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#38bdf8',
          borderRadius: '8px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        HUD [H]
      </button>
    );
  }

  // Group parameters by category
  const groups = ['Optics & Camera', 'Accretion Disk', 'Environment', 'Post-Processing'];

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        right: '12px',
        width: '380px',
        maxWidth: 'calc(100vw - 24px)',
        maxHeight: 'calc(100vh - 24px)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10, 15, 29, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '12px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        color: '#e2e8f0',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: '12px',
        overflow: 'hidden',
        transition: 'all 0.25s ease-in-out'
      }}
    >
      {/* HUD Header */}
      <div
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: state.debug === 0 ? '#38bdf8' : '#f59e0b',
              boxShadow: state.debug === 0 ? '0 0 8px #38bdf8' : '0 0 8px #f59e0b'
            }}
          />
          <span style={{ fontWeight: '700', letterSpacing: '0.1em', color: '#f8fafc' }}>
            GARGANTUA
          </span>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>
            {fps} FPS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Quick Quality Toggle */}
          <button
            onClick={() => {
              const keys = ['standard', 'high', 'cinematic'];
              const next = keys[(keys.indexOf(state.quality) + 1) % keys.length];
              onQualityChange(next);
            }}
            title="Cycle Quality (Q)"
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {state.quality.toUpperCase()}
          </button>

          {/* Minimize / Expand Drawer */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '2px 4px'
            }}
          >
            {collapsed ? '▼' : '▲'}
          </button>

          {/* Close HUD */}
          <button
            onClick={onToggleHUD}
            title="Hide HUD (H)"
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '2px 4px'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Status Sub-bar */}
          <div
            style={{
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(0, 0, 0, 0.3)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '10px',
              color: '#94a3b8'
            }}
          >
            <div>
              <span style={{ color: '#64748b' }}>VIEW: </span>
              <span style={{ color: '#38bdf8' }}>{DEBUG_MODES[state.debug].name}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={onCinematicToggle}
                style={{
                  background: 'none',
                  border: 'none',
                  color: state.cinematicOrbit ? '#4ade80' : '#64748b',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                ORBIT: {state.cinematicOrbit ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={onAudioToggle}
                style={{
                  background: 'none',
                  border: 'none',
                  color: state.audioEnabled ? '#38bdf8' : '#64748b',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                AUDIO: {state.audioEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 23, 42, 0.4)'
            }}
          >
            {[
              { id: 'parameters', label: 'PARAMS (21)' },
              { id: 'presets', label: 'PRESETS (4)' },
              { id: 'debug', label: 'DEBUG (10)' },
              { id: 'info', label: 'KEYS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  background: activeTab === tab.id ? 'rgba(56, 189, 248, 0.16)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #38bdf8' : '2px solid transparent',
                  color: activeTab === tab.id ? '#38bdf8' : '#94a3b8',
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Content Body */}
          <div
            style={{
              padding: '12px 14px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {/* TAB 1: 21 REACTIVE PARAMETERS */}
            {activeTab === 'parameters' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={onResetAll}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#f87171',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Reset All to Defaults (R)
                  </button>
                </div>

                {groups.map((group) => (
                  <div key={group} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                        paddingBottom: '3px'
                      }}
                    >
                      {group}
                    </div>

                    {PARAMETER_DEFINITIONS.filter((def) => def.group === group).map((def) => {
                      const val = state.params[def.id] !== undefined ? state.params[def.id] : def.default;
                      return (
                        <div key={def.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#cbd5e1', fontSize: '11px' }}>{def.label}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: '600' }}>
                                {val}
                                {def.unit}
                              </span>
                              <button
                                onClick={() => onParameterChange(def.id, def.default)}
                                title="Reset parameter"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#64748b',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                  padding: '0 2px'
                                }}
                              >
                                ↺
                              </button>
                            </div>
                          </div>

                          <input
                            type="range"
                            min={def.min}
                            max={def.max}
                            step={def.step}
                            value={val}
                            onChange={(e) => onParameterChange(def.id, parseFloat(e.target.value))}
                            style={{
                              width: '100%',
                              height: '4px',
                              background: '#1e293b',
                              outline: 'none',
                              cursor: 'pointer',
                              accentColor: '#38bdf8'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </>
            )}

            {/* TAB 2: CAMERA PRESETS */}
            {activeTab === 'presets' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                  Select or switch with Shift+1 through Shift+4:
                </div>
                {CAMERA_PRESETS.map((p) => {
                  const isActive = state.preset === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => onPresetChange(p.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '6px',
                        background: isActive ? 'rgba(56, 189, 248, 0.18)' : 'rgba(15, 23, 42, 0.5)',
                        border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: isActive ? '#38bdf8' : '#f1f5f9' }}>
                          Preset {p.id + 1}: {p.name}
                        </span>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>Shift+{p.id + 1}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>
                        {p.description}
                      </div>
                      <div style={{ fontSize: '9px', color: '#64748b' }}>
                        Dist: {p.distance}rs | Elev: {p.elevation}° | FOV: {p.fov}°
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 3: 10 DIAGNOSTIC DEBUG VIEWS */}
            {activeTab === 'debug' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                  Diagnostic shader outputs (Hotkeys 0–9):
                </div>
                {DEBUG_MODES.map((d) => {
                  const isActive = state.debug === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => onDebugChange(d.id)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.45)',
                        border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: isActive ? '#38bdf8' : '#e2e8f0', fontSize: '11px' }}>
                          [{d.id}] {d.name}
                        </span>
                        {isActive && (
                          <span style={{ fontSize: '9px', color: '#38bdf8', fontWeight: 'bold' }}>ACTIVE</span>
                        )}
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.3' }}>
                        {d.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 4: KEYBOARD SHORTCUTS & ABOUT */}
            {activeTab === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div style={{ fontWeight: '700', color: '#38bdf8' }}>Keyboard Controls</div>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px 10px', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8' }}>0 – 9</span>
                  <span>Switch Diagnostic Debug Views</span>

                  <span style={{ color: '#38bdf8' }}>Shift + 1-4</span>
                  <span>Switch Camera Presets</span>

                  <span style={{ color: '#38bdf8' }}>Space</span>
                  <span>Toggle Cinematic Camera Orbit</span>

                  <span style={{ color: '#38bdf8' }}>H</span>
                  <span>Toggle HUD Visibility</span>

                  <span style={{ color: '#38bdf8' }}>Q</span>
                  <span>Cycle Quality (Standard/High/Cinematic)</span>

                  <span style={{ color: '#38bdf8' }}>R</span>
                  <span>Reset All Parameters to Default</span>

                  <span style={{ color: '#38bdf8' }}>M</span>
                  <span>Toggle Ambient Procedural Sound</span>

                  <span style={{ color: '#38bdf8' }}>Drag / Touch</span>
                  <span>Rotate OrbitControls Camera</span>

                  <span style={{ color: '#38bdf8' }}>Wheel / Pinch</span>
                  <span>Dolly / Zoom Camera Distance</span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '8px', marginTop: '4px' }}>
                  <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '4px' }}>Physics Specifications</div>
                  <div style={{ color: '#94a3b8', fontSize: '10px', lineHeight: '1.5' }}>
                    • Spacetime: Schwarzschild Metric (M=0.5, rs=1.0)<br />
                    • Numerical Integration: 4th-Order Runge-Kutta (RK4)<br />
                    • Geodesic ODE: a = -1.5*rs*|x × v|² / r⁵ * x<br />
                    • Accretion Disk: Shakura-Sunyaev + Keplerian Shear<br />
                    • Relativistic Doppler: g⁴ Beaming & Gravitational Redshift<br />
                    • Celestial Lensing: Pure Procedural Milky Way & Stars
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
