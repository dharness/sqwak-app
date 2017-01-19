import React, {Component} from 'react'
import { Link } from 'react-router'

class LandingPage extends Component {
    render () {
        return (
            <div style={{textAlign: "center"}}>
                Welcome to sqwak
                <br/>
                <Link to="/login">
                    <button> Login </button>
                </Link>
            </div>
        )
    }
}

export default LandingPage