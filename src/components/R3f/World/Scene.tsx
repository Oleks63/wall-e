import {useThree} from '@react-three/fiber'
import gsap from 'gsap'
import React, {useEffect} from 'react'

import {useZustand} from '../../../store/useZustand'
import {
  ANIM_DURATION,
  PHOTO_URL,
  PORTFOLIO_URL,
  SHOW_ANIM,
} from '../../../utils/constants'
import {Frame} from '../../Utils/Frame'
import {Model} from '../../Utils/Model'
import {Projects} from './Projects'

export const Scene = () => {
  const {camera} = useThree()
  const {
    setPreventAllEvent,
    setPreventCameraMove,
    cameraPrevWorldPos,
    showModal,
  } = useZustand()

  useEffect(() => {
    if (!SHOW_ANIM || !camera?.position || showModal) {
      return
    }

    gsap.timeline().to(camera.position, {
      x: cameraPrevWorldPos.x,
      y: cameraPrevWorldPos.y,
      z: cameraPrevWorldPos.z,
      duration: ANIM_DURATION,
      onComplete: () => {
        setPreventCameraMove(false)
        setPreventAllEvent(false)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal])

  return (
    <>
      {/* Land */}
      <Model
        modelPath="models/container.glb"
        colliders="trimesh"
        rigidPos={[0, 30, 0]}
        rigidRot={[0, Math.PI, 0]}
        rigidScale={50}
        enabledRotations={[false, false, false]}
        enabledTranslations={[false, false, false]}
      >
        {/* Photo */}
        <Frame
          photoUrl={PHOTO_URL}
          siteUrl={PORTFOLIO_URL}
          rigidPos={[0, -0.6, 1.35]}
          rigidRot={[0, Math.PI, 0]}
          rigidScale={0.015}
        />
        <Projects/>
      </Model>
    </>
  )
}
