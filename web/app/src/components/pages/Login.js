import React, {Component, PropTypes} from 'react';
import PlushButton from './../shared/PlushButton';
import AuthService from './../../services/AuthService';

class LoginPage extends Component {

    static propTypes = {
        action: PropTypes.string,
        auth: PropTypes.instanceOf(AuthService)
    }

    componentDidMount() {
        // this.props.auth.login();
    }

    render () {
        return (
        <div className="sq-login-page">
            <div className="sq-login-page--content">
                <h1>{this.props.action}</h1>
                <input 
                    type="email"
                    className="sq-basic-input"
                    placeholder="email"/>
                <input 
                    type="password"
                    className="sq-basic-input"
                    placeholder="password"/>
                <div className="sq-login-page--footer">
                    <PlushButton buttonText={this.props.action}/>
                </div>
            </div>
        </div>)
    }
}

export default LoginPage