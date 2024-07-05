import React from 'react'

import {R3f} from './components/R3f/R3f'
import {Modal} from './components/UI/Modal'
import {Keyboard} from './components/Utils/Keyboard'
import {LineLoader} from './components/Utils/Loader/LineLoader'

const App = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col">
      <R3f/>
      <Modal/>
      <LineLoader/>
      <Keyboard/>
    </div>
  )
}

export default App
