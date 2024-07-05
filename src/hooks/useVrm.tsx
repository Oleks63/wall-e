// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {VRM, VRMLoaderPlugin, VRMUtils} from '@pixiv/three-vrm'
import {useEffect, useState} from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export const useVrm = (vrmUrl: string) => {
  const [vrm, setVrm] = useState<VRM>()

  useEffect(() => {
    (async () => {
      if (!vrmUrl) {
        return
      }
      const gltf = await gltfLoader.loadAsync(vrmUrl)
      const newVrm = gltf.userData.vrm
      // VRMUtils.rotateVRM0(newVrm)
      setVrm(newVrm)
    })()
  }, [vrmUrl])

  return vrm
}

const gltfLoader = new GLTFLoader()
gltfLoader.register((parser) => new VRMLoaderPlugin(parser))
