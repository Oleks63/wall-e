import {Euler, Vector3} from '@react-three/fiber'
import {Boolean3Array, RigidBodyAutoCollider} from '@react-three/rapier'
import {ReactNode} from 'react'
import {AnimationAction} from 'three'

export type AnimationActionMap = {
  [key: string]: AnimationAction;
};

export type AnimationMixerEvent = {
  action: AnimationAction;
  loopDelta: number;
};

export type ModelType = {
  children?: ReactNode;
  modelPath: string;
  colliders?: RigidBodyAutoCollider | false;
  rigidPos?: Vector3 | [0, 0, 0];
  rigidRot?: Euler | [0, 0, 0];
  rigidScale?: Vector3 | 1;
  modelPos?: Vector3 | [0, 0, 0];
  modelRot?: Euler | [0, 0, 0];
  modelScale?: Vector3 | 1;
  visible?: boolean | true;
  enabledRotations?: Boolean3Array | [true, true, true];
  enabledTranslations?: Boolean3Array | [true, true, true];
  enableZoom?: boolean | false;
  zoomDistance?: number | 10;
  showModelAnim?: boolean | true;
  showAxesHelper?: boolean | false;
  useCloneGltf?: boolean | false;
};

export type FrameType = {
  photoUrl: string;
  siteUrl: string | '';
  rigidPos?: Vector3 | [0, 0, 0];
  rigidRot?: Euler | [0, 0, 0];
  rigidScale?: Vector3 | 1;
  useCloneGltf?: boolean | false;
};

export type SpriteType = {
  text: string;
  position?: Vector3 | [0, 0, 0];
  onClick?: VoidFunction;
  onGrab?: VoidFunction;
  grabDistance: number | 0;
  zoomDistance: number;
};
