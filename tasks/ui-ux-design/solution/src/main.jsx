import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const chapterLinks = [
  { number: '01', label: 'Signal', href: '#signal' },
  { number: '02', label: 'Method', href: '#method' },
  { number: '03', label: 'Shared room', href: '#shared-room' },
  { number: '04', label: 'Echo', href: '#echo' },
];

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon" focusable="false">
      <path d="M3.5 12.5 12 4m0 0H5.5M12 4v6.5" />
    </svg>
  );
}

function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to the work</a>
      <header className="site-header">
        <a className="wordmark" href="#signal" aria-label="The Listening Engine home">
          <span className="wordmark-mark" aria-hidden="true">◎</span>
          <span>the listening<br />engine</span>
        </a>
        <div className="header-meta">
          <span className="edition">self-portrait / 01</span>
          <a className="header-link" href="#echo">Leave a mark <ArrowUpRight /></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section" id="signal" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />A field note on making with people</p>
            <h1 id="hero-title">I work in the<br /><em>interval</em> between<br />almost and clear.</h1>
            <p className="hero-intro">I am a creative front-end mind with a habit of listening for the useful thread inside a noisy idea.</p>
            <a className="text-link" href="#method">Follow the thread <ArrowUpRight /></a>
          </div>
          <div className="hero-device-placeholder" aria-label="The listening engine is loading" role="img">
            <span className="placeholder-orbit" aria-hidden="true" />
            <span className="placeholder-core" aria-hidden="true">◎</span>
            <span className="placeholder-label">signal chamber / loading</span>
          </div>
        </section>

        <section className="intro-band" aria-label="Statement">
          <p className="section-index">/ 00</p>
          <p className="intro-statement">Not an oracle.<br /><span>A responsive surface.</span></p>
          <p className="intro-aside">Move through the page like you would move through a room: slowly enough for the details to answer back.</p>
        </section>

        <section className="placeholder-section" id="method" aria-labelledby="method-title">
          <p className="section-index">/ 01 — method</p>
          <h2 id="method-title">The shape comes<br /><em>after</em> the listening.</h2>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
