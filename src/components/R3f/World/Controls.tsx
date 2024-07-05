import {OrbitControls} from '@react-three/drei'
import React, {useEffect, useRef} from 'react'
import type {OrbitControls as OrbitControlsImpl} from 'three-stdlib'

import {useZustand} from '../../../store/useZustand'

export const Controls = () => {
  const orbitControls = useRef<OrbitControlsImpl>(null)
  const {setOrbitControls, preventAllEvent} = useZustand()

  useEffect(() => {
    setOrbitControls(orbitControls.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <OrbitControls
      ref={orbitControls}
      makeDefault
      enablePan={!preventAllEvent}
      enableRotate={!preventAllEvent}
      enableZoom={!preventAllEvent}
    />
  )
}
