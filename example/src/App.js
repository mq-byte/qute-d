import React from 'react'

import { AutoScroll, concurrencyFetch } from 'qute-d'
import 'qute-d/dist/index.css'

const createPromise = (val,time)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(val)
    },time)
  })
}
console.log('444');

concurrencyFetch([
  createPromise.bind(null,1,5000),
  createPromise.bind(null,2,1000),
  createPromise.bind(null,3,1000),
  createPromise.bind(null,4,2000),
  createPromise.bind(null,5,3000),
  createPromise.bind(null,6,4000),
  createPromise.bind(null,7,3000)
],3).then((r)=>{
  console.log(r, '------------');
})



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
