import React, {Component} from 'react'
import { Link } from 'react-router'
import giantBird from './../../assets/images/giant-bird.svg'
import sqwakWord from './../../assets/images/sqwak-word.svg'


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
                        <img src={giantBird} role="presentation"/>
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

                <div className="sq-landing--body">
                    <div className="sq-landing--ruffles"></div>
                    <div className="sq-text sq-text__xl">Audio clasification has never been easier!</div>
                    <div className="sq-text sq-text__lg">The latest from the team that brought you the mars rover.</div>
                </div>

                <div className="sq-landing--footer">
                    <p>🇨🇦 made with Canadian maple syrup</p>
                </div>
            </div>
        )
    }
}

export default LandingPage