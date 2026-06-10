import { useSyncExternalStore } from 'react';

export const SECTION_IDS = [
  'home',
  'about',
  'projects',
  'websites',
  'infrastructure',
  'services',
  'contact',
];

let activeSection = 'home';
let frameId = null;
const listeners = new Set();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const computeActiveSection = () => {
  if (typeof window === 'undefined') return;

  const triggerPoint = window.innerHeight * 0.4;
  let current = 'home';

  for (const id of SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) continue;

    if (element.getBoundingClientRect().top <= triggerPoint) {
      current = id;
    }
  }

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
    current = 'contact';
  }

  if (current !== activeSection) {
    activeSection = current;
    emit();
  }
};

const scheduleCompute = () => {
  if (frameId !== null) return;

  frameId = window.requestAnimationFrame(() => {
    frameId = null;
    computeActiveSection();
  });
};

const subscribe = (listener) => {
  listeners.add(listener);

  if (listeners.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('scroll', scheduleCompute, { passive: true });
    window.addEventListener('resize', scheduleCompute);
    scheduleCompute();
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('scroll', scheduleCompute);
      window.removeEventListener('resize', scheduleCompute);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    }
  };
};

const getSnapshot = () => activeSection;

export default function useActiveSection() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
