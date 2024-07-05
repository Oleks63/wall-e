import {useTexture} from '@react-three/drei'
import React from 'react'

import {useZustand} from '../../store/useZustand'
import {SHOW_SHADOW, USE_CONTROLS} from '../../utils/constants'
import {FrameType} from '../../utils/types'
import {Model} from './Model'
import {Sprite} from './Sprite'

export const Frame = ({
  photoUrl,
  siteUrl,
  rigidPos,
  rigidRot,
  rigidScale,
  useCloneGltf,
}: FrameType) => {
  const texture = useTexture(photoUrl)
  const {setSiteUrl} = useZustand()

  const openModal = () => {
    if (!USE_CONTROLS) {
      document.exitPointerLock()
    }

    setSiteUrl(siteUrl)
  }

  return (
    <Model
      modelPath="models/frame.glb"
      rigidPos={rigidPos || [0, 0, 0]}
      rigidRot={rigidRot || [0, 0, 0]}
      rigidScale={rigidScale || 1}
      enabledRotations={[false, false, false]}
      enabledTranslations={[false, true, false]}
      useCloneGltf={useCloneGltf}
    >
      <mesh
        position={[0, -0.2, 0.22]}
        castShadow={SHOW_SHADOW}
        receiveShadow={SHOW_SHADOW}
      >
        <planeGeometry args={[6.5, 6.5]}/>
        <meshPhongMaterial map={texture}/>
      </mesh>
      <mesh
        position={[0, -0.2, 0.26]}
        rotation={[0, Math.PI, 0]}
        castShadow={SHOW_SHADOW}
        receiveShadow={SHOW_SHADOW}
      >
        <planeGeometry args={[6.5, 6.5]}/>
        <meshPhongMaterial color="black"/>
      </mesh>
      {siteUrl && (
        <Sprite
          text="E"
          position={[0, 0, 0]}
          onGrab={openModal}
          onClick={openModal}
          grabDistance={7}
          zoomDistance={2}
        />
      )}
    </Model>
  )
}
