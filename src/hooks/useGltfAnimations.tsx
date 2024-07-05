import {useEffect, useState} from 'react'
import {AnimationMixer} from 'three'
import {GLTF} from 'three-stdlib'

import {AnimationActionMap} from '../utils/types'

export const useGltfAnimations = (gltf: GLTF) => {
  const [mixer, setMixer] = useState<AnimationMixer>()
  const [actions, setActions] = useState<AnimationActionMap>()

  useEffect(() => {
    const newMixer = new AnimationMixer(gltf.scene)
    const newActions: AnimationActionMap = {}
    gltf.animations.forEach((animation) => {
      newActions[animation.name] = newMixer.clipAction(animation)
    })
    setMixer(newMixer)
    setActions(newActions)
  }, [gltf])

  return {mixer, actions}
}
