import {useZustand} from '../store/useZustand'
import {DPR_FACTOR} from '../utils/constants'

export const useDprFactor = () => {
  const {isMobile} = useZustand()
  const dprFactor = isMobile ? DPR_FACTOR * 0.5 : DPR_FACTOR
  return dprFactor
}
