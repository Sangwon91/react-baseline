import { useState } from 'react'
import './App.css'
import { useBearStore } from './store/useStore'

function App() {
  const [count, setCount] = useState(0)
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increase)
  const decrease = useBearStore((state) => state.decrease)

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white p-2 rounded-md">
          Click me
        </button>
        <p>Count: {count}</p>
        <p>Bears: {bears}</p>
        <button onClick={() => increase(1)} className="bg-blue-500 text-white p-2 rounded-md">
          Increase
        </button>
        <button onClick={() => decrease(1)} className="bg-blue-500 text-white p-2 rounded-md">
          Decrease
        </button>
      </div>
    </>
  )
}

export default App
