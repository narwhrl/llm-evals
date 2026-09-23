/**
 * Resonant Harmonic Audio Engine for Tensegrity Mind
 * Powered by Web Audio API
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;

  public isMuted: boolean = true; // Default muted for polite accessibility
  public isInitialized: boolean = false;

  // Pentatonic scale frequencies for harmonious harmonic feedback (Hz)
  private scale: number[] = [
    220.00, // A3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  private lastPluckTime: number = 0;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create gentle kinetic drone
      this.initDrone();
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported in this environment', e);
    }
  }

  private initDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 fundamental

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(165, this.ctx.currentTime); // E3 perfect fifth

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  /**
   * Trigger a plucked tension chord when cables or struts undergo strain
   */
  public triggerPluck(strainIntensity: number, nodeIndex: number = 0) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    if (now - this.lastPluckTime < 0.08) return; // Rate limiter
    this.lastPluckTime = now;

    const freqIndex = Math.abs(nodeIndex) % this.scale.length;
    const baseFreq = this.scale[freqIndex];

    // Create oscillator & envelope
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = strainIntensity > 0.6 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(baseFreq * (1 + strainIntensity * 0.15), now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.98, now + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFreq * 2.5, now);
    filter.Q.setValueAtTime(3.0, now);

    const gainPeak = Math.min(0.3, 0.05 + strainIntensity * 0.25);
    env.gain.setValueAtTime(0.001, now);
    env.gain.linearRampToValueAtTime(gainPeak, now + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  /**
   * Modulate background resonant filter based on user cursor velocity or rotation
   */
  public modulateVelocity(velocity: number) {
    if (this.isMuted || !this.ctx || !this.droneFilter) return;
    const targetFreq = Math.min(1200, 280 + velocity * 1500);
    this.droneFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
  }

  /**
   * Distinct chime for chapter transition
   */
  public playChapterTransition(chapterIndex: number) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const root = this.scale[chapterIndex * 2 % this.scale.length];

    [root, root * 1.5, root * 2].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.25);
    });
  }
}

export const sound = new SoundEngine();
