import {Vector3} from 'three'

// Environment

export const USE_CONTROLS = false
export const DPR_FACTOR = 1
export const IS_PERFORMANCE_MONITORING = false

export const SHOW_AXES_HELPER = false
export const AXES_LENGTH = 10

export const SHOW_ANIM = true
export const ANIM_DURATION = 2
export const LERP_ALPHA = 1

export const LIGHT_RADIUS = 0
export const LIGHT_INTENSITY = 0.3

export const SHOW_SHADOW = false

export const CAMERA_OFFSET = new Vector3(0, 3, 8)

export const ANGULAR_DAMPING = 1
export const LINEAR_DAMPING = 1

// Avatar

export const FRONT_DIRECTION_VEC3 = new Vector3(0, 0, -1)
export const BACK_DIRECTION_VEC3 = new Vector3(0, 0, 1)
export const LEFT_DIRECTION_VEC3 = new Vector3(-1, 0, 0)
export const RIGHT_DIRECTION_VEC3 = new Vector3(1, 0, 0)
export const X_VEC3 = new Vector3(1, 0, 0)
export const Y_VEC3 = new Vector3(0, 1, 0)

export const AVATAR_FIRST_NAME = 'Javier'
export const AVATAR_LAST_NAME = 'Amarilla'
export const AVATAR_NAME_COLOR = 'green'
export const PHOTO_URL = 'textures/photos/upwork.png'
export const PORTFOLIO_URL = 'Resume.pdf'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mixamoVRMRigMap: any = {
  mixamorigHips: 'hips',
  mixamorigSpine: 'spine',
  mixamorigSpine1: 'chest',
  mixamorigSpine2: 'upperChest',
  mixamorigNeck: 'neck',
  mixamorigHead: 'head',
  mixamorigLeftShoulder: 'leftShoulder',
  mixamorigLeftArm: 'leftUpperArm',
  mixamorigLeftForeArm: 'leftLowerArm',
  mixamorigLeftHand: 'leftHand',
  mixamorigLeftHandThumb1: 'leftThumbProximal',
  mixamorigLeftHandThumb2: 'leftThumbIntermediate',
  mixamorigLeftHandThumb3: 'leftThumbDistal',
  mixamorigLeftHandIndex1: 'leftIndexProximal',
  mixamorigLeftHandIndex2: 'leftIndexIntermediate',
  mixamorigLeftHandIndex3: 'leftIndexDistal',
  mixamorigLeftHandMiddle1: 'leftMiddleProximal',
  mixamorigLeftHandMiddle2: 'leftMiddleIntermediate',
  mixamorigLeftHandMiddle3: 'leftMiddleDistal',
  mixamorigLeftHandRing1: 'leftRingProximal',
  mixamorigLeftHandRing2: 'leftRingIntermediate',
  mixamorigLeftHandRing3: 'leftRingDistal',
  mixamorigLeftHandPinky1: 'leftLittleProximal',
  mixamorigLeftHandPinky2: 'leftLittleIntermediate',
  mixamorigLeftHandPinky3: 'leftLittleDistal',
  mixamorigRightShoulder: 'rightShoulder',
  mixamorigRightArm: 'rightUpperArm',
  mixamorigRightForeArm: 'rightLowerArm',
  mixamorigRightHand: 'rightHand',
  mixamorigRightHandPinky1: 'rightLittleProximal',
  mixamorigRightHandPinky2: 'rightLittleIntermediate',
  mixamorigRightHandPinky3: 'rightLittleDistal',
  mixamorigRightHandRing1: 'rightRingProximal',
  mixamorigRightHandRing2: 'rightRingIntermediate',
  mixamorigRightHandRing3: 'rightRingDistal',
  mixamorigRightHandMiddle1: 'rightMiddleProximal',
  mixamorigRightHandMiddle2: 'rightMiddleIntermediate',
  mixamorigRightHandMiddle3: 'rightMiddleDistal',
  mixamorigRightHandIndex1: 'rightIndexProximal',
  mixamorigRightHandIndex2: 'rightIndexIntermediate',
  mixamorigRightHandIndex3: 'rightIndexDistal',
  mixamorigRightHandThumb1: 'rightThumbProximal',
  mixamorigRightHandThumb2: 'rightThumbIntermediate',
  mixamorigRightHandThumb3: 'rightThumbDistal',
  mixamorigLeftUpLeg: 'leftUpperLeg',
  mixamorigLeftLeg: 'leftLowerLeg',
  mixamorigLeftFoot: 'leftFoot',
  mixamorigLeftToeBase: 'leftToes',
  mixamorigRightUpLeg: 'rightUpperLeg',
  mixamorigRightLeg: 'rightLowerLeg',
  mixamorigRightFoot: 'rightFoot',
  mixamorigRightToeBase: 'rightToes',
}

// Project

export const PROJECT_ARR = [
  {
    photoUrl: 'textures/projects/r3f-room.png',
    siteUrl: 'https://cup-ry75.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/site-board.png',
    siteUrl: 'https://site-board.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/workroom.png',
    siteUrl: 'https://workroom-ze67.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/bike-structure.png',
    siteUrl: 'https://bike-structure.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/three-ammo-demo.png',
    siteUrl: 'https://ammo-three.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/stl-texture.png',
    siteUrl: 'https://stl-texture-2ums.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/stl-multi-texture.png',
    siteUrl: 'https://stl-multi-texture.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/infinite-world.png',
    siteUrl: 'https://infinite-world-0p8q.onrender.com/',
  },
  {
    photoUrl: 'textures/projects/bike-concept.png',
    siteUrl: 'https://bike-concept-ug44.onrender.com/',
  },

]
