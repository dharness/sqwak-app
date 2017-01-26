import React, {Component} from 'react'

class PlushButton extends Component {
    render () {
        return (
            <a onClick={this.props.onClick} className="sq-button--squishy sq-button--squishy_green">
                <span>{this.props.buttonText}</span>
            </a>
        )
    }
}

export default PlushButton