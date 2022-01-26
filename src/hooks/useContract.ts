import { useEffect, useMemo, useState } from 'react'
import LOTTERY_ABI from 'contracts/Lottery.json'
import { AbiItem } from 'web3-utils'
import { useBNBBingoContext } from './useBNBBingoContext'

export const useLottery = (address: string) => {
  const { web3 } = useBNBBingoContext() 
  return useMemo(() => {
    if (address)
      return new web3.eth.Contract(LOTTERY_ABI as AbiItem[], process.env.REACT_APP_LOTTERY_ADDRESS, { from: address })
    else
      return new web3.eth.Contract(LOTTERY_ABI as AbiItem[], process.env.REACT_APP_LOTTERY_ADDRESS)
  }, [web3, address])
}