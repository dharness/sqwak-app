import React, {Component} from 'react'
import { Link } from 'react-router'
import giantBird from './../../assets/images/giant-bird.svg'
import sqwakWord from './../../assets/images/sqwak-word.svg'


class LandingPage extends Component {
    render () {
        return (
            <div className="sq-landing">
                <div className="sq-landing--above-fold">
                    <div className="sq-landing--nav">
                        <Link to="/login" className="sq-landing--login-link">
                            Login
                        </Link>
                        <Link to="/signup" className="sq-landing--login-link">
                            Signup
                        </Link>
                    </div>
                    <div className="sq-landing--hero">
                        <img src={giantBird} role="presentation" />
                        <div>
                            <img src={sqwakWord} role="presentation"/>
                            <p>Teach your apps to listen with your personal machine learning dashboard</p>
                            <a href="#" className="sq-button--squishy sq-button--squishy_red">
                                <span>Try it free!</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>From the team that brought you The Mars Rover</h5>
                </div>
                <div className="sq-landing--footer">
                    <p>🇨🇦 made with Canadian maple syrup</p>
                </div>
            </div>
        )
    }
}

export default LandingPage