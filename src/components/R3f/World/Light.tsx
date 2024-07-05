import React from 'react'

import {LIGHT_INTENSITY, SHOW_SHADOW} from '../../../utils/constants'
import {LightPoint} from '../../Utils/LightPoint'

export const Light = () => {
  return (
    <>
      <ambientLight position={[-5, 5, 5]} intensity={LIGHT_INTENSITY}>
        <LightPoint/>
      </ambientLight>
      <directionalLight
        position={[5, 5, 5]}
        intensity={LIGHT_INTENSITY}
        castShadow={SHOW_SHADOW}
        receiveShadow={SHOW_SHADOW}
      >
        <LightPoint/>
      </directionalLight>
    </>
  )
}
