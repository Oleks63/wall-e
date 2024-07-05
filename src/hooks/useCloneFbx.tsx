import {useFBX} from '@react-three/drei'
import {useEffect, useState} from 'react'
import {Object3D} from 'three'
import {clone} from 'three/examples/jsm/utils/SkeletonUtils'

export const useCloneFbx = (fbxUrl: string) => {
  const [modelScene, setModelScene] = useState<Object3D>()
  const fbx = useFBX(fbxUrl)

  useEffect(() => {
    setModelScene(clone(fbx))
  }, [fbx])

  return modelScene
}
