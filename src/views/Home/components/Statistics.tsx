import React, { useEffect, useState } from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { Typography, Button } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useLottery } from 'hooks/useContract'
import Web3 from 'web3'

const Statistics: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()
  const { account } = useArcadeContext();
  const lottery = useLottery(account ?? '');
  const [currentRound, setCurrentRound] = useState<number|undefined>();
  const [lastRound, setLastRound] = useState<number|undefined>();
  const [totalPrize, setTotalPrize] = useState<string>('');
  const [finalNumber, setFinalNumber] = useState([]);
	const [divisionRate, setDivisionRate] = useState([]);

  const getCurrentRound = () => {
    lottery.methods.currentLotteryId().call()
    .then((res: string) => {
        const round = parseInt(res);
        setLastRound(round);
        setCurrentRound(round > 1 ? round - 1 : undefined);
    })
    .catch((ex: any) => {
        console.log(ex);
    })
  }


  useEffect(() => {
    if (!currentRound) return;
    lottery.methods.lotteries(currentRound).call()
    .then((res: any) => {
			setTotalPrize(Web3.utils.fromWei(res.totalPrize + '', 'ether'))
    })
    .catch((ex: any) => {
        console.log(ex);
    })

		lottery.methods.getLotteryFinalNumber(currentRound).call()
    .then((res: any) => {
			setFinalNumber(res);
    })
    .catch((ex: any) => {
        console.log(ex);
    })

		lottery.methods.getLotteryPrizeDivision(currentRound).call()
    .then((res: any) => {
			setDivisionRate(res);
    })
    .catch((ex: any) => {
        console.log(ex);
    })

  }, [currentRound])

  useEffect(() => {
    if (!account) return;

    getCurrentRound();
  }, [account])

  const onNext = () => {
    if (!currentRound || !lastRound) return;
    if (currentRound < lastRound - 1) {
        setCurrentRound(currentRound + 1);
    }
  }

  const onPrev = () => {
    if (!currentRound) return;
    if (currentRound > 1) {
        setCurrentRound(currentRound - 1);
    }
  }

  const onFirst = () => {
      if (!lastRound) return;
      setCurrentRound(1);
  }

  const onLast = () => {
      if (!lastRound || lastRound <= 1) return;
      setCurrentRound(lastRound - 1);
  }

  return (
    <div className="global-rates" id="about">
        <div className="dots">
            <img src="./media/dot-1.png" alt="" className="dot-1" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="vertical" style={{transform: "unset", transition: "transform 0.1s ease 0s", willChange: "transform"}}/>
            <img src="./media/dot-2.png" alt="" className="dot-2" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="vertical" style={{transform: "unset", transition: "transform 0.1s ease 0s", willChange: "transform"}}/>
            <img src="./media/dot-3.png" alt="" className="dot-3" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="horizontal" style={{transform: "unset", transition: "transform 0.1s ease 0s", willChange: "transform"}}/>
        </div>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-xl-5 d-none d-xl-block">
                    <div className="section-thumb wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                        <img src="./media/global-rate.png" alt="" className="global-img"/>
                    </div>
                </div>
                <div className="col-xl-7 wow fadeInUp " data-wow-duration="0.5s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.5s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                    <div className="ml-auto mr-auto lot-card" style={{width: 'fit-content'}}>
                        <div className="section-head">
                            <h2 className="title">Finished Rounds</h2>
                            <p className="text">
                                Check finished round numbers and prizes
                            </p>
                        </div>
                        <div className="section-rounds">
                            <div className='row round-row'>
                                <p>Round - </p>
                                <input type="text" value={currentRound} onChange={(e)=>setCurrentRound(parseInt(e.target.value))}/>
                            </div>

                            <div className='row round-row'>
                                <p>Winning Number - </p>
                                <p className="winning-number">
                                    {finalNumber.map((value) => {
                                        return `${value} `;
                                    })}
                                </p>
                            </div>

                            <div className='row round-row'>
                                <p>Prize - </p>
                                <p className="winning-number"> {totalPrize} BNB</p>
                            </div>

														<div className='row round-row'>
															<p>Match One: {parseFloat(totalPrize) * divisionRate[0] / 100} BNB</p>
															<p>Match Two: {parseFloat(totalPrize) * divisionRate[1] / 100} BNB</p>
														</div>
														<div className='row round-row'>
															<p>Match Three: {parseFloat(totalPrize) * divisionRate[2] / 100} BNB</p>
															<p>Match Four: {parseFloat(totalPrize) * divisionRate[3] / 100} BNB</p>
														</div>
														<div className='row round-row bingo'>
															<p>Match Five: {parseFloat(totalPrize) * divisionRate[4] / 100} BNB</p>
															<p className='big-bingo'>Match Bingo!: {parseFloat(totalPrize) * divisionRate[5] / 100} BNB</p>
														</div>
                        </div>
                        <div className="section-pagination">
                            <a onClick={onFirst} className="ml-auto">&lt;&lt;</a>
                            <a onClick={onPrev} >&lt;</a>
                            <a onClick={onNext} >&gt;</a>
                            <a onClick={onLast} className="mr-auto">&gt;&gt;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Statistics
