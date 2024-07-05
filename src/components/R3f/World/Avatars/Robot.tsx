import {useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {
  BallCollider,
  RapierRigidBody,
  RigidBody,
  vec3,
} from '@react-three/rapier'
import {useControls} from 'leva'
import React, {useCallback, useEffect, useRef} from 'react'
import * as THREE from 'three'

import {useEachGltfActions} from '../../../../hooks/useEachGltfActions'
import {useGltfAnimations} from '../../../../hooks/useGltfAnimations'
import {useZustand} from '../../../../store/useZustand'
import {AnimController} from '../../../../utils/animController'
import {
  ANGULAR_DAMPING,
  BACK_DIRECTION_VEC3,
  FRONT_DIRECTION_VEC3,
  LEFT_DIRECTION_VEC3,
  LINEAR_DAMPING,
  RIGHT_DIRECTION_VEC3,
  Y_VEC3,
} from '../../../../utils/constants'
import {controls} from '../../../../utils/controls'
import {customDebug} from '../../../../utils/customDebug'

export const Robot = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const {robotPath, robotAnimPath, showRobotAnim} = useControls(controls)
  const {
    preventAllEvent,
    avatarAnimController,
    setAvatarAnimController,
    setAvatarRigidBodyEl,
    avatarIsJumping,
    setAvatarIsJumping,
    showModal,
    isFront,
    isBack,
    isLeft,
    isRight,
    isJump,
  } = useZustand()

  const glbModel = useGLTF(robotPath)
  const {mixer} = useGltfAnimations(glbModel)

  const animGlbModel = useGLTF(robotAnimPath)
  const actions = useEachGltfActions(mixer, animGlbModel)

  const idleAnimGlbModel = useGLTF('models/avatars/robot/look-around.glb')
  const idleActions = useEachGltfActions(mixer, idleAnimGlbModel)
  const runAnimGlbModel = useGLTF('models/avatars/robot/run.glb')
  const runActions = useEachGltfActions(mixer, runAnimGlbModel)
  const jumpAnimGlbModel = useGLTF('models/avatars/robot/jump.glb')
  const jumpActions = useEachGltfActions(mixer, jumpAnimGlbModel)

  const setRobotRigidBodyElement = useCallback(() => {
    if (rigidBodyRef?.current) {
      setAvatarRigidBodyEl(rigidBodyRef.current)
      glbModel.scene.rotation.y += Math.PI
    } else {
      setTimeout(setRobotRigidBodyElement, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glbModel])

  const getAllActions = useCallback(() => {
    if (!idleActions || !jumpActions || !runActions) {
      return
    }

    const allActions = {
      Idle: Object.values(idleActions)[0],
      Run: Object.values(runActions)[0],
      Jump: Object.values(jumpActions)[0],
    }

    return allActions
  }, [idleActions, jumpActions, runActions])

  const updateAnim = useCallback(
      (animName: string) => {
        if (moveState !== animName && avatarAnimController) {
          moveState = animName
          avatarAnimController.playNewActionOnly(animName)
        }
      },
      [avatarAnimController],
  )

  const setDirection = (speed: number) => {
    direcVec3.set(0, 0, 0)

    if (isFront) {
      direcVec3.add(FRONT_DIRECTION_VEC3.clone().multiplyScalar(speed))
    }

    if (isBack) {
      direcVec3.add(BACK_DIRECTION_VEC3.clone().multiplyScalar(speed))
    }

    if (isLeft) {
      direcVec3.add(LEFT_DIRECTION_VEC3.clone().multiplyScalar(speed))
    }

    if (isRight) {
      direcVec3.add(RIGHT_DIRECTION_VEC3.clone().multiplyScalar(speed))
    }
  }

  // Set robot rigid body state
  useEffect(() => {
    setRobotRigidBodyElement()
    updateAnim('Idle')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update animation according to manual control from UI
  useEffect(() => {
    if (actions) {
      const action = Object.values(actions)[0]
      if (showRobotAnim) {
        avatarAnimController?.setWeight(action, 1)
        action.play()
      } else {
        Object.values(actions)[0].stop()
      }
    }
  }, [actions, avatarAnimController, showRobotAnim])

  // Generate animation controller
  useEffect(() => {
    if (!mixer || !idleActions || !jumpActions || !runActions) {
      return
    }

    const allActions = getAllActions()
    customDebug().log('Robot#useEffect: allActions: ', allActions)

    if (allActions) {
      const newAvatarAnimController = new AnimController(mixer, allActions)
      setAvatarAnimController(newAvatarAnimController)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleActions, jumpActions, mixer, runActions])

  // Push robot up and play jump animation
  useEffect(() => {
    if (isJump && rigidBodyRef?.current && moveState !== 'jump') {
      rigidBodyRef.current.applyImpulse(
          Y_VEC3.clone().multiplyScalar(600),
          true,
      )
      setDirection(0.3)
      rigidBodyRef.current.applyImpulse(direcVec3.multiplyScalar(600), true)
      updateAnim('Jump')
      setAvatarIsJumping(true)
      setTimeout(() => {
        setAvatarIsJumping(false)
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarAnimController, isJump])

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta)
    }

    if (showModal || avatarIsJumping || preventAllEvent) {
      return
    }

    if (rigidBodyRef.current) {
      const avatarCurPos = vec3(rigidBodyRef.current.translation())
      tempObj3D.position.copy(avatarCurPos)

      if (
        (isFront || isBack || isLeft || isRight) &&
        (isFront !== isBack || isLeft !== isRight)
      ) {
        setDirection(delta * 10)
        rigidBodyRef.current.setTranslation(
            avatarCurPos.clone().add(direcVec3),
            true,
        )
        tempObj3D.lookAt(avatarCurPos.clone().sub(direcVec3))
        updateAnim('Run')
      } else {
        updateAnim('Idle')
      }

      rigidBodyRef.current.setRotation(tempObj3D.quaternion, true)
    }
  })

  return (
    glbModel?.scene && (
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        position={[0, 10, 0]}
        scale={1.5}
        enabledRotations={[false, false, false]}
        enabledTranslations={[true, true, true]}
        angularDamping={ANGULAR_DAMPING}
        linearDamping={LINEAR_DAMPING}
      >
        <primitive object={glbModel.scene}/>
        <BallCollider args={[1.2]} position={[0, 1.2, 0]}/>
      </RigidBody>
    )
  )
}

let moveState: string
const tempObj3D = new THREE.Object3D()
const direcVec3 = new THREE.Vector3()
