export type Logger = {
  info: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  debug: (...args: unknown[]) => void
  trace: (...args: unknown[]) => void
  fatal: (...args: unknown[]) => void
}
