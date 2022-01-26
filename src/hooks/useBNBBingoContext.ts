import { useContext } from 'react'
import { BNBBingoContext, BNBBingoContextValue } from 'contexts/BNBBingoContext'

export const useBNBBingoContext = () => {
  const context = useContext(BNBBingoContext) as BNBBingoContextValue
  if (!context) {
    throw new Error(
      'Make sure to only call useBNBBingoContext within a  <BNBBingoProvider>'
    )
  }
  return context
}