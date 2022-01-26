import { useEffect, useMemo, useState } from 'react'
import ERC20_ABI from 'contracts/ERC20.json'
import EXCHANGE_ABI from 'contracts/EXCHANGE.json'
import ERC721_ABI from 'contracts/ERC721.json'
import SWAP_ABI from 'contracts/SWAP.json'
import BEP20PRICE_ABI from 'contracts/BEP20Price.json'
import LOTTERY_ABI from 'contracts/Lottery.json'
import { AbiItem } from 'web3-utils'
import { useArcadeContext } from './useArcadeContext'

export const useArcadeDoge = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(ERC20_ABI as AbiItem[], process.env.REACT_APP_ARCADEDOGE_ADDRESS)
  }, [web3])
}

export const useBUSD = () => {
  const { web3 } = useArcadeContext()
  return useMemo(() => {
    return new web3.eth.Contract(ERC20_ABI as AbiItem[], process.env.REACT_APP_BUSD_ADDRESS)
  }, [web3])
}

export const useExchange = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(EXCHANGE_ABI as AbiItem[], process.env.REACT_APP_EXCHANGE_ADDRESS)
  }, [web3])
}

export const useNFT = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(ERC721_ABI as AbiItem[], process.env.REACT_APP_NFT_ADDRESS)
  }, [web3])
}

export const useSwap = (address: string) => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(SWAP_ABI as AbiItem[], process.env.REACT_APP_SWAP_ADDRESS, { from: address })
  }, [web3, address])
}

export const useBep20Price = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(BEP20PRICE_ABI as AbiItem[], process.env.REACT_APP_BEP20PRICE_ADDRESS)
  }, [web3])
}

export const useMarsDoge = (address: string) => {
  const swapContract = useSwap(address)
  const { web3, account } = useArcadeContext() 
  const [gcToken, setGcToken] = useState(undefined)
  const [gcPerArc, setGcPerArc] = useState(undefined)

  useEffect(() => {
    const fetch = async () => {
      if (!swapContract) return;
      if (!account) return;
      const gameInfo = await swapContract.methods.gameInfo(1).call()
      const { gcToken, gcPerArc } = gameInfo
      setGcToken(gcToken)
      setGcPerArc(gcPerArc)
    }

    if (swapContract) {
      fetch();
    }

  }, [swapContract, web3])
  
  return { gcToken, gcPerArc }
}

export const useGameUserInfo = (address: string | undefined) => {
  const swapContract = useSwap(address ?? '')
  const [weightedAverage, setWeightedAverage] = useState(undefined)

  useEffect(() => {
    const fetch = async () => {
      const userInfo = await swapContract.methods.userInfo(1, address).call()
      const { weightedAverage } = userInfo
      setWeightedAverage(weightedAverage)
    }

    if (swapContract && address) {
      fetch();
    }
  }, [swapContract, address])

  return { weightedAverage }
}

export const useLottery = (address: string) => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    if (address)
      return new web3.eth.Contract(LOTTERY_ABI as AbiItem[], process.env.REACT_APP_LOTTERY_ADDRESS, { from: address })
    else
      return new web3.eth.Contract(LOTTERY_ABI as AbiItem[], process.env.REACT_APP_LOTTERY_ADDRESS)
  }, [web3, address])
}