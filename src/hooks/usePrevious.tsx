import {useEffect, useRef} from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePrevious = (value: any, initialValue: any) => {
  const ref = useRef(initialValue)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
