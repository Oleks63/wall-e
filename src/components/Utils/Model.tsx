import {useFrame, useThree} from '@react-three/fiber'
import {RapierRigidBody, RigidBody, vec3} from '@react-three/rapier'
import {useGesture} from '@use-gesture/react'
import gsap from 'gsap'
import React, {useEffect, useRef} from 'react'

import {useCustomGltf} from '../../hooks/useCustomGltf'
import {useZustand} from '../../store/useZustand'
import {
  ANGULAR_DAMPING,
  ANIM_DURATION,
  AXES_LENGTH,
  LINEAR_DAMPING,
  SHOW_ANIM,
} from '../../utils/constants'
import {ModelType} from '../../utils/types'

export const Model = ({
  children,
  modelPath,
  colliders = false,
  rigidPos = [0, 0, 0],
  rigidRot = [0, 0, 0],
  rigidScale = 1,
  modelPos = [0, 0, 0],
  modelRot = [0, 0, 0],
  modelScale = 1,
  visible = true,
  enabledRotations = [true, true, true],
  enabledTranslations = [true, true, true],
  enableZoom = false,
  zoomDistance = 10,
  showModelAnim = true,
  showAxesHelper = false,
  useCloneGltf = false,
}: ModelType) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const {camera} = useThree()
  const {preventAllEvent, setPreventAllEvent} = useZustand()
  const {modelScene, mixer, actions} = useCustomGltf(modelPath, useCloneGltf)

  const bind = useGesture({
    onPointerDown: (state) => {
      const {event} = state

      if (
        event.button === 0 &&
        enableZoom &&
        !preventAllEvent &&
        rigidBodyRef.current
      ) {
        // Left
        const rigidBodyWorldPos = vec3(rigidBodyRef.current.translation())
        const distance = camera.position.distanceTo(rigidBodyWorldPos)

        if (distance > zoomDistance) {
          const direc = rigidBodyWorldPos
              .clone()
              .sub(camera.position)
              .multiplyScalar((distance - zoomDistance * 0.9) / distance)
          const cameraTarget = camera.position.clone().add(direc)

          if (SHOW_ANIM) {
            setPreventAllEvent(true)
            gsap.timeline().to(camera.position, {
              x: cameraTarget.x,
              y: cameraTarget.y,
              z: cameraTarget.z,
              duration: ANIM_DURATION,
              onComplete: () => {
                setPreventAllEvent(false)
              },
            })
          } else {
            camera.position.copy(cameraTarget)
          }
        }
      }
    },
  })

  useEffect(() => {
    if (actions && showModelAnim) {
      Object.values(actions).forEach((action) => {
        action.play()
      })
    }
  }, [actions, showModelAnim])

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta)
    }
  })

  return modelScene ? (
    <RigidBody
      ref={rigidBodyRef}
      colliders={colliders}
      position={rigidPos}
      rotation={rigidRot}
      scale={rigidScale}
      enabledRotations={enabledRotations}
      enabledTranslations={enabledTranslations}
      angularDamping={ANGULAR_DAMPING}
      linearDamping={LINEAR_DAMPING}
      {...bind()}
    >
      <primitive
        object={modelScene}
        position={modelPos}
        rotation={modelRot}
        scale={modelScale}
        visible={visible}
      />
      {children}
      {showAxesHelper && <axesHelper args={[AXES_LENGTH]}/>}
    </RigidBody>
  ) : (
    <></>
  )
}
