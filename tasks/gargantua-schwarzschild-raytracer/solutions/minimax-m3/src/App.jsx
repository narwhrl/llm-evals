import React from 'react';

// Minimal React mount point. The HUD and WebGL scene are mounted
// imperatively elsewhere so this component acts only as a sanity
// check that React itself is alive and that `controller` is wired.
export function App({ controller }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        padding: '4px 8px',
        fontSize: 10,
        color: 'rgba(216,225,236,0.35)',
        pointerEvents: 'none',
        zIndex: 5
      }
    },
    `react:active · heartbeat ${tick} · version ${controller.version}`
  );
}