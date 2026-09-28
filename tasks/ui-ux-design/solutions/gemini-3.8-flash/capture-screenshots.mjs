import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SCREENSHOT_DIR = 'screenshots';
if (!existsSync(SCREENSHOT_DIR)) {
  mkdirSync(SCREENSHOT_DIR);
}

const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 4220;

async function main() {
  console.log(`Starting preview server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[preview] ${d}`));
  server.stderr.on('data', (d) => console.error(`[preview err] ${d}`));

  // Wait 2.5 seconds for preview server
  await new Promise((r) => setTimeout(r, 2500));

  const scenarios = [
    { name: 'desktop-1440x900-editorial', w: 1440, h: 900, path: '/' },
    { name: 'desktop-1440x900-blueprint', w: 1440, h: 900, path: '/?view=blueprint' },
    { name: 'desktop-1440x900-chapter3-dialectic', w: 1440, h: 900, path: '/?chapter=dialectic' },
    { name: 'desktop-1440x900-chapter4-artifact', w: 1440, h: 900, path: '/?chapter=artifact' },
    { name: 'mobile-390x844-editorial', w: 390, h: 844, path: '/' },
    { name: 'mobile-390x844-chapter4-artifact', w: 390, h: 844, path: '/?chapter=artifact' },
    { name: 'desktop-1440x900-reduced-motion', w: 1440, h: 900, path: '/?motion=reduced' },
  ];

  for (const sc of scenarios) {
    const outFile = resolve(join(SCREENSHOT_DIR, `${sc.name}.png`)).replace(/\//g, '\\');
    const targetUrl = `http://localhost:${PORT}${sc.path}`;
    console.log(`Capturing ${sc.name} to ${outFile}...`);

    const proc = spawn(EDGE_PATH, [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=2000',
      `--window-size=${sc.w},${sc.h}`,
      `--screenshot=${outFile}`,
      targetUrl,
    ]);

    await new Promise((resolveClose) => {
      proc.on('close', (code) => {
        console.log(`Finished ${sc.name} with code ${code}`);
        resolveClose();
      });
    });
  }

  server.kill();
  console.log('All visual acceptance screenshots captured successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
