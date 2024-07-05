import {Html} from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {vec3} from '@react-three/rapier'
import classnames from 'classnames'
import gsap from 'gsap'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Group, Vector3} from 'three'

import {useZustand} from '../../store/useZustand'
import {ANIM_DURATION, SHOW_ANIM} from '../../utils/constants'
import {SpriteType} from '../../utils/types'

const groupWorldPos = new Vector3()

export const Sprite = ({
  text,
  position,
  onClick,
  onGrab,
  grabDistance = 0,
  zoomDistance = 0,
}: SpriteType) => {
  const groupRef = useRef<Group>(null)
  const {camera} = useThree()
  const {
    preventAllEvent,
    setPreventAllEvent,
    setPreventCameraMove,
    setCameraPrevWorldPos,
    avatarRigidBodyEl,
    setShowModal,
    isGrab,
  } = useZustand()
  const [showSprite, setShowSprite] = useState(true)

  const onModal = useCallback(() => {
    if (preventAllEvent || !camera?.position || !groupRef?.current) {
      return
    }

    setCameraPrevWorldPos(camera.position.clone())
    const htmlWorldPos = new Vector3()
    groupRef.current.getWorldPosition(htmlWorldPos)
    const distance = camera.position.distanceTo(htmlWorldPos)

    if (distance > zoomDistance && SHOW_ANIM) {
      const direction = htmlWorldPos
          .clone()
          .sub(camera.position)
          .multiplyScalar((distance - zoomDistance * 0.99) / distance)
      const cameraWorldTarget = camera.position.clone().add(direction)

      setPreventAllEvent(true)
      setPreventCameraMove(true)
      gsap.timeline().to(camera.position, {
        x: cameraWorldTarget.x,
        y: cameraWorldTarget.y,
        z: cameraWorldTarget.z,
        duration: ANIM_DURATION,
        onComplete: () => {
          setShowModal(true)
          setPreventAllEvent(false)
        },
      })
    } else {
      setShowModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isGrab && grabDistance && showSprite && onGrab && !preventAllEvent) {
      onGrab()
      onModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGrab])

  useFrame(() => {
    if (!grabDistance) {
      return
    }

    if (groupRef?.current && avatarRigidBodyEl) {
      groupRef.current.getWorldPosition(groupWorldPos)
      const avatarCurWorldPos = vec3(avatarRigidBodyEl.translation())
      const distance = avatarCurWorldPos.sub(groupWorldPos).length()
      const newShowSprite = distance < grabDistance

      if (showSprite !== newShowSprite) {
        setShowSprite(newShowSprite)
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        zIndexRange={[0, 0]}
        sprite={true}
        // occlude='raycast'
      >
        <div
          className={classnames({
            // eslint-disable-next-line max-len
            'flex cursor-pointer items-center justify-center rounded-full border border-yellow-500 bg-black bg-opacity-70 px-1 font-[Cascade] text-white hover:text-xl hover:text-yellow-500 active:text-red-500':
              true,
            'hidden': !showSprite,
          })}
          onClick={() => {
            if (onClick) {
              onClick()
              onModal()
            }
          }}
        >
          {text}
        </div>
      </Html>
    </group>
  )
}
