import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
      </div>
    </>
  )
}

export default App
