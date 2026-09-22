import { useRef } from "react";

interface WordFieldProps {
  value: string;
  max: number;
  onChange: (value: string) => void;
  onInk: (x: number, y: number) => void;
}

/**
 * 第三章的写字处：输入框是可达的真相，画布只是它的回声。
 * 每多一个字，就有一滴朱红的墨落在同一行的纸上。
 */
export function WordField({ value, max, onChange, onInk }: WordFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = [...event.target.value].slice(0, max).join("");
    const grew = [...next].length > [...value].length;
    if (grew && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const progress = Math.min(1, [...next].length / max);
      onInk(rect.left + rect.width * (0.08 + progress * 0.8), rect.top + rect.height * 0.68);
    }
    onChange(next);
  };

  return (
    <div className="write">
      <label className="write__label" htmlFor="your-word">
        写上几个字（最多 {max} 个，会成为最后一页的材料）
      </label>
      <input
        id="your-word"
        ref={inputRef}
        className="write__input"
        type="text"
        value={value}
        maxLength={max * 2}
        onChange={handleChange}
        placeholder="在这里写"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="your-word-hint"
      />
      <p className="write__hint" id="your-word-hint">
        {value ? `已经收下：${value}` : "还没有收到你的字。空着的话，最后一页会拓出作品的名字。"}
      </p>
    </div>
  );
}
