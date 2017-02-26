import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PlushButton from './../shared/PlushButton';
import AuthService from './../../services/AuthService';
import { loginUser, signupUser } from './../../actions/user';
import inputMailIcon from './../../assets/images/icons/input-mail.svg'
import inputLockIcon from './../../assets/images/icons/input-lock.svg'
import tealDiamondIcon from './../../assets/images/class-icons/teal-diamond.svg'
import greenCubeIcon from './../../assets/images/class-icons/green-cube.svg'

class LoginPage extends Component {

    static propTypes = {
        action: PropTypes.string,
        auth: PropTypes.instanceOf(AuthService)
    }
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    submitLogin() {
        let {email, password} = this.state;
        if (this.props.isLogin) {
            this.props.loginUser({email, password});
        } else {
            this.props.signupUser({email, password});
        }
    }

    onInputChange(event, key) {
        const nextState = {};
        nextState[key] = event.target.value;
        this.setState(nextState);
    }

    go(route) {   
        browserHistory.push(route);
    }

    render () {
        let isLogin = this.props.path === "/login" ? true : false;
        return (
        <div className="sq-login-page">
            <div className="sq-full-page-modal--header">
                <div className="sq-full-page-modal--cancel-button" onClick={()=>{this.go('/')}}/>
            </div>
            <div className="sq-login-page--content">
                <div className="sq-login-page-top-icon-wrapper">
                    <img src={isLogin ? tealDiamondIcon : greenCubeIcon} role="presentation" className="sq-login-top-icon"/>
                    <div className="sq-login-top-icon-shadow"> </div>
                </div>

                <div className="sq-text__xl">{this.props.action}</div>
                <div className="sq-text__pale">{isLogin ? "Welcome back!" : "Welcome to Sqwak!"}</div>
                    <div className="sq-input-wrapper">
                        <img src={inputMailIcon} role="presentation" className="sq-login-icon"/>
                        <input 
                            type="email"
                            value={this.state.email}
                            onChange={(e)=>{ this.onInputChange(e, 'email'); }}
                            className="sq-basic-input email"
                            placeholder="Email Address"/>
                    </div>

                    <div className="sq-input-wrapper">
                        <img src={inputLockIcon} role="presentation" className="sq-login-icon"/>
                        <input 
                            type="password"
                            value={this.state.password}
                            onChange={(e)=>{ this.onInputChange(e, 'password'); }}
                            className="sq-basic-input password"
                            placeholder="Password"/>
                    </div>

                <div className="sq-login-page--footer">
                    <PlushButton
                        isLoading={this.props.isLoginPending}
                        buttonText={this.props.action} 
                        onClick={this.submitLogin.bind(this)}
                        className="sq-login-button"
                        colorClass={isLogin ? "sq-button__blue" : ""}
                    />
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const isLoginPending = state.statuses.isLoginPending;
    return {
        isLoginPending
    };
}

export default connect(
    mapStateToProps,
    { loginUser, signupUser }
)(LoginPage)