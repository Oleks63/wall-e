import {ZustandSlice} from './useZustand'

export type CommonSlice = {
  preventAllEvent: boolean;
  setPreventAllEvent: (preventAllEvent: boolean) => void;

  preventCameraMove: boolean;
  setPreventCameraMove: (preventCameraMove: boolean) => void;
};

export const createCommonSlice: ZustandSlice<CommonSlice> = (set) => {
  return {
    preventAllEvent: false,
    setPreventAllEvent: (preventAllEvent) => set(() => ({preventAllEvent})),

    preventCameraMove: false,
    setPreventCameraMove: (preventCameraMove) =>
      set(() => ({preventCameraMove})),
  }
}
