import {PerspectiveCamera} from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {vec3} from '@react-three/rapier'
import React, {useEffect} from 'react'
import {Quaternion, Vector3} from 'three'

import {useZustand} from '../../store/useZustand'
import {
  BACK_DIRECTION_VEC3,
  CAMERA_OFFSET,
  FRONT_DIRECTION_VEC3,
  LEFT_DIRECTION_VEC3,
  LERP_ALPHA,
  RIGHT_DIRECTION_VEC3,
  USE_CONTROLS,
  Y_VEC3,
} from '../../utils/constants'

const localVec3 = new Vector3()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const localQuat = new Quaternion()
let cameraRotY = 0
const limitMovement = 300

export const Camera = () => {
  const {camera} = useThree()
  const {
    preventAllEvent,
    preventCameraMove,
    canvasEl,
    avatarRigidBodyEl,
    showModal,
  } = useZustand()

  useEffect(() => {
    if (!canvasEl) {
      return
    }

    const onMouseDown = () => {
      document.body.requestPointerLock()
    }

    if (!USE_CONTROLS && avatarRigidBodyEl) {
      canvasEl.addEventListener('mousedown', onMouseDown)
    }

    return () => {
      if (!USE_CONTROLS && avatarRigidBodyEl) {
        canvasEl.removeEventListener('mousedown', onMouseDown)
      }
    }
  }, [avatarRigidBodyEl, canvasEl])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (
        !USE_CONTROLS &&
        document.pointerLockElement === document.body &&
        camera &&
        !preventAllEvent &&
        !preventCameraMove &&
        avatarRigidBodyEl &&
        !showModal
      ) {
        let {movementX} = event

        if (movementX > limitMovement) {
          movementX = limitMovement
        }

        if (movementX < -limitMovement) {
          movementX = -limitMovement
        }

        cameraRotY -= movementX * Math.PI * 0.0001
      }
    }

    document.body.addEventListener('mousemove', onMouseMove)

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove)
    }
  }, [
    avatarRigidBodyEl,
    camera,
    preventAllEvent,
    preventCameraMove,
    showModal,
  ])

  useFrame(() => {
    if (
      !USE_CONTROLS &&
      camera &&
      !preventAllEvent &&
      !preventCameraMove &&
      avatarRigidBodyEl &&
      !showModal
    ) {
      camera.position.lerp(vec3(avatarRigidBodyEl.translation()), LERP_ALPHA)
      camera.quaternion.setFromAxisAngle(Y_VEC3, cameraRotY)
      camera.position.add(
          localVec3
              .copy(CAMERA_OFFSET.clone().multiplyScalar(LERP_ALPHA))
              .applyQuaternion(camera.quaternion),
      )

      const frontDirection = vec3(avatarRigidBodyEl.translation())
          .sub(camera.position)
          .setY(0)
          .normalize()
      const backDirection = frontDirection.clone().negate()
      const leftDirection = frontDirection
          .clone()
          .applyAxisAngle(Y_VEC3, Math.PI / 2)
      const rightDirection = leftDirection.clone().negate()
      FRONT_DIRECTION_VEC3.copy(frontDirection)
      BACK_DIRECTION_VEC3.copy(backDirection)
      LEFT_DIRECTION_VEC3.copy(leftDirection)
      RIGHT_DIRECTION_VEC3.copy(rightDirection)
    }
  })

  return <PerspectiveCamera makeDefault position={CAMERA_OFFSET.toArray()}/>
}
