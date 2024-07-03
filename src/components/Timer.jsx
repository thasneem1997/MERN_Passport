import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function Timer() {
  const[count,setCount]=useState(0)
  useEffect(()=>{
    setTimeout(()=>{
      setCount(count+1)
    },2000)
  },[count])
  return (
    <div>
      <h1>count is {count}</h1>
    </div>
  )
}

export default Timer
