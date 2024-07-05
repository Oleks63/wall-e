import React from 'react'

import {LIGHT_RADIUS} from '../../utils/constants'

export const LightPoint = () => {
  return (
    <mesh>
      <sphereGeometry args={[LIGHT_RADIUS]}/>
      <meshStandardMaterial color={'red'}/>
    </mesh>
  )
}
