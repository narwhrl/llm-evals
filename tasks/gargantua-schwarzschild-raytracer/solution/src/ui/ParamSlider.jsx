import React from 'react';

// 单个参数控件：标签（中文 + 英文键）、滑杆、数值、单项复位（↺）
export default function ParamSlider({ def, value, onChange, onReset }) {
  const decimals = (String(def.step).split('.')[1] || '').length;
  const shown = decimals ? value.toFixed(decimals) : String(Math.round(value));
  return (
    <div className="param">
      <div className="param__head">
        <span className="param__label">
          {def.label} <em>{def.key}</em>
        </span>
        <span className="param__value">
          {shown}
          {def.unit}
        </span>
      </div>
      <div className="param__row">
        <input
          type="range"
          min={def.min}
          max={def.max}
          step={def.step}
          value={value}
          aria-label={def.label}
          onChange={(e) => onChange(def.key, Number(e.target.value))}
        />
        <button
          type="button"
          className="param__reset"
          title={`复位 ${def.label} → ${def.default}`}
          aria-label={`复位 ${def.label}`}
          onClick={() => onReset(def.key)}
        >
          ↺
        </button>
      </div>
    </div>
  );
}
