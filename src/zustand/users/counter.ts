import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

interface CounterState {
  value: number;
  increment: () => void;
  decrement: () => void;
  setValue: (newValue: number) => void;
}

const MAX_VALUE = 6;
const MIN_VALUE = 1;

const store = createStore<CounterState>((set) => ({
  value: MIN_VALUE,
  increment: () => set((state) => ({
    value: Math.min(state.value + 1, MAX_VALUE)
  })),
  decrement: () => set((state) => ({
    value: Math.max(state.value - 1, MIN_VALUE)
  })),
  setValue: (newValue) => set({
    value: Math.min(Math.max(newValue, MIN_VALUE), MAX_VALUE)
  }),
}));

export const useCounterStore = () => useStore(store);
