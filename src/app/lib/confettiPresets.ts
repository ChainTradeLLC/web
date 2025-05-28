// lib/confettiPresets.ts
import type { Confetti } from './confetti';

const count = 300;
const defaults = { origin: { y: 0.7 } };

export async function fireCelebration() {
  const confetti = await importConfetti();

  run(0.25, { spread: 26, startVelocity: 55 });
  run(0.2,  { spread: 60 });
  run(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  run(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  run(0.1,  { spread: 120, startVelocity: 45 });

  function run(ratio: number, opts: Record<string, unknown>) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
  }
}

async function importConfetti() {
  const { getConfetti } = await import('./confetti');
  return getConfetti();
}
