import {isMobileDevice} from '../utils/common'
import {ZustandSlice} from './useZustand'

export type UISlice = {
  isSeeingApp: boolean;
  setIsSeeingApp: (isSeeingApp: boolean) => void;

  showModal: boolean;
  setShowModal: (showModal: boolean) => void;

  siteUrl: string;
  setSiteUrl: (siteUrl: string) => void;

  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

export const createUISlice: ZustandSlice<UISlice> = (set) => {
  return {
    isSeeingApp: true,
    setIsSeeingApp: (isSeeingApp) => set(() => ({isSeeingApp})),

    showModal: false,
    setShowModal: (showModal) => set(() => ({showModal})),

    siteUrl: '',
    setSiteUrl: (siteUrl) => set(() => ({siteUrl})),

    isMobile: isMobileDevice(),
    setIsMobile: (isMobile) => set(() => ({isMobile})),
  }
}
