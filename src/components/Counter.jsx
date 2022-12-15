import React from 'react'
import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)
  return (
    <div className='container-lg cm'>
      <div className="row text-center">
        <div className="col-lg-12">
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      </div>
    </div>
  )
}

export default Counter
