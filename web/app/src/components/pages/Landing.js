import React, {Component} from 'react'
import { Link } from 'react-router'
import giantBird from './../../assets/images/giant-bird.svg'
import sqwakWord from './../../assets/images/sqwak-word.svg'
import googleImg from './../../assets/images/google.svg'
import facebookImg from './../../assets/images/facebook.svg'
import microsoftImg from './../../assets/images/microsoft.svg'
import amazonImg from './../../assets/images/amazon.svg'
import kotsLogo from './../../assets/images/kots-logo.svg'
import emailIcon from './../../assets/images/mail.svg'
import fbIcon from './../../assets/images/fblittle.svg'
import LandingPreviewSlider from './../shared/LandingPreviewSlider';



class LandingPage extends Component {
    render () {
        return (
            <div className="sq-landing">

                {/* HEADING */}
                <div className="sq-landing--above-fold">
                    <div className="sq-landing--nav">
                        <Link to="/login" className="sq-landing--login-link">
                            Login
                        </Link>
                        <Link to="/signup" className="sq-landing--signup-link">
                            Signup
                        </Link>
                    </div>
                    <div className="sq-landing--hero">
                        <div className="sq-landing--hero-bird">
                            <img src={giantBird} role="presentation"/>
                        </div>
                        <div className="sq-landing--hero-info">
                            <img src={sqwakWord} role="presentation" className="sq-landing--title"/>
                            <p className="sq-landing--prompt">Teach your apps to listen with your personal machine learning dashboard</p>
                            <Link to="/signup" className="sq-landing--signup-link">
                                Try it free!
                            </Link>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="sq-landing--ruffles"></div>
                <div className="sq-landing--body">
                    <div className="sq-landing--body--main-header">
                        <div className="sq-text">Audio clasification has never been easier!</div>
                        <div className="sq-text">The latest from the team that brought you the mars rover.</div>
                    </div>
                    <div className="sq-landing--slider-wrapper">
                        <LandingPreviewSlider />
                    </div>
                    <div className="sq-landing--partners">
                        <div className="sq-landing--partners--header">
                            <div className="sq-text sq-text__xl">Partners and clients</div>
                            <div className="sq-text sq-text__lg">we wish we had...</div>
                        </div>
                        <div className="sq-landing--partner-list">
                            <div className="sq-landing--partner-list-content">
                                <img src={googleImg} alt=""/>
                                <img src={facebookImg} alt=""/>
                                <img src={microsoftImg} alt=""/>
                                <img src={amazonImg} alt=""/>
                            </div>
                        </div>
                        <div className="sq-landing--partners--footer">
                            <div className="sq-text sq-text__xl">Start using Sqwak today for free!</div>
                            <Link to="/signup" className="sq-landing--signup-link">
                                Create a Free Account
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="sq-landing--footer">
                    <div className="sq-landing--footer-content">
                        <div className="sq-landing--footer-sqwak">
                            <img src={sqwakWord} role="presentation"/>
                            <div className="sq-landing--footer-sqwak-description">Doing machine learning <br/> so you don't have to.</div>
                            <hr/>
                        </div>
                        <div className="sq-landing--footer-company">
                            <div className="sq-text sq-text__xl">Company</div>
                            <a href="https://kingofthestack.com/" className="sq-text">About</a>
                            <a href="https://kingofthestack.com/portfolio.html" className="sq-text">Portfolio</a>
                            <a href="https://kingofthestack.com/learn.html" className="sq-text">Teaching</a>
                        </div>
                        <div className="sq-landing--footer-contact">
                            <div className="sq-text sq-text__xl">Contact</div>
                            <div className="sq-landing--footer-address">
                                715 Bryant st. <br/>
                                Toronto, Ontario <br/>
                                N6G 3W7 <br/>
                            </div>
                            <div className="sq-landing--contact-icons">
                                <div className="sq-landing--contact-icon-wrapper">
                                    <img src={emailIcon} role="presentation" onClick={()=> {
                                        window.open('mailto:hello@kingofthestack.com')
                                    }}/>
                                </div>
                                <div className="sq-landing--contact-icon-wrapper">
                                    <img src={fbIcon} role="presentation" onClick={()=> {
                                        window.open('https://www.facebook.com/kingofthestack/')
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="sq-landing--footer-kots">
                            <img src={kotsLogo} role="presentation"/>
                            <div className="sq-text sq-text__lg">A King of the Stack product</div>
                            <a href="mailto:hello@kingofthestack.com">hello@kingofthestack.com</a>
                            <hr/>
                        </div>
                    </div>

                    <div className="sq-landing--footer-footer">
                        <p>
                            Copyright 2017 King of the Stack Inc.
                            <br/>
                            All rights reserved
                            <br/>
                            🇨🇦 made with Canadian maple syrup
                        </p>
                        <p> Privacy Policy & Terms of Service </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage