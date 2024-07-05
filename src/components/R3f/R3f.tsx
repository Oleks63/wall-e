import {AdaptiveDpr, BakeShadows, Preload} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import React, {Suspense, useEffect, useRef} from 'react'

import {useDprFactor} from '../../hooks/useDprFactor'
import {useZustand} from '../../store/useZustand'
import {IS_PERFORMANCE_MONITORING} from '../../utils/constants'
import {Camera} from './Camera'
import {Performance} from './World/Performance'
import {World} from './World/World'

export const R3f = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dprFactor = useDprFactor()
  const {setCanvasEl} = useZustand()

  useEffect(() => {
    if (canvasRef?.current) {
      setCanvasEl(canvasRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Suspense>
      <Canvas ref={canvasRef} dpr={2 * dprFactor} shadows>
        <AdaptiveDpr pixelated/>
        <Camera/>
        {IS_PERFORMANCE_MONITORING ? (
          <Performance>
            <World/>
          </Performance>
        ) : (
          <World/>
        )}
        <BakeShadows/>
        <Preload all/>
      </Canvas>
    </Suspense>
  )
}
