import React, {useEffect} from 'react'

import {useZustand} from '../../store/useZustand'

export const Keyboard = () => {
  const {
    setIsFront,
    setIsLeft,
    setIsBack,
    setIsRight,
    setIsFast,
    setIsGrab,
    setIsJump,
  } = useZustand()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          setIsFront(true)
          break
        case 'KeyA':
          setIsLeft(true)
          break
        case 'KeyS':
          setIsBack(true)
          break
        case 'KeyD':
          setIsRight(true)
          break
        case 'ShiftLeft':
          setIsFast(true)
          break
        case 'KeyE':
          setIsGrab(true)
          break
        case 'Space':
          setIsJump(true)
          break
        default:
          break
      }
    }

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          setIsFront(false)
          break
        case 'KeyA':
          setIsLeft(false)
          break
        case 'KeyS':
          setIsBack(false)
          break
        case 'KeyD':
          setIsRight(false)
          break
        case 'ShiftLeft':
          setIsFast(false)
          break
        case 'KeyE':
          setIsGrab(false)
          break
        case 'Space':
          setIsJump(false)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
