import React from 'react'

import { AutoScroll } from 'qute-d'
import 'qute-d/dist/index.css'

const App = () => {
  return <div style={{
    background: 'yellow'
  }}>
    <AutoScroll speed={'speed'} >
      <div className='aaa'>1</div>
      <div className='aaa'>2</div>
      <div className='aaa'>3</div>
    </AutoScroll>
  </div>
}

export default App
