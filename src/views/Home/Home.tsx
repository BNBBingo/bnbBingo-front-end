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
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { account, fullscreen, setFullScreenMode } = useArcadeContext()
  const [showHowToPlay, setShowHowToPlay] = useState(false)


  const onClickArcadeMarket = () => {
    history.push('/market')
  }

  const onClickBuyArcadeDoge = () => {
    window.location.href = `https://pancakeswap.finance/swap?outputCurrency=${process.env.REACT_APP_ARCADEDOGE_ADDRESS}`
  }

  const onOpenConvertGameToken = () => {
    console.log('account', account)
    if (!account) {
      dispatch(setWalletMenu(true))
    } else {
      getValidationCheck(account)
      .then((result) => {
        if (result.result === 0) {
          dispatch(setPointSwap(true))
        } else {
          arcadeAlert("No matching game account found!")
        }
      })
    }
  }

  const requestFullScreen = (element: any, fullscreen: boolean) => {
    if (fullscreen === true) {
      fscreen.requestFullscreen(element)
    } else {
      fscreen.exitFullscreen()
    }
  }

  const onClickFullScreen = () => {
    setFullScreenMode(!fullscreen)
    requestFullScreen(document.body, !fullscreen)
  }

  fscreen.onfullscreenchange = () => {
    if (fullscreen && !fscreen.fullscreenElement) {
      setFullScreenMode(false)
    }
  }

  return (
    <div>
      <Banner />
      <Statistics />
      <MyHistory />
    </div>
  )
}

export default Home
