import React, {Component, PropTypes} from 'react';
import AuthService from './../../services/AuthService';

class LoginPage extends Component {

    static propTypes = {
        location: PropTypes.object,
        auth: PropTypes.instanceOf(AuthService)
    }

    componentDidMount() {
        this.props.auth.login();
    }

    render () {
        return (<div></div>)
    }
}

export default LoginPage