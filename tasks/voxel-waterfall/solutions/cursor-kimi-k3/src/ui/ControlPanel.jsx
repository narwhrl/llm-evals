export default function ControlPanel({ params, onChange, stats, fps }) {
  const set = (key) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : Number(e.target.value);
    onChange({ ...params, [key]: v });
  };

  const timeLabel =
    params.timeOfDay < 0.25 ? '清晨' : params.timeOfDay < 0.75 ? '正午' : '黄昏';

  return (
    <aside className="panel">
      <h1>体素山水 · 控制台</h1>

      <section>
        <h2>光影</h2>
        <label>
          时段 <span className="val">{timeLabel}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(params.timeOfDay * 100)}
            onChange={(e) => onChange({ ...params, timeOfDay: Number(e.target.value) / 100 })}
          />
        </label>
        <div className="btn-row">
          <button onClick={() => onChange({ ...params, timeOfDay: 0.08 })}>清晨</button>
          <button onClick={() => onChange({ ...params, timeOfDay: 0.5 })}>正午</button>
          <button onClick={() => onChange({ ...params, timeOfDay: 0.96 })}>黄昏</button>
        </div>
      </section>

      <section>
        <h2>云雾</h2>
        <label>
          云层密度 <span className="val">{params.cloudCount}</span>
          <input type="range" min="0" max="28" value={params.cloudCount} onChange={set('cloudCount')} />
        </label>
        <label>
          云层高度 <span className="val">{params.cloudLevel}</span>
          <input type="range" min="10" max="40" value={params.cloudLevel} onChange={set('cloudLevel')} />
        </label>
        <label>
          漂移速度 <span className="val">{params.cloudDrift.toFixed(1)}</span>
          <input type="range" min="0" max="20" value={params.cloudDrift * 10}
            onChange={(e) => onChange({ ...params, cloudDrift: Number(e.target.value) / 10 })} />
        </label>
      </section>

      <section>
        <h2>瀑布</h2>
        <label className="check">
          <input type="checkbox" checked={params.showWaterfall} onChange={set('showWaterfall')} />
          显示瀑布
        </label>
        <label className="check">
          <input type="checkbox" checked={params.showMist} onChange={set('showMist')} />
          水雾效果
        </label>
        <label>
          瀑布数量 <span className="val">{params.waterfallCount}</span>
          <input type="range" min="1" max="3" value={params.waterfallCount} onChange={set('waterfallCount')} />
        </label>
        <label>
          水流速度 <span className="val">{params.flowSpeed.toFixed(1)}</span>
          <input type="range" min="0" max="30" value={params.flowSpeed * 10}
            onChange={(e) => onChange({ ...params, flowSpeed: Number(e.target.value) / 10 })} />
        </label>
      </section>

      <section>
        <h2>山体</h2>
        <label>
          雪线高度 <span className="val">{params.snowLine}</span>
          <input type="range" min="18" max="44" value={params.snowLine} onChange={set('snowLine')} />
        </label>
        <label>
          植被密度 <span className="val">{Math.round(params.treeDensity * 100)}%</span>
          <input type="range" min="0" max="100" value={params.treeDensity * 100}
            onChange={(e) => onChange({ ...params, treeDensity: Number(e.target.value) / 100 })} />
        </label>
        <label>
          随机种子
          <input type="number" value={params.seed}
            onChange={(e) => onChange({ ...params, seed: Number(e.target.value) || 0 })} />
        </label>
        <div className="btn-row">
          <button onClick={() => onChange({ ...params, seed: Math.floor(Math.random() * 1e9) })}>
            随机换一座山
          </button>
        </div>
      </section>

      <section>
        <h2>视角</h2>
        <label className="check">
          <input type="checkbox" checked={params.autoRotate} onChange={set('autoRotate')} />
          自动旋转
        </label>
        <label>
          旋转速度 <span className="val">{params.rotateSpeed.toFixed(1)}</span>
          <input type="range" min="0" max="20" value={params.rotateSpeed * 10}
            onChange={(e) => onChange({ ...params, rotateSpeed: Number(e.target.value) / 10 })} />
        </label>
      </section>

      <footer>
        <span>体素总数 {stats.voxels.toLocaleString()}</span>
        <span>{fps} FPS</span>
      </footer>
      <p className="hint">拖拽旋转 · 滚轮缩放 · 右键平移</p>
    </aside>
  );
}
