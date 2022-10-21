import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { hookstate, useHookstate } from '@hookstate/core'

const globalState = hookstate(0)

setInterval(() => globalState.set(p => p + 1), 3000)

const ExampleComponent = () => {
  const state = useHookstate(globalState)
  return (
    <>
      <b>Counter value: {state.get()}</b> (watch +1 every 3 seconds) {' '}
      <button onClick={() => state.set(p => p + 1)}>Increment</button>
    </>
  )
}

const container = document.getElementById('root')
if (container !== null) {
  const root = createRoot(container)
  root.render(<ExampleComponent />)
}
