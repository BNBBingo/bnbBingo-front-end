import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { Typography, Button } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'

const Banner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
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
                        <form action="#">
                            <div className="form-group row">
                                <input type="text" className="form-control lottery-input" />
                                <input type="text" className="form-control lottery-input" />
                                <input type="text" className="form-control lottery-input" />
                                <input type="text" className="form-control lottery-input" />
                                <input type="text" className="form-control lottery-input" />
                                <input type="text" className="form-control lottery-input" />
                                <button className="button-1">Buy Now!</button>
                            </div>
                        </form>
                        <div className="lottery-prize">
                            $ 203,290 on prizes
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner
