import React from 'react'
import { Link } from 'react-router'
import logoImg from './../../assets/images/logo.svg'


const Nav = (props) => {
    return (
        <div className="sq-inner-nav">
            <div className="sq-inner-nav--logo">
                <img src={logoImg} role="presentation"/>
            </div>
            <div className="sq-inner-nav--left">
                <Link to={`/user/${props.currentUserId}/apps`} className="sq-inner-nav--left-menu-item">Apps</Link>
                <Link to="/" className="sq-inner-nav--left-menu-item">Sign Out</Link>
            </div>
        </div>
    )
}

export default Nav