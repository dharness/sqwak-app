import React, {Component} from 'react'
import logoImg from './../../assets/images/logo.svg'

class LoadingScreen extends Component {
      
    render () {
        return (
            <div className={"sq-loading"}>
                <div className="sq-loading-effect">
                    <div className="sq-loading-spinner"></div>
                    <div className="sq-loading-circle"></div>
  
                    <img className="sq-loading-logo" src={logoImg} role="presentation"/>
                </div>
            </div>
        )
    }
}

export default LoadingScreen