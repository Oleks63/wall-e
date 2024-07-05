import {Group} from 'three'

import {assertDefined} from './customAssert'

export const getModelNodes = (modelScene: Group) => {
  assertDefined(modelScene)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodes: any = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelScene.traverse((child: any) => {
    if (child.isMesh) {
      nodes[child.name] = child
    }
  })
  return nodes
}

export const getBaseLog = (x: number, y: number) => {
  return Math.log(y) / Math.log(x)
}

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
  )
}
