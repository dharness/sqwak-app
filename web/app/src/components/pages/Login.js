import React, {Component} from 'react';
import AuthService from './../../services/AuthService';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.authService = new AuthService('l4pxejOXhTOV32BHrZxASIHHuNq4urwh', 'kingofthestack.auth0.com');
    }

    componentDidMount() {
        this.authService.login();
    }

    render () {
        return (
            <div>
                Login:
            </div>
        )
    }
}

export default LoginPage