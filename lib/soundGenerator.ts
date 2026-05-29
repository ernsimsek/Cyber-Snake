"use client";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.1,
  fadeOut: boolean = true
) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  if (fadeOut) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playEatSound(combo: number = 0) {
  const baseFreq = 440 + combo * 50;
  playTone(baseFreq, 0.15, "sine", 0.08);
  setTimeout(() => playTone(baseFreq * 1.5, 0.1, "sine", 0.05), 50);
}

export function playMoveSound() {
  playTone(200, 0.05, "triangle", 0.02, false);
}

export function playGameOverSound() {
  playTone(300, 0.3, "sawtooth", 0.1);
  setTimeout(() => playTone(200, 0.4, "sawtooth", 0.1), 200);
  setTimeout(() => playTone(100, 0.6, "sawtooth", 0.15), 500);
}

export function playHoverSound() {
  playTone(800, 0.08, "sine", 0.03);
}

export function playClickSound() {
  playTone(600, 0.1, "square", 0.04);
}

export function playStartSound() {
  playTone(440, 0.2, "sine", 0.08);
  setTimeout(() => playTone(554, 0.2, "sine", 0.08), 150);
  setTimeout(() => playTone(659, 0.3, "sine", 0.1), 300);
}

export function playComboSound(combo: number) {
  const freq = 523 + combo * 100;
  playTone(freq, 0.2, "sine", 0.1);
  setTimeout(() => playTone(freq * 1.25, 0.15, "sine", 0.08), 100);
}

export function playBonusSound() {
  playTone(880, 0.3, "sine", 0.12);
  setTimeout(() => playTone(1100, 0.2, "sine", 0.1), 150);
  setTimeout(() => playTone(1320, 0.4, "sine", 0.12), 300);
}

export function playPauseSound() {
  playTone(400, 0.15, "sine", 0.06);
}

export function playBootSound() {
  playTone(220, 0.1, "sine", 0.04);
}

export function playErrorSound() {
  playTone(150, 0.3, "sawtooth", 0.08);
}

export function playLevelUpSound() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, "sine", 0.1), i * 120);
  });
}
