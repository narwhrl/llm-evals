import { useEffect, useRef, useState } from "react";
import { InkEngine } from "../ink/engine";

/**
 * 引擎只在挂载时创建一次；React 不参与逐帧渲染，
 * 页面上的读数由组件低频轮询快照。
 */
export function useInkEngine(hostRef: React.RefObject<HTMLElement | null>): InkEngine | null {
  const [engine, setEngine] = useState<InkEngine | null>(null);
  const created = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || created.current) return;
    created.current = true;
    const instance = new InkEngine(host);
    instance.start();
    setEngine(instance);
    return () => {
      created.current = false;
      instance.destroy();
      setEngine(null);
    };
  }, [hostRef]);

  return engine;
}
