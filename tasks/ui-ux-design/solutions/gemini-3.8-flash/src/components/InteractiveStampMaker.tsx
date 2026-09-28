import React, { useState, useEffect } from 'react';

interface InteractiveStampMakerProps {
  onParametersChange?: (params: { points: number; twist: number; tension: number }) => void;
}

export const InteractiveStampMaker: React.FC<InteractiveStampMakerProps> = ({
  onParametersChange,
}) => {
  const [points, setPoints] = useState<number>(8);
  const [twist, setTwist] = useState<number>(30);
  const [tensionScale, setTensionScale] = useState<number>(1.0);
  const [visitorName, setVisitorName] = useState<string>('VISITOR');
  const [copied, setCopied] = useState<boolean>(false);

  // Notify parent of parameter changes to sync with live 3D physics
  useEffect(() => {
    onParametersChange?.({ points, twist, tension: tensionScale });
  }, [points, twist, tensionScale, onParametersChange]);

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.42;
  const rInner = rOuter * 0.52 * tensionScale;

  const vertices: { x: number; y: number; r: number; angle: number }[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points + (twist * Math.PI) / 180;
    const r = i % 2 === 0 ? rOuter : rInner;
    vertices.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      r,
      angle,
    });
  }

  const generateSVGString = () => {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">\n`;
    svg += `  <rect width="100%" height="100%" fill="#FAF8F5" />\n`;
    svg += `  <circle cx="${cx}" cy="${cy}" r="${rOuter + 14}" fill="none" stroke="#D5CDBE" stroke-dasharray="4,4" stroke-width="1" />\n`;
    svg += `  <circle cx="${cx}" cy="${cy}" r="${rOuter + 8}" fill="none" stroke="#181715" stroke-width="0.75" />\n`;

    for (let i = 0; i < points; i++) {
      const next = (i + 1) % points;
      svg += `  <line x1="${vertices[i].x.toFixed(1)}" y1="${vertices[i].y.toFixed(1)}" x2="${vertices[next].x.toFixed(1)}" y2="${vertices[next].y.toFixed(1)}" stroke="#A49F96" stroke-width="1.2" />\n`;
    }
    for (let i = 0; i < points; i += 2) {
      const opp = (i + 3) % points;
      svg += `  <line x1="${vertices[i].x.toFixed(1)}" y1="${vertices[i].y.toFixed(1)}" x2="${vertices[opp].x.toFixed(1)}" y2="${vertices[opp].y.toFixed(1)}" stroke="#CDC7BD" stroke-width="1.0" />\n`;
    }

    for (let i = 0; i < points; i += 2) {
      svg += `  <line x1="${cx}" y1="${cy}" x2="${vertices[i].x.toFixed(1)}" y2="${vertices[i].y.toFixed(1)}" stroke="#181715" stroke-width="3" stroke-linecap="round" />\n`;
    }

    for (let i = 0; i < points; i++) {
      svg += `  <circle cx="${vertices[i].x.toFixed(1)}" cy="${vertices[i].y.toFixed(1)}" r="3.5" fill="#D9381E" />\n`;
    }
    svg += `  <circle cx="${cx}" cy="${cy}" r="5" fill="#181715" />\n`;

    svg += `  <text x="${cx}" y="${size - 18}" font-family="monospace" font-size="9" text-anchor="middle" fill="#5A5650" letter-spacing="1.5">TENSEGRITY ARTIFACT // ${visitorName.toUpperCase()}</text>\n`;
    svg += `</svg>`;
    return svg;
  };

  const handleDownloadSVG = () => {
    const svgContent = generateSVGString();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tensegrity-seal-${visitorName.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySVG = () => {
    const svgContent = generateSVGString();
    navigator.clipboard.writeText(svgContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-5 rounded-xl border border-paper-300 bg-paper-50 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-paper-200 pb-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-ink-900">
            Topology Seal Sculptor // 拓扑印记雕刻器
          </h3>
          <p className="font-mono text-xs text-ink-500">
            参数化塑造张拉印记，并实时联动右侧三维张拉装置
          </p>
        </div>
        <span className="font-mono text-xs bg-cinnabar/10 text-cinnabar px-2 py-0.5 rounded font-semibold">
          LIVE LINKED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Live SVG Preview */}
        <div className="flex flex-col items-center justify-center p-3 bg-paper-100 rounded-lg border border-paper-200">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-52 h-52 max-w-full drop-shadow-sm transition-transform duration-300"
            role="img"
            aria-label="Generated topological seal preview"
          >
            <rect width="100%" height="100%" fill="#FAF8F5" rx="8" />
            <circle
              cx={cx}
              cy={cy}
              r={rOuter + 14}
              fill="none"
              stroke="#D5CDBE"
              strokeDasharray="4,4"
              strokeWidth="1"
            />
            <circle cx={cx} cy={cy} r={rOuter + 8} fill="none" stroke="#181715" strokeWidth="0.75" />

            {vertices.map((v, i) => {
              const next = vertices[(i + 1) % points];
              return (
                <line
                  key={`c-${i}`}
                  x1={v.x}
                  y1={v.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="#A49F96"
                  strokeWidth="1.2"
                />
              );
            })}
            {vertices.filter((_, i) => i % 2 === 0).map((v, i) => {
              const opp = vertices[(i * 2 + 3) % points];
              return (
                <line
                  key={`xc-${i}`}
                  x1={v.x}
                  y1={v.y}
                  x2={opp.x}
                  y2={opp.y}
                  stroke="#CDC7BD"
                  strokeWidth="1.0"
                />
              );
            })}

            {vertices.filter((_, i) => i % 2 === 0).map((v, i) => (
              <line
                key={`s-${i}`}
                x1={cx}
                y1={cy}
                x2={v.x}
                y2={v.y}
                stroke="#181715"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}

            {vertices.map((v, i) => (
              <circle key={`n-${i}`} cx={v.x} cy={v.y} r="4" fill="#D9381E" />
            ))}
            <circle cx={cx} cy={cy} r="5.5" fill="#181715" />

            <text
              x={cx}
              y={size - 18}
              fontFamily="monospace"
              fontSize="9"
              textAnchor="middle"
              fill="#5A5650"
              letterSpacing="1.5"
            >
              TENSEGRITY ARTIFACT // {visitorName.toUpperCase()}
            </text>
          </svg>
          <span className="font-mono text-[10px] text-ink-400 mt-2">
            HASH: #{(points * 73 + twist * 19 + Math.round(tensionScale * 100)).toString(16).toUpperCase()}
          </span>
        </div>

        {/* Sculpting Controls */}
        <div className="space-y-4">
          <div>
            <label className="flex justify-between font-mono text-xs text-ink-700 mb-1">
              <span>SYMMETRY POINTS / 极性点数</span>
              <span className="font-bold">{points}</span>
            </label>
            <input
              type="range"
              min="6"
              max="16"
              step="2"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              aria-label="Symmetry points"
              className="w-full accent-cinnabar h-1.5 bg-paper-300 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between font-mono text-xs text-ink-700 mb-1">
              <span>TWIST ANGLE / 螺旋偏角</span>
              <span className="font-bold">{twist}°</span>
            </label>
            <input
              type="range"
              min="0"
              max="90"
              step="5"
              value={twist}
              onChange={(e) => setTwist(Number(e.target.value))}
              aria-label="Twist angle"
              className="w-full accent-cinnabar h-1.5 bg-paper-300 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between font-mono text-xs text-ink-700 mb-1">
              <span>TENSION SCALE / 预张力比</span>
              <span className="font-bold">{tensionScale.toFixed(2)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={tensionScale}
              onChange={(e) => setTensionScale(Number(e.target.value))}
              aria-label="Tension scale"
              className="w-full accent-cinnabar h-1.5 bg-paper-300 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-ink-700 mb-1">
              COLLABORATOR MONIKER / 协作签名
            </label>
            <input
              type="text"
              maxLength={18}
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value.toUpperCase())}
              placeholder="YOUR NAME"
              className="w-full px-3 py-1.5 font-mono text-xs rounded border border-paper-300 bg-paper-100 text-ink-900 focus:outline-none focus:border-cinnabar"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleDownloadSVG}
              className="flex-1 py-2 px-3 rounded bg-ink-900 text-paper-50 font-mono text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>EXPORT SVG</span>
            </button>

            <button
              onClick={handleCopySVG}
              className="py-2 px-3 rounded border border-paper-300 bg-white font-mono text-xs text-ink-700 hover:text-ink-900 hover:border-ink-400 transition-colors"
            >
              {copied ? 'COPIED!' : 'COPY CODE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
