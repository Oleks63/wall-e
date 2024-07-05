import {Environment} from '@react-three/drei'
import {Bloom, EffectComposer} from '@react-three/postprocessing'
import React from 'react'

export const Effect = () => {
  return (
    <>
      <Environment
        files={['bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png']}
        path="envMap/"
        background
      />
      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.8}/>
      </EffectComposer>
    </>
  )
}
