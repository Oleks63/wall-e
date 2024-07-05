import {useProgress} from '@react-three/drei'
import classnames from 'classnames'
import React, {useEffect, useState} from 'react'

import {usePrevious} from '../../../hooks/usePrevious'

const firstWaitPercent = 99
const lastWaitCnt = 2

export const LineLoader = () => {
  const {progress} = useProgress()
  const [loaded, setLoaded] = useState(false)
  const [totalProgress, setTotalProgress] = useState(0)
  const prevTotalProgress = usePrevious(totalProgress, 0)

  useEffect(() => {
    const newTotalProgress = progress * firstWaitPercent * 0.01

    if (newTotalProgress > prevTotalProgress) {
      setTotalProgress(progress * firstWaitPercent * 0.01)
    }

    if (progress >= 100) {
      setLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  useEffect(() => {
    if (!loaded) {
      return
    }

    setTimeout(() => {
      if (totalProgress <= 100) {
        const newTotalProgress =
          totalProgress + (100 - firstWaitPercent) / lastWaitCnt
        setTotalProgress(newTotalProgress)
      }
    }, 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalProgress])

  return (
    <div
      className={classnames({
        'fixed flex h-screen w-screen items-center justify-center bg-black p-10':
          true,
        'hidden': totalProgress >= 100,
      })}
    >
      <div className="h-1 w-full bg-white ">
        <div
          className="h-full bg-orange-900"
          style={{width: `${totalProgress}%`}}
        />
      </div>
    </div>
  )
}
