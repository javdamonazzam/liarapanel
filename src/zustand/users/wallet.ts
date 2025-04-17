// import { createStore } from 'zustand/vanilla';
// import { useStore } from 'zustand';

// interface WalletState  {
//   value: number;
//   setWalletBalance: (newValue: number) => void;
// };

// const store = createStore<WalletState>((set) => ({
//   value: 0, // Initialize the value
//   setWalletBalance: (newValue) =>
//     set({
//       value: newValue,
//     }),
// }));
// export const useWalletStore = () => useStore(store);


// import { create } from 'zustand';

// type State = {
//   wallet_balance: number;
//   setWalletBalance: (wallet_balance: number) => void;
// };

// const useWalletStore = create<State>((set) => ({
//   wallet_balance: 0,
//   setWalletBalance: (wallet_balance) => set({ wallet_balance }),
// }));

// export default useWalletStore;
// chat Gpt
// import { create } from 'zustand';

// type State = {
//   value: number;
//   setWalletBalance: (wallet_balance: number) => void;
// };

// const useWalletStore = create<State>((set) => ({
//   value: 0,
//   setWalletBalance: (value) => set({ value }),
// }));

// export default useWalletStore;
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

interface CounterState {

  balance_wallet: number;

  setBalance: (balance_wallet: number) => void;
}

const store = createStore<CounterState>((set) => ({
  balance_wallet: 0, // Initialize the balance_wallet state

  setBalance: (balance_wallet) => set({
    balance_wallet: balance_wallet, 
  }),
}));

export const useWalletStore = () => useStore(store);
