import React from 'react';
import { X, Command, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../../utils/AudioEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HotkeyPaletteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const hotkeys = [
    { key: '1 - 4', desc: '直接跳转对应体验阶段 (01 觉醒 / 02 思辨 / 03 共生 / 04 刻印)' },
    { key: 'Shift + C / ~', desc: '开启/关闭 底模张力透镜 (Vector Lens Inspection Mode)' },
    { key: 'M', desc: '开启/静音 谐波声画合成器 (Toggle Audio-Visual Chimes)' },
    { key: 'R', desc: '切换 减弱动效/晶体静态建筑投影模式 (Reduced Motion Toggle)' },
    { key: '?', desc: '打开/关闭 快捷键与认知指令调色板' },
    { key: 'Esc', desc: '关闭当前弹窗与聚焦层' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-titanium-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hotkey-title"
    >
      <div className="relative w-full max-w-lg p-6 rounded-2xl glass-panel-glow border border-aurora-cyan/30 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-aurora-cyan" />
            <h2 id="hotkey-title" className="text-sm font-bold font-mono-tech text-white uppercase tracking-wider">
              // 认知控制台与全键盘导航指南
            </h2>
          </div>
          <button
            onClick={() => {
              audioEngine.triggerHapticTick();
              onClose();
            }}
            className="p-1 rounded-lg text-mercury-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-mercury-300 font-sans leading-relaxed">
          作品提供全链路物理键盘控制与无障碍焦点流，你可以无需鼠标完全通过键盘游历所有维度：
        </p>

        <div className="space-y-2 font-mono-tech text-xs">
          {hotkeys.map((h) => (
            <div
              key={h.key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-titanium-900/80 border border-white/5 hover:border-white/15 transition-all"
            >
              <span className="px-2 py-0.5 rounded bg-titanium-700 text-aurora-cyan font-bold text-[11px] border border-white/10">
                {h.key}
              </span>
              <span className="text-mercury-300 text-[11px] font-sans text-right">
                {h.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono-tech text-mercury-400">
          <div className="flex items-center gap-1.5 text-aurora-phosphor">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WCAG 2.1 AAA 键盘焦点友好</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
          >
            知晓并返回
          </button>
        </div>
      </div>
    </div>
  );
};
