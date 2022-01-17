import BigNumber from "bignumber.js";
import { useEffect, useState } from "react"
import { useArcadeContext } from "./useArcadeContext";

export const usePointBalance = (): BigNumber | undefined => {
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);
  const { account } = useArcadeContext();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const requestUrl = '/balance';
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: account
          }),
        }

        const res: any = await fetch(
          process.env.REACT_APP_GAME_API_NODE + requestUrl,
          requestOptions
        )
        setBalance(new BigNumber(res.data.balance))

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