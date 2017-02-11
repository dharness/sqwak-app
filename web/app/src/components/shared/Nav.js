import React, {Component} from 'react'
import { Link } from 'react-router'


class Nav extends Component {

    render () {
        return (
            <div className="sq-inner-nav">
                <Link to={`/user/${this.props.currentUserId}/apps`} className="sq-inner-nav--menu-item">apps</Link>
                <Link to="/" className="sq-inner-nav--menu-item">signout</Link>
            </div>
        )
    }
}

export default Nav