import React from 'react'
import { Link } from 'react-router'


const Nav = (props) => {
    return (
        <div className="sq-inner-nav">
            <Link to={`/user/${props.currentUserId}/apps`} className="sq-inner-nav--menu-item">apps</Link>
            <Link to="/" className="sq-inner-nav--menu-item">signout</Link>
        </div>
    )
}

export default Nav