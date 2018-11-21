import React from 'react'

const HomePage = () => {
  return (
    <div>
      <div>I'm the BEST home</div>
      <button onClick={() => console.log('hi')}>Click</button>
    </div>
  )
}

export default {
  component: HomePage,
}
