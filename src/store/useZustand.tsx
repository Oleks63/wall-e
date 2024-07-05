import {create, GetState, SetState} from 'zustand'

import {CommonSlice, createCommonSlice} from './createCommonSlice'
import {createKeyboardSlice, KeyboardSlice} from './createKeyboardSlice'
import {createMouseSlice, MouseSlice} from './createMouseSlice'
import {createSceneSlice, SceneSlice} from './createSceneSlice'
import {createUISlice, UISlice} from './createUISlice'

export type ZustandState = CommonSlice &
  KeyboardSlice &
  MouseSlice &
  SceneSlice &
  UISlice;

export type ZustandSlice<T> = (
  set: SetState<ZustandState>,
  get: GetState<ZustandState>
) => T;

export const useZustand = create<ZustandState>((set, get) => ({
  ...createCommonSlice(set, get),
  ...createKeyboardSlice(set, get),
  ...createMouseSlice(set, get),
  ...createSceneSlice(set, get),
  ...createUISlice(set, get),
}))
