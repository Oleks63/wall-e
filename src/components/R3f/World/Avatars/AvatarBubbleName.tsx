/* eslint-disable react/no-unknown-property */
import {AVATAR_FIRST_NAME, AVATAR_LAST_NAME} from '../../../../utils/constants'

import {BubbleText} from '../../../Utils/BubbleText'
import React from 'react'

export const AvatarBubbleName = () => {
  return (
    <group position={[0, 0, -5]}>
      <BubbleText
        text={AVATAR_FIRST_NAME}
        position={[-5, 0, 0]}
        rotation={[0, Math.PI / 4, 0]}
        scale={1}
      />
      <BubbleText
        text={AVATAR_LAST_NAME}
        position={[5, 0, -0]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={1}
      />
    </group>
  )
}
