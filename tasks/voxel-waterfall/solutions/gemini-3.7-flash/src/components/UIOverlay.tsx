import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Sunset as SunsetIcon,
  Sunrise as SunriseIcon,
  Sparkles,
  Camera,
  RotateCw,
  Sliders,
  Maximize,
  Minimize,
  HelpCircle,
  Dices,
  Eye,
  Layers,
  Droplets,
  Cloud,
  Trees,
  Compass,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { SceneConfig, TerrainStats, TimeOfDay } from '../utils/types';
import { LIGHTING_PRESETS } from '../utils/colors';

interface UIOverlayProps {
  config: SceneConfig;
  onChangeConfig: (newConfig: Partial<SceneConfig>) => void;
  stats: TerrainStats | null;
  onScreenshot: () => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  config,
  onChangeConfig,
  stats,
  onScreenshot,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const timePresets: { id: TimeOfDay; label: string; icon: React.ReactNode }[] = [
    { id: 'dawn', label: '晨曦', icon: <SunriseIcon size={16} /> },
    { id: 'day', label: '晴空', icon: <Sun size={16} /> },
    { id: 'sunset', label: '晚霞', icon: <SunsetIcon size={16} /> },
    { id: 'night', label: '月夜', icon: <Moon size={16} /> },
    { id: 'fantasy', label: '极光', icon: <Sparkles size={16} /> },
  ];

  const cameraPresets: { id: SceneConfig['cameraPreset']; label: string; icon: string }[] = [
    { id: 'overview', label: '全景概貌', icon: '🏔️' },
    { id: 'waterfall', label: '瀑布飞流', icon: '🌊' },
    { id: 'cloudPeak', label: '穿云绝顶', icon: '☁️' },
    { id: 'lakeShore', label: '碧湖栈道', icon: '🛶' },
    { id: 'cinematicTour', label: '环绕巡航', icon: '🚁' },
  ];

