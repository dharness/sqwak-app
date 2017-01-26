import React, {Component} from 'react'

class PlushButton extends Component {

    handleClick() {
        if(this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }

    render () {
        return (
            <a onClick={this.handleClick.bind(this)} className={"sq-button--squishy sq-button--squishy_green" + (this.props.disabled ? " disabled" : "")}>
                <span>{this.props.buttonText}</span>
            </a>
        )
    }
}

export default PlushButton