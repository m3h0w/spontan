export type Replace<T, TReplace> = Omit<T, keyof TReplace> & TReplace
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
