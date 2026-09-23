import React, { useState } from 'react';
import {
  Sun, Moon, Cloud, Droplets, Mountain, Camera,
  RotateCcw, Sliders, ChevronRight, ChevronLeft, Sparkles, Trees, Eye
} from 'lucide-react';
import { StatsData } from '../engine/SceneManager';
import { TimePreset } from '../engine/Environment';
import { TerrainConfig } from '../engine/TerrainGenerator';
import { CloudConfig } from '../engine/CloudSystem';

interface UIOverlayProps {
  stats: StatsData;
  terrainConfig: TerrainConfig;
  cloudConfig: CloudConfig;
  onUpdateTerrain: (config: TerrainConfig) => void;
  onUpdateAtmosphere: (preset: TimePreset) => void;
  onUpdateSunAngle: (elev: number, azim: number) => void;
  onUpdateFogDensity: (density: number) => void;
  onUpdateWaterSpeed: (speed: number) => void;
  onUpdateCloud: (config: Partial<CloudConfig>) => void;
  onSelectCameraPreset: (preset: 'overview' | 'waterfall' | 'peak' | 'lake' | 'top') => void;
  onToggleAutoRotate: (enabled: boolean, speed?: number) => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  stats,
  terrainConfig,
  cloudConfig,
  onUpdateTerrain,
  onUpdateAtmosphere,
  onUpdateSunAngle,
  onUpdateFogDensity,
  onUpdateWaterSpeed,
  onUpdateCloud,
  onSelectCameraPreset,
  onToggleAutoRotate,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'env' | 'water' | 'cloud' | 'terrain' | 'camera'>('env');
  const [currentPreset, setCurrentPreset] = useState<TimePreset>('noon');
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotateSpeed, setRotateSpeed] = useState(1.0);
  const [waterSpeed, setWaterSpeed] = useState(1.0);
  const [sunElev, setSunElev] = useState(68);
  const [fogDen, setFogDen] = useState(0.0020);

  const [localSeed, setLocalSeed] = useState(terrainConfig.seed);
  const [heightScale, setHeightScale] = useState(terrainConfig.heightScale);
  const [roughness, setRoughness] = useState(terrainConfig.roughness);
  const [treeDensity, setTreeDensity] = useState(terrainConfig.treeDensity);

  const [cloudBaseY, setCloudBaseY] = useState(cloudConfig.baseY);
  const [cloudDensity, setCloudDensity] = useState(cloudConfig.density);
  const [cloudOpacity, setCloudOpacity] = useState(cloudConfig.opacity);
  const [cloudSpeed, setCloudSpeed] = useState(cloudConfig.speed);

  const handleApplyTerrain = (newSeed?: number) => {
    const s = newSeed !== undefined ? newSeed : localSeed;
    onUpdateTerrain({
      ...terrainConfig,
      seed: s,
      heightScale,
      roughness,
      treeDensity
    });
  };

  const handleRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 999999);
    setLocalSeed(newSeed);
    handleApplyTerrain(newSeed);
  };

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 16,
        left: 20,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(11, 17, 30, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '12px 18px',
          borderRadius: 14,
          color: '#fff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mountain size={20} color="#48cae4" />
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 0.8 }}>
              体素高山飞瀑 · 穿云胜境
            </h1>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.65)', marginTop: 4 }}>
            200×200 体素自然大世界 · Three.js 实时渲染
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: 8,
          fontSize: 11,
          fontFamily: 'monospace',
          color: '#e2e8f0'
        }}>
          <div style={{
            background: 'rgba(11, 17, 30, 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4px 10px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}>
            <span style={{ color: '#4ade80', fontWeight: 'bold' }}>●</span>
            FPS: <span style={{ color: stats.fps >= 45 ? '#4ade80' : '#facc15' }}>{stats.fps}</span>
          </div>
          <div style={{
            background: 'rgba(11, 17, 30, 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4px 10px',
            borderRadius: 8
          }}>
            体素数: <span style={{ color: '#60a5fa' }}>{stats.voxelCount.toLocaleString()}</span>
          </div>
          <div style={{
            background: 'rgba(11, 17, 30, 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4px 10px',
            borderRadius: 8
          }}>
            三角面: <span style={{ color: '#c084fc' }}>{stats.triangleCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 16,
        right: 20,
        bottom: 24,
        display: 'flex',
        alignItems: 'flex-start',
        zIndex: 20
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            width: 36,
            height: 36,
            borderRadius: '10px 0 0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '-4px 4px 16px rgba(0,0,0,0.3)',
            marginTop: 12
          }}
          title={isOpen ? '收起控制台' : '展开控制台'}
        >
          {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {isOpen && (
          <div style={{
            width: 320,
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto',
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '0 16px 16px 16px',
            color: '#f8fafc',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              {[
                { id: 'env', label: '光影', icon: Sun },
                { id: 'water', label: '瀑布', icon: Droplets },
                { id: 'cloud', label: '穿云', icon: Cloud },
                { id: 'terrain', label: '地形', icon: Mountain },
                { id: 'camera', label: '镜头', icon: Camera },
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      flex: 1,
                      padding: '12px 4px',
                      background: active ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      border: 'none',
                      borderBottom: active ? '2px solid #38bdf8' : '2px solid transparent',
                      color: active ? '#38bdf8' : 'rgba(255,255,255,0.6)',
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeTab === 'env' && (
                <>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
                      晨昏光影预设
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {[
                        { id: 'dawn', label: '晨曦破晓', color: '#f59e0b', desc: '金霞晨雾' },
                        { id: 'noon', label: '晴空正午', color: '#38bdf8', desc: '明媚晴朗' },
                        { id: 'sunset', label: '暮色晚霞', color: '#f43f5e', desc: '落日熔金' },
                        { id: 'night', label: '静谧月夜', color: '#818cf8', desc: '月华星空' },
                      ].map(p => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setCurrentPreset(p.id as TimePreset);
                            onUpdateAtmosphere(p.id as TimePreset);
                          }}
                          style={{
                            padding: '10px 12px',
                            background: currentPreset === p.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: currentPreset === p.id ? ('1px solid ' + p.color) : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 10,
                            color: '#fff',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.label}</div>
                          <div style={{ fontSize: 10, color: '#94a3b8' }}>{p.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>太阳/月亮仰角</span>
                      <span style={{ color: '#38bdf8' }}>{sunElev}°</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="85"
                      value={sunElev}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setSunElev(val);
                        onUpdateSunAngle(val, 140);
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>大气薄雾浓度</span>
                      <span style={{ color: '#38bdf8' }}>{(fogDen * 1000).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0005"
                      max="0.0060"
                      step="0.0005"
                      value={fogDen}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setFogDen(val);
                        onUpdateFogDensity(val);
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>
                </>
              )}

              {activeTab === 'water' && (
                <>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>水流奔涌速度</span>
                      <span style={{ color: '#38bdf8' }}>{waterSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="2.5"
                      step="0.1"
                      value={waterSpeed}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setWaterSpeed(val);
                        onUpdateWaterSpeed(val);
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: 12,
                    borderRadius: 10,
                    fontSize: 12,
                    color: '#94a3b8',
                    lineHeight: 1.6
                  }}>
                    <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: 4 }}>水系流向结构说明：</div>
                    <div>• <b>源头天池：</b>主峰与东次峰之间高山鞍部 (Y≈40)</div>
                    <div>• <b>悬崖主瀑：</b>大垂直落差飞流直下 (落差 18 体素)</div>
                    <div>• <b>中层碧潭：</b>汇水回旋缓冲水池 (Y≈22)</div>
                    <div>• <b>次级跌瀑：</b>东西两侧双阶梯分流入湖</div>
                    <div>• <b>山脚大湖：</b>平缓浩淼碧波 (Y=8)，带浮萍与睡莲</div>
                  </div>
                </>
              )}

              {activeTab === 'cloud' && (
                <>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>云层高度 (Y-Level)</span>
                      <span style={{ color: '#38bdf8' }}>Y={cloudBaseY}</span>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="46"
                      value={cloudBaseY}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setCloudBaseY(val);
                        onUpdateCloud({ baseY: val });
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                      主峰海拔 ~58，次峰 ~45。设置云层高度在 32-38 时，山腰被云雾缭绕，山峰巍然穿出云海！
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>云团厚度与密度</span>
                      <span style={{ color: '#38bdf8' }}>{Math.round(cloudDensity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="0.75"
                      step="0.05"
                      value={cloudDensity}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setCloudDensity(val);
                        onUpdateCloud({ density: val });
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>云层半透明度</span>
                      <span style={{ color: '#38bdf8' }}>{Math.round(cloudOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.3"
                      max="1.0"
                      step="0.05"
                      value={cloudOpacity}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setCloudOpacity(val);
                        onUpdateCloud({ opacity: val });
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>云朵漂移速度</span>
                      <span style={{ color: '#38bdf8' }}>{cloudSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="3.0"
                      step="0.2"
                      value={cloudSpeed}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setCloudSpeed(val);
                        onUpdateCloud({ speed: val });
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>
                </>
              )}

              {activeTab === 'terrain' && (
                <>
                  <div>
                    <label style={{ fontSize: 12, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>地形随机种子</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input
                        type="number"
                        value={localSeed}
                        onChange={e => setLocalSeed(Number(e.target.value))}
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: 8,
                          color: '#fff',
                          fontSize: 13
                        }}
                      />
                      <button
                        onClick={handleRandomSeed}
                        style={{
                          padding: '6px 12px',
                          background: '#0284c7',
                          border: 'none',
                          borderRadius: 8,
                          color: '#fff',
                          fontSize: 12,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        <Sparkles size={14} /> 随机
                      </button>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>主次峰起伏高度</span>
                      <span style={{ color: '#38bdf8' }}>{heightScale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.75"
                      max="1.35"
                      step="0.05"
                      value={heightScale}
                      onChange={e => setHeightScale(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>悬崖沟壑险峻度</span>
                      <span style={{ color: '#38bdf8' }}>{roughness.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.5"
                      step="0.1"
                      value={roughness}
                      onChange={e => setRoughness(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#cbd5e1' }}>山脚冷杉/阔叶林密度</span>
                      <span style={{ color: '#38bdf8' }}>{Math.round(treeDensity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.35"
                      step="0.05"
                      value={treeDensity}
                      onChange={e => setTreeDensity(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>

                  <button
                    onClick={() => handleApplyTerrain()}
                    style={{
                      marginTop: 6,
                      padding: '10px',
                      background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                      border: 'none',
                      borderRadius: 10,
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                    }}
                  >
                    <Mountain size={16} /> 重新生成 200x200 体素世界
                  </button>
                </>
              )}

              {activeTab === 'camera' && (
                <>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
                      经典机位预设 (平滑平移切换)
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { id: 'overview', label: '全貌宏观 (默认开门见山)', desc: '尽收200x200全貌与层峦叠嶂' },
                        { id: 'waterfall', label: '飞瀑流泉 (近景特写)', desc: '悬崖主瀑落差与飞花碎玉' },
                        { id: 'peak', label: '主峰穿云 (高空透视)', desc: '巍峨雪峰破云而出的磅礴气象' },
                        { id: 'lake', label: '山麓平湖 (平视仰望)', desc: '碧潭睡莲与苍翠松林的幽静' },
                        { id: 'top', label: '垂直沙盘 (正顶俯瞰)', desc: '地形水文水系脉络一览无余' },
                      ].map(cam => (
                        <button
                          key={cam.id}
                          onClick={() => onSelectCameraPreset(cam.id as any)}
                          style={{
                            padding: '9px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 8,
                            color: '#fff',
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#38bdf8' }}>{cam.label}</div>
                            <div style={{ fontSize: 10, color: '#94a3b8' }}>{cam.desc}</div>
                          </div>
                          <Eye size={15} color="#94a3b8" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: '#cbd5e1' }}>自动环绕漫游</span>
                      <button
                        onClick={() => {
                          const nextState = !autoRotate;
                          setAutoRotate(nextState);
                          onToggleAutoRotate(nextState, rotateSpeed);
                        }}
                        style={{
                          padding: '4px 12px',
                          background: autoRotate ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                          border: 'none',
                          borderRadius: 20,
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {autoRotate ? '开启中' : '已暂停'}
                      </button>
                    </div>

                    {autoRotate && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                          <span style={{ color: '#94a3b8' }}>漫游旋转速度</span>
                          <span style={{ color: '#38bdf8' }}>{rotateSpeed.toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.2"
                          max="3.0"
                          step="0.2"
                          value={rotateSpeed}
                          onChange={e => {
                            const val = Number(e.target.value);
                            setRotateSpeed(val);
                            onToggleAutoRotate(true, val);
                          }}
                          style={{ width: '100%', accentColor: '#38bdf8' }}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '6px 16px',
        borderRadius: 20,
        color: '#94a3b8',
        fontSize: 12,
        pointerEvents: 'none',
        display: 'flex',
        gap: 16,
        zIndex: 10
      }}>
        <span>🖱️ <b>左键拖拽</b> 旋转视角</span>
        <span>🔍 <b>滚轮滑动</b> 缩放距离</span>
        <span>✋ <b>右键拖拽</b> 平移视图</span>
      </div>
    </>
  );
};