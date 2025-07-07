import { useState } from 'react'
import './App.css'
import { useBearStore } from './store/useStore'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increase)
  const decrease = useBearStore((state) => state.decrease)

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>
          Hello world!
        </h1>
        <br />
        <Button onClick={() => setCount(count + 1)}>
          Click me
        </Button>
        <p>Count: {count}</p>
        <br />
        <p>Bears: {bears}</p>
        <Button onClick={() => increase(1)}>
          Increase
        </Button>
        <br />
        <Button onClick={() => decrease(1)}>
          Decrease
        </Button>
      </div>
    </>
  )
}

export default App
