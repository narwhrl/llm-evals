import { createContext, useContext } from "react";

export const EngineContext = createContext(null);

export function useEngine() {
  const engine = useContext(EngineContext);
  if (!engine) throw new Error("useEngine 必须在 Plate 内部使用");
  return engine;
}
