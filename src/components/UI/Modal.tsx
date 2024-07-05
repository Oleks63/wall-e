import classNames from 'classnames'
import React from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'

import {useZustand} from '../../store/useZustand'
import {USE_CONTROLS} from '../../utils/constants'

export const Modal = () => {
  const {
    setPreventAllEvent,
    avatarRigidBodyEl,
    showModal,
    setShowModal,
    siteUrl,
  } = useZustand()

  return (
    <div
      className={classNames({
        'fixed h-screen w-screen bg-slate-900': true,
        'hidden': !showModal,
      })}
    >
      <AiFillCloseCircle
        className="absolute top-4 right-4 h-8 w-8 cursor-pointer text-gray-500 hover:text-red-500"
        onClick={() => {
          if (!USE_CONTROLS && avatarRigidBodyEl) {
            document.body.requestPointerLock()
          }

          setPreventAllEvent(true)
          setShowModal(false)
        }}
      />
      {siteUrl && (
        <iframe className="h-full w-full" src={siteUrl} title="Project Site"/>
      )}
    </div>
  )
}
