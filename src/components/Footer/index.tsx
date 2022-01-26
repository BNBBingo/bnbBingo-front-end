import React, { memo } from 'react'
import { ReactComponent as Logo } from 'assets/img/logo.svg'


const Footer = () => {

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
