import React, { useState } from 'react'
import Banner from './components/Banner'
import Statistics from './components/Statistics'
import MyHistory from './components/MyHistory'
declare let window: any

const Home: React.FC = () => {

  return (
    <div>
      <Banner />
      <Statistics />
      <MyHistory />
    </div>
  )
}

export default Home
