import React, { useEffect, useState } from 'react'
import Web3 from 'web3'

import { BNBBingoContext } from 'contexts/BNBBingoContext'
import * as Wallet from 'global/wallet'
import * as WalletUtils from 'global/wallet'
import * as CONST from 'global/const'

export const BNBBingoProvider: React.FC = ({ children }) => {

  const [account, setAccount] = useState<string>()
  const [web3, setWeb3] = useState<Web3>(new Web3())
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [connectType, setConnectType] = useState<number>(CONST.WALLET_TYPE.NONE)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  
  const getWeb3 = async () => {
    let provider = await Wallet.getCurrentProvider()
    if (provider === null)
      provider = Web3.givenProvider
    const web3 = new Web3(provider)
    return web3
  }

  const initAddress = async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (address !== account) setAccount(address === null ? '' : address)
  }

  const updateConnect = async () => {
    setIsConnected(await WalletUtils.isConnected())
    setConnectType(Number(await WalletUtils.getWalletType()))
    initAddress()
  }

  const connectWallet = async (connectType: number = CONST.WALLET_TYPE.WALLETCONNECT) => {
    await WalletUtils.connect(connectType)
    await initWeb3()
  }

  const disconnectWallet = () => {
    WalletUtils.disconnect()
    setConnectType(CONST.WALLET_TYPE.NONE)
    initAddress()
  }

  const initWeb3 = async () => {
    setWeb3(await getWeb3())
    updateConnect()
  }

  const initConnection = async () => {
    if (WalletUtils.isPreviousConnected()) {
      connectWallet(Number(WalletUtils.getPreviousWalletType()))
    }
  }

  const setFullScreenMode = (isSet: boolean) => {
    setFullscreen(isSet)
  }

  useEffect(() => {
    initConnection()
    initWeb3()
// eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!account)
      setIsConnected(false)
    else
      setIsConnected(true)
  }, [account])

  return  (
    <BNBBingoContext.Provider value={{
      web3,
      account,
      isConnected,
      connectType,
      fullscreen,
      disconnectWallet,
      connectWallet,
      updateConnect,
      setFullScreenMode,
    }}>
      {children}
    </BNBBingoContext.Provider>
  )
}
