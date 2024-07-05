import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'

export const DetectDevice = () => {
  const {isMobile} = useZustand()

  return (
    <div className={classNames({
      'fixed w-full h-full bg-slate-900 text-text-gray flex items-center justify-center text-center': true,
      'hidden': !isMobile,
    })}
    >
      Please use a desktop device.
    </div>
  )
}
