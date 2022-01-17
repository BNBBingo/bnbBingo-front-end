import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import BigNumber from "bignumber.js"
import { SwapState } from "global/interface"
import * as Wallet from 'global/wallet'
import BEP20PRICE_ABI from 'contracts/BEP20Price.json'
import Web3 from "web3"
import { AbiItem } from "web3-utils"


const initialState: SwapState = {
  arcadeDogeRate: '',
  gamePointRate: ''
}


export const fetchArcadeDogeRate = createAsyncThunk<string>(
  'swap/fetchArcadeDogeRate',
  async () => {
    const provider = await Wallet.getCurrentProvider()
    const web3 = new Web3(provider)
    const bep20Price = new web3.eth.Contract(
      BEP20PRICE_ABI as AbiItem[],
      process.env.REACT_APP_ARCADE
    )
  
    const result = await bep20Price.methods.getTokenPrice(
      process.env.REACT_APP_ARCADEDOGE_ADDRESS, 18
    ).call()
    const price = new BigNumber(result).div(10 ** 18)
    return price.toString()
  }
)

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(
      fetchArcadeDogeRate.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.arcadeDogeRate = action.payload
      }
    )
  }
})


export default swapSlice.reducer