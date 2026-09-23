import React, { useState } from 'react';
import { TelemetryData, ViewMode } from '../types';

interface DiagnosticTelemetryProps {
  telemetry: TelemetryData;
  viewMode: ViewMode;
}

export const DiagnosticTelemetry: React.FC<DiagnosticTelemetryProps> = ({
  telemetry,
  viewMode,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-30 font-mono text-[11px] select-none">
      <div className="bg-paper-50/90 backdrop-blur-md rounded-lg border border-paper-300 shadow-fine overflow-hidden transition-all duration-200">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="px-3 py-1.5 flex items-center justify-between gap-3 bg-paper-200/50 cursor-pointer hover:bg-paper-200 border-b border-paper-200"
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                telemetry.fps > 45 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="font-semibold text-ink-800">
              SYS.TELEMETRY
            </span>
          </div>
          <span className="text-[10px] text-ink-400">
            {collapsed ? 'EXPAND +' : 'COLLAPSE −'}
          </span>
        </div>

        {!collapsed && (
          <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-ink-600">
            <div>
              <span className="text-ink-400 mr-1.5">FPS:</span>
              <span className="font-bold text-ink-900">{telemetry.fps}</span>
            </div>
            <div>
              <span className="text-ink-400 mr-1.5">NODES:</span>
              <span className="text-ink-800">{telemetry.nodeCount}</span>
            </div>
            <div>
              <span className="text-ink-400 mr-1.5">STRUTS:</span>
              <span className="text-ink-800">{telemetry.strutCount}</span>
            </div>
            <div>
              <span className="text-ink-400 mr-1.5">CABLES:</span>
              <span className="text-ink-800">{telemetry.cableCount}</span>
            </div>
            <div className="col-span-2 border-t border-paper-200 pt-1 mt-0.5 flex justify-between">
              <span className="text-ink-400">EQUILIBRIUM:</span>
              <span
                className={`font-semibold ${
                  telemetry.currentEquilibrium > 0.8 ? 'text-emerald-600' : 'text-cinnabar'
                }`}
              >
                {(telemetry.currentEquilibrium * 100).toFixed(0)}%
              </span>
            </div>
            <div className="col-span-2 flex justify-between text-[10px]">
              <span className="text-ink-400">VIEW:</span>
              <span className="text-ink-700 uppercase font-semibold">{viewMode}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
