import BigNumber from "bignumber.js";
import { useEffect, useState } from "react"
import { getArcadeTokenContract } from "utils/contractHelper";
import { useArcadeContext } from "./useArcadeContext";

export const useTokenBalance = (tokenAddress: string): BigNumber | undefined => {
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);
  const { account } = useArcadeContext();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const contract = await getArcadeTokenContract();
        const res:string = await contract.methods.balanceOf(account).call();
        setBalance(new BigNumber(res));

      } catch (error) {
        setBalance(undefined);
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account]);

  return balance;
}

export const useArcadeBalance = () => {
  return useTokenBalance(process.env.REACT_APP_ARCADEDOGE_ADDRESS ?? '')
}