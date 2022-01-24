import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import fscreen from 'fscreen'
import Banner from './components/Banner'
import Statistics from './components/Statistics'
import MyHistory from './components/MyHistory'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useAppDispatch } from 'state'
import { setWalletMenu, setPointSwap } from 'state/show'
import { getValidationCheck } from 'hooks/gameapi'
import { arcadeAlert } from 'utils/arcadealert'

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
