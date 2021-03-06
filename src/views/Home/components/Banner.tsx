import React, { useEffect, useState } from 'react'

import { Typography, Button } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'
import * as Wallet from 'global/wallet'
import Swal from 'sweetalert2'
import { useBNBBingoContext } from 'hooks/useBNBBingoContext'
import { useLottery } from 'hooks/useContract'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { setIsLoading, setRefreshInterface } from 'state/show'
import numeral from 'numeral'

const Banner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()
  const { account, web3 } = useBNBBingoContext();
  const lottery = useLottery(account ?? '');
  const [currentPrize, setCurrentPrize] = useState<BigNumber>();
  const [duration, setDuration] = useState(0);


  const [t1, setT1] = useState<number | undefined>();
  const [t2, setT2] = useState<number | undefined>();
  const [t3, setT3] = useState<number | undefined>();
  const [t4, setT4] = useState<number | undefined>();
  const [t5, setT5] = useState<number | undefined>();
  const [t6, setT6] = useState<number | undefined>();

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
  }

  const onBuyTicket = () => {
    if (!t1 || !t2 || !t3 || !t4 || !t5 || !t6 ) {
        Swal.fire("Please input valid numbers"); 
        return;
    }

    const numbers = new Array(t1, t2, t3, t4, t5, t6);
    let i, j;
    for (i = 0 ; i < 5; i ++) {
        for (j = i + 1; j < 6; j ++) {
            if (numbers[i] === numbers[j])
                break;
        }
        if (j !== 6) break;
    }
    if (i !== 5) {
        Swal.fire("Cannot input the same number!");
        return;
    }

    if (t1 > 32 || t2 > 32 || t3 > 32 || t4 > 32 || t5 > 32 || t6 > 32) {
        Swal.fire("Please input the number in the range!");
        return;
    }

    if (!account) {
        onConnectWalletHandler();
        return;
    }

    dispatch(setIsLoading(true));
    lottery.methods.buyTicket(numbers).estimateGas({
        from: account,
        value: Web3.utils.toWei(process.env.REACT_APP_LOTTERY_PRICE + '', 'ether')
    })
    .then((gasAmount: any) => {
        lottery.methods.buyTicket(numbers).send({
            from: account,
            value: Web3.utils.toWei(process.env.REACT_APP_LOTTERY_PRICE + '', 'ether'),
            gas: gasAmount
        })
        .on('transactionHash', function(hash: any){
            console.log(hash);
            const getTransaction = () => {
                web3.eth.getTransaction(hash)
                .then((res: any) => {
                    if (res.blockNumber !== undefined) {
                        dispatch(setIsLoading(false));
                        Swal.fire("Successfuly bought new ticket!");
                    } else {
                        setTimeout(getTransaction, 1000);
                    }
                })
                
            }

            getTransaction();
        })
        .on('error', function(error: any, receipt: any) { 
            dispatch(setIsLoading(false));
            Swal.fire("New ticket purchase failed!");
            console.log(error);
        });
    })
  }

  const getCurrentPrize = () => {
    lottery.methods.currentPrize().call()
    .then((res: string) => {
        setCurrentPrize(new BigNumber(res).div(10 ** 18))
        setTimeout(getCurrentPrize, 5000);
    })
    .catch((ex: any) => {
        console.log(ex);
    })
  }

  useEffect(() => {
    if (!account) return;
    getCurrentPrize();
  }, [account])


  const getDuration = (duration: number) => {
      let ret = '';
      if (duration >= 3600) {
        ret = `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;
      } else {
        ret = `${Math.floor(duration / 60)}m ${duration % 60}s`;
      }

      return ret;
  }

  useEffect(() => {
    setInterval(intervalDuration, 1000);
  }, []);

  const intervalDuration = () => {
    if (43200 - (Date.now() / 1000) % 43200 <= 0) {
        dispatch(setRefreshInterface(true));
    }
    setDuration(43200 - (Date.now() / 1000) % 43200);
  }

  return (
    <div className="banner" id="home" style={{backgroundImage: "url(media/banner-bg.png)"}}>
        <img className="bg-sape" src="media/banner-bg-2.png" alt="" />
        <div className="hero-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-7 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{ visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp" }}>
                        <div className="banner-content">
                            <h3 className="subtitle">BNBBingo Make It Easy</h3>
                            <h1 className="head">A Better Way To Do Money</h1>
                        </div>
                        <div className="form-group row">
                            <input type="number" min="1" max="32" className="form-control lottery-input" value={t1} onChange={(e)=>setT1(parseInt(e.target.value))}/>
                            <input type="number" min="1" max="32" className="form-control lottery-input" value={t2} onChange={(e)=>setT2(parseInt(e.target.value))}/>
                            <input type="number" min="1" max="32" className="form-control lottery-input" value={t3} onChange={(e)=>setT3(parseInt(e.target.value))}/>
                            <input type="number" min="1" max="32" className="form-control lottery-input" value={t4} onChange={(e)=>setT4(parseInt(e.target.value))}/>
                            <input type="number" min="1" max="32" className="form-control lottery-input" value={t5} onChange={(e)=>setT5(parseInt(e.target.value))}/>
                            <input type="number" min="1" max="32" className="form-control lottery-input" value={t6} onChange={(e)=>setT6(parseInt(e.target.value))}/>
                            <button className="button-1" onClick={onBuyTicket}>Buy Now<br/>({getDuration(duration)}) </button>
                        </div>
                        <div className="lottery-prize">
                            {numeral(currentPrize).format('0,0.0[000]')} BNB on prizes
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner
