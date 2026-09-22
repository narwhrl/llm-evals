import { useSyncExternalStore } from 'react';
import { store, type GargantuaState } from '../state/store';

export function useStoreState(): GargantuaState {
  return useSyncExternalStore(store.subscribe, store.getState);
}
