import ERC20_ABI from 'contracts/ERC20.json'
import * as Wallet from 'global/wallet'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import { Contract} from 'web3-eth-contract'

export const getArcadeTokenContract = async (): Promise<Contract> => {
  const provider = await Wallet.getCurrentProvider()
  const web3 = new Web3(provider)

  return new web3.eth.Contract(
    ERC20_ABI as AbiItem[],
    process.env.REACT_APP_ARCADEDOGE_ADDRESS
  )
}