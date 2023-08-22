import React from 'react'
import './loading.css'
const Loading = () => {
  return (
    <div className='font-serif flex justify-center items-center min-h-[100vh]'>
      <div className="loading">
        <span style={{'--i': 1}}>L</span>
        <span style={{'--i': 2}}>o</span>
        <span style={{'--i': 3}}>a</span>
        <span style={{'--i': 4}}>d</span>
        <span style={{'--i': 5}}>i</span>
        <span style={{'--i': 6}}>n</span>
        <span style={{'--i': 7}}>g</span>
        <span style={{'--i': 8}}>.</span>
        <span style={{'--i': 9}}>.</span>
        <span style={{'--i': 10}}>.</span>
      </div>
    </div>
  )
}

export default Loading