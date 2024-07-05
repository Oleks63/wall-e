import {RapierRigidBody} from '@react-three/rapier'
import {Vector3} from 'three'
import type {OrbitControls as OrbitControlsImpl} from 'three-stdlib'

import {AnimController} from '../utils/animController'
import {CAMERA_OFFSET} from '../utils/constants'
import {ZustandSlice} from './useZustand'

export type SceneSlice = {
  canvasEl: HTMLElement | undefined;
  setCanvasEl: (canvasEl: HTMLElement | undefined) => void;

  cameraPrevWorldPos: Vector3;
  setCameraPrevWorldPos: (cameraPrevWorldPos: Vector3) => void;

  orbitControls: OrbitControlsImpl | null;
  setOrbitControls: (orbitControls: OrbitControlsImpl | null) => void;

  orbitControlsPrevTarget: Vector3;
  setOrbitControlsPrevTarget: (orbitControlsPrevTarget: Vector3) => void;

  avatarAnimController: AnimController | undefined;
  setAvatarAnimController: (
    avatarAnimController: AnimController | undefined
  ) => void;

  avatarRigidBodyEl: RapierRigidBody | undefined;
  setAvatarRigidBodyEl: (
    avatarRigidBodyEl: RapierRigidBody | undefined
  ) => void;

  avatarIsJumping: boolean;
  setAvatarIsJumping: (avatarIsJumping: boolean) => void;
};

export const createSceneSlice: ZustandSlice<SceneSlice> = (set) => {
  return {
    canvasEl: undefined,
    setCanvasEl: (canvasEl) => set(() => ({canvasEl})),

    cameraPrevWorldPos: CAMERA_OFFSET,
    setCameraPrevWorldPos: (cameraPrevWorldPos) =>
      set(() => ({cameraPrevWorldPos})),

    orbitControls: null,
    setOrbitControls: (orbitControls) => set(() => ({orbitControls})),

    orbitControlsPrevTarget: new Vector3(),
    setOrbitControlsPrevTarget: (orbitControlsPrevTarget) =>
      set(() => ({orbitControlsPrevTarget})),

    avatarAnimController: undefined,
    setAvatarAnimController: (avatarAnimController) =>
      set(() => ({avatarAnimController})),

    avatarRigidBodyEl: undefined,
    setAvatarRigidBodyEl: (avatarRigidBodyEl) =>
      set(() => ({avatarRigidBodyEl})),

    avatarIsJumping: false,
    setAvatarIsJumping: (avatarIsJumping) => set(() => ({avatarIsJumping})),
  }
}
