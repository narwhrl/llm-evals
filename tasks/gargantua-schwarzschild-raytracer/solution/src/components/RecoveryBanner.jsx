// RecoveryBanner.jsx - Non-blocking notice for WebGL context loss recovery
import React from 'react';

export function RecoveryBanner({ visible }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'rgba(220, 38, 38, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(248, 113, 113, 0.6)',
        borderRadius: '8px',
        padding: '12px 24px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        letterSpacing: '0.05em',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'pulse 1.8s infinite ease-in-out'
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#ff4d4f',
          display: 'inline-block',
          boxShadow: '0 0 8px #ff4d4f'
        }}
      />
      WebGL Context Lost — Rebuilding GPU Pipeline & Restoring State...
    </div>
  );
}
