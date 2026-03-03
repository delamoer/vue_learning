/**
 * 根据环境变量 VUE_APP_LOG_LEVEL 控制日志输出
 * debug > info > warn > error
 */
const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }
const CURRENT = LEVELS[process.env.VUE_APP_LOG_LEVEL] ?? LEVELS.error

export const logger = {
  debug(...args) {
    if (CURRENT <= LEVELS.debug) console.log('[DEBUG]', ...args)
  },
  info(...args) {
    if (CURRENT <= LEVELS.info) console.info('[INFO]', ...args)
  },
  warn(...args) {
    if (CURRENT <= LEVELS.warn) console.warn('[WARN]', ...args)
  },
  error(...args) {
    console.error('[ERROR]', ...args)
  }
}

export default logger
