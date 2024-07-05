// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Debug, Physics} from '@react-three/rapier'
import React from 'react'

import {
  AXES_LENGTH,
  SHOW_AXES_HELPER,
  USE_CONTROLS,
} from '../../../utils/constants'
import {Robot} from './Avatars/Robot'
import {Controls} from './Controls'
import {Effect} from './Effect'
import {Light} from './Light'
import {Scene} from './Scene'

export const World = () => {
  return (
    <Physics gravity={[0, -9.8 * 3, 0]}>
      <Effect/>
      <Light/>
      <Scene/>
      <Robot/>
      {/* <AvatarName/> */}
      {USE_CONTROLS && <Controls/>}
      {SHOW_AXES_HELPER && <axesHelper args={[AXES_LENGTH]}/>}
      {/* <Debug/> */}
    </Physics>
  )
}
