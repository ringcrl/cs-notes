export interface SimpleChange<T> {
  firstChange: boolean
  previousValue: T
  currentValue: T
  isFirstChange: () => boolean
}

export type CallBackFunction<T> = (value: T, change?: SimpleChange<T>) => void

export function OnChange<T = any> (callback: CallBackFunction<T> | string) {
  const cachedValueKey = Symbol('1')
  const isFirstChangeKey = Symbol('2')

  return (target: any, key: PropertyKey) => {
    const callBackFn: CallBackFunction<T> = typeof callback === 'string' ? target[callback] : callback
    if (!callBackFn) {
      throw new Error(`Cannot find method ${callback} in class ${target.constructor.name}`)
    }

    Object.defineProperty(target, key, {
      set (value) {
        // change status of "isFirstChange"
        this[isFirstChangeKey] = this[isFirstChangeKey] === undefined

        // No operation if new value is same as old value
        if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
          return
        }

        const oldValue = this[cachedValueKey]
        this[cachedValueKey] = value
        const simpleChange: SimpleChange<T> = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey]
        }
        callBackFn.call(this, this[cachedValueKey], simpleChange)
      },
      get () {
        return this[cachedValueKey]
      }
    })
  }
}
