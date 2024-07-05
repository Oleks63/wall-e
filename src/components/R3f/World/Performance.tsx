import {PerformanceMonitor} from '@react-three/drei'
import {useThree} from '@react-three/fiber'
import React, {ReactNode} from 'react'

import {useDprFactor} from '../../../hooks/useDprFactor'
import {customDebug} from '../../../utils/customDebug'

export const Performance = ({children}: { children: ReactNode }) => {
  const {setDpr} = useThree()
  const dprFactor = useDprFactor()

  return (
    <PerformanceMonitor
      onChange={({factor}) => {
        const newDpr = (0.5 + 1.5 * factor) * dprFactor
        customDebug().log(
            'World#PerformanceMonitor#onChange: newDpr: ',
            newDpr,
        )
        setDpr(newDpr)
      }}
      onIncline={() => {
        customDebug().log('World#PerformanceMonitor#onIncline')
        setDpr(2 * dprFactor)
      }}
      onDecline={() => {
        customDebug().log('World#PerformanceMonitor#onDecline')
        setDpr(0.5 * dprFactor)
      }}
      flipflops={3}
      onFallback={() => {
        customDebug().log('World#PerformanceMonitor#onFallback')
        setDpr(0.5 * dprFactor)
      }}
    >
      {children}
    </PerformanceMonitor>
  )
}
