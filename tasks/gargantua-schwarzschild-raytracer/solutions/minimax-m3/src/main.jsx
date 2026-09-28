import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { createController } from './state.js';
import { mountScene } from './Scene.js';
import { mountHud } from './HUD.jsx';

// Bootstrap: create controller, mount scene + HUD, attach window API.
const controller = createController();

// Wait for DOM ready
const start = () => {
  const canvas = document.getElementById('gargantua-canvas');
  const hudRoot = document.getElementById('hud-root');
  const overlayRoot = document.getElementById('overlay-root');
  if (!canvas || !hudRoot || !overlayRoot) {
    console.error('Required DOM nodes missing');
    return;
  }

  // Mount React HUD
  const hudContainer = mountHud(hudRoot, controller);

  // Mount WebGL scene (no JSX needed — plain DOM element)
  mountScene({ canvas, overlayRoot, controller, hudContainer });

  // React App wrapper is unused at runtime but kept as a React sanity check.
  const reactRoot = createRoot(document.createElement('div'));
  reactRoot.render(React.createElement(App, { controller }));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}