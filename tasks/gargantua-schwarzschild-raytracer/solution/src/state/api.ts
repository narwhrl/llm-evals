// Type of the window.__GARGANTUA__ automation surface required by the task's
// URL capture contract, plus its global declaration.
import type { Params, QualityLevel } from './defaults';

export interface GargantuaSnapshot {
  ready: true;
  quality: QualityLevel;
  preset: number;
  debug: number;
  hud: boolean;
  cinematic: boolean;
  audio: boolean;
  params: Params;
  time: number;
}

export type ApiResult = GargantuaSnapshot | { ok: false; error: string };

export interface GargantuaAPI {
  readonly ready: boolean;
  getState(): GargantuaSnapshot;
  setQuality(level: unknown): ApiResult;
  setPreset(index: unknown): ApiResult;
  setDebug(index: unknown): ApiResult;
  setTime(seconds: unknown): ApiResult;
}

declare global {
  interface Window {
    __GARGANTUA__?: GargantuaAPI;
    __GARGANTUA_DEBUG__?: {
      loseContext?: () => void;
      restoreContext?: () => void;
      errors?: string[];
    };
  }
}

export {};
