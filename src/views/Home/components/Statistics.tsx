import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { Typography, Button } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'

const Statistics: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
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
                <div className="col-xl-6 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.5s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                    <div className="section-head">
                        <h2 className="title">Finished Rounds</h2>
                        <p className="text">
                            Check finished round numbers and prizes
                        </p>
                    </div>
                    <div className="section-rounds">
                        <div className='row round-row'>
                            <p>Round - </p>
                            <input type="text" />
                        </div>

                        <div className='row round-row'>
                            <p>Winning Number - </p>
                            <p className="winning-number">1 7 15 19 23 30</p>
                        </div>

                        <div className='row round-row'>
                            <p>Prize - </p>
                            <p className="winning-number"> 319 BNB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Statistics
