'use client';

import { createRef } from 'react';
import type { Options } from 'canvas-confetti';

/**
 * Returns a ready-to-fire confetti function that is **tree-shaken out of
 * the server build** and only imported when you need it.
 */
export async function getConfetti() {
  const { default: confetti } = await import('canvas-confetti');

  // optionally, reuse a single canvas so multiple calls layer together
  if (!canvasRef.current) {
    canvasRef.current = document.createElement('canvas');
    canvasRef.current.style.position = 'fixed';
    canvasRef.current.style.top = '0';
    canvasRef.current.style.left = '0';
    canvasRef.current.style.width = '100%';
    canvasRef.current.style.height = '100%';
    canvasRef.current.style.pointerEvents = 'none';
    canvasRef.current.style.zIndex = '2330000001';
    document.body.appendChild(canvasRef.current);
  }

  return confetti.create(canvasRef.current, { resize: true });
}

const canvasRef = createRef<HTMLCanvasElement>();
export type Confetti = Awaited<ReturnType<typeof getConfetti>>;
