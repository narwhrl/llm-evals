import React, { useEffect } from 'react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: 'J / ↓', desc: 'Navigate to next chapter (推进下一章节)' },
  { key: 'K / ↑', desc: 'Navigate to previous chapter (返回上一章节)' },
  { key: 'Space', desc: 'Toggle Blueprint / Diagnostic X-Ray mode (切换蓝图诊断视界)' },
  { key: 'M', desc: 'Toggle Web Audio harmonic synthesizer (开启/静音张力声学引擎)' },
  { key: 'R', desc: 'Reset kinetic equilibrium (重置物理张拉平衡)' },
  { key: '?', desc: 'Show / hide shortcuts (调出快捷指令面板)' },
  { key: 'Esc', desc: 'Close open dialogs (关闭弹层)' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-paper-50 rounded-xl border border-paper-300 p-6 shadow-float">
        <div className="flex items-center justify-between border-b border-paper-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinnabar" />
            <h3 id="modal-title" className="font-serif text-lg font-bold text-ink-900">
              Command Palette // 键盘快捷指令
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded text-ink-500 hover:text-ink-900 hover:bg-paper-200 font-mono text-xs"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="divide-y divide-paper-200">
          {SHORTCUTS.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <span className="font-sans text-ink-700">{item.desc}</span>
              <kbd className="px-2 py-1 rounded bg-paper-200 border border-paper-300 font-mono text-ink-900 font-semibold shadow-fine">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-paper-200 text-center font-mono text-[11px] text-ink-400">
          PRESS <kbd className="px-1.5 py-0.5 rounded bg-paper-200 border border-paper-300">ESC</kbd> TO RETURN TO WORKSPACE
        </div>
      </div>
    </div>
  );
};
