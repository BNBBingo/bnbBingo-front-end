import React, { memo, useCallback } from 'react'
import { AppBar, Hidden } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FooterContact from './FooterContact'
import FooterRoadmap from './FooterRoadmap'
import FooterFollowUs from './FooterFollowUs'
import TermOfUse from 'components/Modal/TermOfUse'
import PrivacyPolicy from 'components/Modal/PrivacyPolicy'
import PointSwap from 'components/Modal/PointSwap'
import { useCommonStyles } from '../../styles/use-styles'
import SelectWalletModal from 'components/Modal/SelectWallet'
import { useShow } from 'state/show/hook'
import { setTermOfUse, setPrivacyPolicy, setPointSwap } from 'state/show'
import { useAppDispatch } from '../../state'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { ReactComponent as Logo } from 'assets/img/logo.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    background: `${theme.palette.text.primary}`,
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

const Footer = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  const dispatch = useAppDispatch()
  const { connectType, fullscreen } = useArcadeContext()
  const { termOfUse, privacyPolicy, pointSwap, walletMenu } = useShow()

  const handleClose = useCallback(() => {
    dispatch(setTermOfUse(false))
  }, [dispatch])

  const handleClosePrivacy = useCallback(() => {
    dispatch(setPrivacyPolicy(false))
  }, [dispatch])

  const handleClosePointSwap = useCallback(() => {
    dispatch(setPointSwap(false))
  }, [dispatch])

    return (
      <div className="footer" style={{backgroundImage: "url(media/footer-bg.png)"}}>
        <div className="container">


            <div className="col-12">
                <div className="subscribe-content" style={{ backgroundImage: "url(media/subscribe-bg.png)" }}>
                    <div className="content wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                        <h3 className="title">Get latest crypto news</h3>
                        <p className="text">Subscribe to our newsletter for regular updates.</p>
                    </div>
                    <div className="input-box wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                        <form action="#">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Your Email" className="form-control"/ >
                                        <button className="button-1">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                    <div className="footer-box">
                        <Logo width={200} height={80}/>
                        <p className="text">Safe, secure, &amp; innovative crypto currency borrow &amp;
                            lending solutions.</p>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="0.4s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.4s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                            <div className="footer-box">
                                <h4 className="lasthead">Company</h4>
                                <ul className="footer-link">
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Blog</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.5s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                            <div className="footer-box">
                                <h4 className="lasthead">Support</h4>
                                <ul className="footer-link">
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Knowledge Base</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.6s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                            <div className="footer-box">
                                <h4 className="lasthead">Policy</h4>
                                <ul className="footer-link">
                                    <li><a href="#">Terms of use</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Refund Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="0.7s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.7s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                            <div className="footer-box">
                                <h4 className="lasthead">Contacts</h4>
                                <ul className="footer-link">
                                    <li> support@gooland </li>
                                    <li> +372 624 6211 </li>
                                    <li> +372 624 600 </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <div className="footer-bottom">
                        <div className="content wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                            <p className="text">Copyright © 2021. All Rights Reserved By <a href="#">BNBBingo</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(Footer)
