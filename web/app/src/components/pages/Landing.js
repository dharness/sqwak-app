import React, {Component} from 'react'
import { Link } from 'react-router'
import giantBird from './../../assets/images/giant-bird.svg'
import sqwakWord from './../../assets/images/sqwak-word.svg'


class LandingPage extends Component {
    render () {
        return (
            <div className="sq-landing">
                <div className="sq-landing--nav">
                    <div className="sq-landing--login-link">Login</div>
                    <a href="#" className="sq-button--squishy">
                        <span>Signup</span>
                    </a>
                </div>
                Welcome to sqwak
                <br/>
                <Link to="/login">
                    <button> Login </button>
                </Link>
                <div className="sq-landing--hero">
                    <img src={giantBird} role="presentation" />
                    <img src={sqwakWord} role="presentation" />
                </div>
            </div>
        )
    }
}

export default LandingPage