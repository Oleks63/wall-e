const OFF = 4
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ERROR = 3
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WARN = 2
const INFO = 1
const DEBUG = 0
let CUSTOM_DEBUG_LEVEL = DEBUG

/**
 * Create custom debug statement
 *
 * @param {number} level Default is INFO
 * @return {Function} Returned function is console.log or a no-op if debugging is turned off
 */
export function customDebug(level = INFO) {
  return level >= CUSTOM_DEBUG_LEVEL ? console : mockLog
}

/**
 * @param {number} level One of OFF, ERROR, WARN, INFO, DEBUG
 */
export function setCustomDebugLevel(level: number) {
  if (!Number.isFinite(level) || level < DEBUG || level > OFF) {
    throw new Error(`Debug level must be a number from ${DEBUG}-${OFF}`)
  }
  CUSTOM_DEBUG_LEVEL = level
}

/** Equivalent to setCustomDebugLevel(OFF) */
export function disableCustomDebug() {
  setCustomDebugLevel(OFF)
}

/**
 * When debugging is turned off, use this mock log object to throw away log messages
 */
const mockLog = {
  // eslint-disable-next-line no-empty-function
  log: () => {},
  // eslint-disable-next-line no-empty-function
  warn: () => {},
  // eslint-disable-next-line no-empty-function
  error: () => {},
  // eslint-disable-next-line no-empty-function
  time: () => {},
  // eslint-disable-next-line no-empty-function
  timeEnd: () => {},
}
