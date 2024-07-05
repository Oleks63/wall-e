import React from 'react'
import {Vector3} from 'three'

import {PROJECT_ARR} from '../../../utils/constants'
import {Frame} from '../../Utils/Frame'

const tempVec3 = new Vector3()

export const Projects = () => {
  return (
    <>
      {PROJECT_ARR.map((project, index) => {
        tempVec3.setFromCylindricalCoords(
            1.35,
            Math.PI * 0.1 * (index + 1),
            -0.6,
        )

        return (
          <Frame
            key={index}
            photoUrl={project.photoUrl}
            siteUrl={project.siteUrl}
            rigidPos={[tempVec3.x, tempVec3.y, tempVec3.z]}
            rigidRot={[0, Math.PI + Math.PI * 0.1 * (index + 1), 0]}
            rigidScale={0.01}
            useCloneGltf={true}
          />
        )
      })}
    </>
  )
}