  const fps = stats?.fps || 60;
  const fpsColor = fps >= 50 ? '#4ade80' : fps >= 30 ? '#38bdf8' : '#f87171';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* 1. Top Header Navigation Bar */}
      <header
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        {/* Title & Brand */}
        <div
          className="glass-panel"
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 24 }}>🏔️</span>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.02em', color: '#f8fafc' }}>
              3D Voxel Mountain & Waterfall
            </h1>
            <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>
              体素自然景观 · 高山瀑布 · 穿云效果 (144×144)
            </p>
          </div>
        </div>

        {/* Time of Day Quick Switcher */}
        <div
          className="glass-panel"
          style={{
            padding: '6px 8px',
            borderRadius: 12,
            display: 'flex',
            gap: 6,
          }}
        >
          {timePresets.map((t) => {
            const isActive = config.timeOfDay === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChangeConfig({ timeOfDay: t.id })}
                className={`glass-pill ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                }}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top Right Action Tools */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Quick FPS Badge */}
          <div
            className="glass-panel"
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: fpsColor,
                boxShadow: `0 0 8px ${fpsColor}`,
              }}
            />
            <span style={{ color: fpsColor }}>{fps} FPS</span>
          </div>

          {/* Screenshot Button */}
          <button
            onClick={onScreenshot}
            className="glass-pill"
            title="捕获高清截图"
            style={{
              padding: 10,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#f1f5f9',
            }}
          >
            <Camera size={18} />
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => onChangeConfig({ autoRotate: !config.autoRotate })}
            className={`glass-pill ${config.autoRotate ? 'active' : ''}`}
            title="自动环绕旋转"
            style={{
              padding: 10,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#f1f5f9',
            }}
          >
            <RotateCw size={18} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="glass-pill"
            title="全屏切换"
            style={{
              padding: 10,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#f1f5f9',
            }}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowHelp(true)}
            className="glass-pill"
            title="操作与场景说明"
            style={{
              padding: 10,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#f1f5f9',
            }}
          >
            <HelpCircle size={18} />
          </button>

          {/* Open Settings Drawer */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`glass-pill ${drawerOpen ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: '#f1f5f9',
            }}
          >
            <Sliders size={17} />
            <span>参数调控</span>
          </button>
        </div>
      </header>

      {/* 2. Bottom Camera Preset Floating Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '6px 8px',
            borderRadius: 14,
            display: 'flex',
            gap: 6,
          }}
        >
          {cameraPresets.map((cp) => {
            const isActive = config.cameraPreset === cp.id;
            return (
              <button
                key={cp.id}
                onClick={() => onChangeConfig({ cameraPreset: cp.id })}
                className={`glass-pill ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                }}
              >
                <span>{cp.icon}</span>
                <span>{cp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Left Landscape Telemetry Badge */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: 24,
          left: 16,
          padding: '12px 16px',
          borderRadius: 12,
          pointerEvents: 'auto',
          fontSize: 11,
          color: '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          zIndex: 10,
          minWidth: 190,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f1f5f9', fontWeight: 600 }}>
          <span>网格规模</span>
          <span style={{ color: '#38bdf8' }}>144 × 144</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>地貌主峰高</span>
          <span>74 体素层</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>穿云层高度</span>
          <span>y = {config.cloudAltitude}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>表面体素数</span>
          <span>{stats ? stats.voxelCount.toLocaleString() : '28,450'} 块</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>渲染面数 (AO)</span>
          <span>{stats ? stats.faceCount.toLocaleString() : '64,200'} 面</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>植被树木</span>
          <span>{stats?.treeCount || 58} 株</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 4, color: '#38bdf8' }}>
          <span>流体着色器</span>
          <span>动态瀑布 UV</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ec4899' }}>
          <span>氛围粒子</span>
          <span>落樱 · 萤火 · 冰晶</span>
        </div>
      </div>

      {/* 4. Right Side Settings Control Drawer */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 360,
          height: '100%',
          padding: '24px 20px',
          boxSizing: 'border-box',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: drawerOpen ? 'auto' : 'none',
          zIndex: 20,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sliders size={18} color="#38bdf8" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>场景参数详细调控</h2>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="glass-pill"
            style={{ padding: 6, borderRadius: 8, cursor: 'pointer', color: '#cbd5e1' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Section 1: Environment & Lighting */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 13, fontWeight: 600 }}>
            <Sun size={16} />
            <span>光影与时序 (Lighting & Atmosphere)</span>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>阳光/月光强度</span>
              <span>{config.sunIntensity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={config.sunIntensity}
              onChange={(e) => onChangeConfig({ sunIntensity: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>环境雾气浓度 (Fog)</span>
              <span>{(config.fogDensity * 1000).toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.010"
              step="0.0005"
              value={config.fogDensity}
              onChange={(e) => onChangeConfig({ fogDensity: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        {/* Section 2: Clouds & Piercing Effect */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 13, fontWeight: 600 }}>
            <Cloud size={16} />
            <span>云雾与穿云效果 (Voxel Clouds)</span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>云层海拔高度 (山腰 y=30~55)</span>
              <span>y = {config.cloudAltitude}</span>
            </div>
            <input
              type="range"
              min="28"
              max="58"
              step="1"
              value={config.cloudAltitude}
              onChange={(e) => onChangeConfig({ cloudAltitude: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>云层覆盖密度</span>
              <span>{Math.round(config.cloudDensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={config.cloudDensity}
              onChange={(e) => onChangeConfig({ cloudDensity: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>云雾流动风速</span>
              <span>{config.cloudSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="3.0"
              step="0.2"
              value={config.cloudSpeed}
              onChange={(e) => onChangeConfig({ cloudSpeed: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        {/* Section 3: Waterfall & Water */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 13, fontWeight: 600 }}>
            <Droplets size={16} />
            <span>瀑布与流水动态 (Waterfall & Splash)</span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>瀑布倾泻流速</span>
              <span>{config.waterfallFlowSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={config.waterfallFlowSpeed}
              onChange={(e) => onChangeConfig({ waterfallFlowSpeed: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>水花溅落粒子 (Splash Particles)</span>
              <span>{config.splashParticleCount.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={config.splashParticleCount}
              onChange={(e) => onChangeConfig({ splashParticleCount: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>水体透明度</span>
              <span>{Math.round(config.waterOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="1.0"
              step="0.05"
              value={config.waterOpacity}
              onChange={(e) => onChangeConfig({ waterOpacity: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        {/* Section 4: Terrain & Seed Generation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 13, fontWeight: 600 }}>
            <Trees size={16} />
            <span>地形植被与随机种子 (Terrain Generation)</span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>植被树木覆盖率</span>
              <span>{Math.round((config.treeDensity || 0.8) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.8"
              step="0.1"
              value={config.treeDensity || 0.8}
              onChange={(e) => onChangeConfig({ treeDensity: parseFloat(e.target.value) })}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              onClick={() => onChangeConfig({ seed: Math.floor(Math.random() * 999999) })}
              className="glass-pill"
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                color: '#38bdf8',
                borderColor: '#0284c7',
              }}
            >
              <Dices size={16} />
              <span>重构随机地形 (Seed: {config.seed})</span>
            </button>
          </div>
        </div>

        {/* Section 5: Camera Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 13, fontWeight: 600 }}>
            <Compass size={16} />
            <span>视角运动控制 (Camera Orbit)</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#cbd5e1' }}>自动环绕旋转</span>
            <input
              type="checkbox"
              checked={config.autoRotate}
              onChange={(e) => onChangeConfig({ autoRotate: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: '#0284c7', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <span>旋转速度</span>
              <span>{(config.autoRotateSpeed || 0.8).toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.5"
              step="0.1"
              value={config.autoRotateSpeed || 0.8}
              onChange={(e) => onChangeConfig({ autoRotateSpeed: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* 5. Help & Guide Modal Dialog */}
      {showHelp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            pointerEvents: 'auto',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: 520,
              maxWidth: '92vw',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🏔️</span> 场景特色与操作指南
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="glass-pill"
                style={{ padding: 6, borderRadius: 8, cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '10px 12px', background: 'rgba(2,132,199,0.15)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 8 }}>
                <strong style={{ color: '#38bdf8' }}>✨ 核心景观特征：</strong>
                <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                  <li><strong>体素山脉</strong>：144×144 网格，主峰高达 74 层，带有陡峭悬崖、次峰与自然过渡山脊。</li>
                  <li><strong>穿云效果</strong>：山腰缭绕体素 3D 云层与山雾，高耸雪峰破云而出，前后遮挡层次分明。</li>
                  <li><strong>动态流水着色器</strong>：高山瀑布高速倾泻动态 UV 泡沫纹理、湖面波光倒影与阳光高光镜面反射。</li>
                  <li><strong>飞流瀑布粒子</strong>：水花溅射、升腾水汽与湖面激浪八边形扩散波纹。</li>
                  <li><strong>生动微气候氛围</strong>：飘落的粉色樱花瓣、夜间湖畔自发光呼吸萤火虫与雪峰冰晶微风。</li>
                  <li><strong>生态环境</strong>：点缀松树、橡树、樱花树、湖畔木栈道与夜间发光体素灯笼。</li>
                </ul>
              </div>

              <div>
                <strong style={{ color: '#f8fafc' }}>🎮 交互操作方式：</strong>
                <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                  <li><strong>鼠标左键拖拽</strong>：360° 自由旋转视角 (Orbit)</li>
                  <li><strong>鼠标右键拖拽</strong>：平移场景位置 (Pan)</li>
                  <li><strong>滚轮缩放</strong>：推进 / 拉远观察细节</li>
                  <li><strong>底部快捷栏</strong>：一键切换 5 大精心调校的电影级镜头视角</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="glass-pill active"
              style={{
                padding: '10px 16px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              开启体验
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
