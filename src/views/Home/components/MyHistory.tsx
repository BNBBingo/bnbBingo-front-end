import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { Typography, Button } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'

const MyHistory: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
  }

  return (
    <div className="feature two">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-6">
                    <div className="section-head wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"
                    }}>
                        <div className="section-head">
                        <h2 className="title">My Tickets</h2>
                        <p className="text">
                            Check your tickets and rewards
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
                                <p>My Tickets</p>
                            </div>
                            <div className='row round-row'>
                                <p>1 3 6 14 20 30 </p>
                                <p className="winning-number"> = 5 BNB</p>
                            </div>
                            <div className='row round-row'>
                                <p>1 3 6 14 20 30 </p>
                                <p className="winning-number"> = 5 BNB</p>
                            </div>
                            <div className='row round-row'>
                                <p>1 3 6 14 20 30 </p>
                                <p className="winning-number"> = 5 BNB</p>
                            </div>
                            <div className='row round-row'>
                                <p>1 3 6 14 20 30 </p>
                                <p className="winning-number"> = 5 BNB</p>
                            </div>
                            <div className='row round-row'>
                                <p>1 3 6 14 20 30 </p>
                                <p className="winning-number"> = 5 BNB</p>
                            </div>

                            <div className='row round-row pagination'>
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <p>...</p>
                                <a href="#">10</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 d-none d-xl-block">
                    <div className="pic">
                        <img src="./media/feature-2.png" alt="" className="fimg-1"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyHistory