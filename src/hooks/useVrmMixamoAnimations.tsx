import {VRM, VRMHumanBoneName} from '@pixiv/three-vrm'
import {useEffect, useState} from 'react'
import {
  AnimationClip,
  AnimationMixer,
  QuaternionKeyframeTrack,
  VectorKeyframeTrack,
} from 'three'

import {mixamoVRMRigMap} from '../utils/constants'

export const useVrmMixamoAnimations = (
    vrm: VRM | undefined,
    mixamoAnimation: AnimationClip | undefined,
    exceptionBoneNames: Array<string> = [],
) => {
  const [mixer, setMixer] = useState<AnimationMixer>()
  const [mixamoAction, setMixamoAction] = useState<AnimationClip>()

  useEffect(() => {
    try {
      if (!vrm || !vrm.scene || !mixamoAnimation) {
        return
      }

      const newMixer = new AnimationMixer(vrm.scene)
      setMixer(newMixer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tracks: any = []

      mixamoAnimation.tracks.forEach((track) => {
        const trackSplit = track.name.split('.')
        const mixamoRigName = trackSplit[0]
        const vrmBoneName: VRMHumanBoneName = mixamoVRMRigMap[mixamoRigName]

        if (exceptionBoneNames.indexOf(vrmBoneName) > -1) {
          return
        }

        const vrmBoneNode = vrm.humanoid?.getRawBoneNode(vrmBoneName)
        const vrmNodeName = vrmBoneNode?.name

        if (vrmNodeName) {
          const propertyName = trackSplit[1]

          if (track instanceof QuaternionKeyframeTrack) {
            tracks.push(
                new QuaternionKeyframeTrack(
                    `${vrmNodeName}.${propertyName}`,
                    track.times,
                    track.values.map((v, i) =>
                  vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v,
                    ),
                ),
            )
          } else if (track instanceof VectorKeyframeTrack) {
            tracks.push(
                new VectorKeyframeTrack(
                    `${vrmNodeName}.${propertyName}`,
                    track.times,
                    track.values.map(
                        (v, i) =>
                          (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) *
                    0.01,
                    ),
                ),
            )
          }
        }
      })

      const newMixamoClip = new AnimationClip(
          'vrmAnimation',
          mixamoAnimation.duration,
          tracks,
      )
      setMixamoAction(newMixamoClip)
    } catch (e) {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vrm, mixamoAnimation])

  return {
    mixer,
    mixamoAction,
  }
}
