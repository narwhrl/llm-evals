export type QualityTier = "high" | "medium" | "low";

export interface QualityProfile {
  tier: QualityTier;
  /** 同时存在的候选笔迹上限 */
  maxStrokes: number;
  /** 设备像素比上限 */
  maxDpr: number;
  /** 盖章间距系数：越大越省，墨越断 */
  stampSpacing: number;
  /** 纸张纤维噪点层数 */
  paperDetail: boolean;
}

const TIERS: Record<QualityTier, Omit<QualityProfile, "tier">> = {
  high: { maxStrokes: 320, maxDpr: 2, stampSpacing: 0.55, paperDetail: true },
  medium: { maxStrokes: 190, maxDpr: 2, stampSpacing: 0.7, paperDetail: true },
  low: { maxStrokes: 110, maxDpr: 1.25, stampSpacing: 0.95, paperDetail: false },
};

export function profileFor(tier: QualityTier): QualityProfile {
  return { tier, ...TIERS[tier] };
}

export function initialProfile(width: number, height: number, cores: number): QualityProfile {
  const pixels = width * height;
  if (width < 700 || pixels < 420_000) return profileFor("medium");
  if (cores <= 4 || pixels > 3_000_000) return profileFor("high");
  return profileFor("high");
}

const DOWNGRADE: Record<QualityTier, QualityTier> = {
  high: "medium",
  medium: "low",
  low: "low",
};

const UPGRADE: Record<QualityTier, QualityTier> = {
  high: "high",
  medium: "high",
  low: "medium",
};

/**
 * 帧时间监视器：连续超预算就降级，长时间宽裕再尝试升回。
 * 只做一次降级决策，避免抖动。
 */
export class FrameMonitor {
  private slowRun = 0;
  private fastRun = 0;
  private samples = 0;
  average = 0;
  worst = 0;

  constructor(private profile: QualityProfile, private readonly budgetMs = 13) {}

  get current(): QualityProfile {
    return this.profile;
  }

  sample(frameMs: number): QualityProfile | null {
    this.samples += 1;
    this.average += (frameMs - this.average) / Math.min(this.samples, 90);
    this.worst = Math.max(this.worst * 0.995, frameMs);

    if (frameMs > this.budgetMs * 1.6) this.slowRun += 1;
    else if (frameMs < this.budgetMs * 0.75) this.fastRun += 1;
    else {
      this.slowRun = 0;
      this.fastRun = 0;
    }

    if (this.slowRun >= 40 && this.profile.tier !== "low") {
      this.slowRun = 0;
      this.fastRun = 0;
      this.profile = profileFor(DOWNGRADE[this.profile.tier]);
      return this.profile;
    }
    if (this.fastRun >= 600 && this.profile.tier !== "high") {
      this.fastRun = 0;
      this.profile = profileFor(UPGRADE[this.profile.tier]);
      return this.profile;
    }
    return null;
  }
}
