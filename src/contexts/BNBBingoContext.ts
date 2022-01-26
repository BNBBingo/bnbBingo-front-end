import { createContext } from 'react'
import Web3 from 'web3'

export interface BNBBingoContextValue {
  web3: Web3,
  account: string | undefined,
  isConnected: boolean,
  connectType: number,
  fullscreen: boolean,
  disconnectWallet: () => void,
  connectWallet: (connectType: number) => void,
  updateConnect: () => void,
  setFullScreenMode: (isSet: boolean) => void,
}

export const BNBBingoContext = createContext<null | BNBBingoContextValue>(null)

