import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import PlushButton from './../shared/PlushButton';
import AuthService from './../../services/AuthService';
import { loginUser } from './../../actions/user';

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
        this.props.loginUser({email, password});
    }

    onInputChange(event, key) {
        const nextState = {};
        nextState[key] = event.target.value;
        this.setState(nextState);
    }

    render () {
        return (
        <div className="sq-login-page">
            <div className="sq-login-page--content">
                <h1>{this.props.action}</h1>
                <input 
                    type="email"
                    value={this.state.email}
                    onChange={(e)=>{ this.onInputChange(e, 'email'); }}
                    className="sq-basic-input"
                    placeholder="email"/>
                <input 
                    type="password"
                    value={this.state.password}
                    onChange={(e)=>{ this.onInputChange(e, 'password'); }}
                    className="sq-basic-input"
                    placeholder="password"/>
                <div className="sq-login-page--footer">
                    <PlushButton
                        isLoading={true}
                        buttonText={(this.props.isLoginPending ? "..." : this.props.action)} 
                        onClick={this.submitLogin.bind(this)}
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
    { loginUser }
)(LoginPage)