import React, {Component} from 'react'

class PlushButton extends Component {

    handleClick() {
        if(this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }

    render () {
        return (
            <button onClick={this.handleClick.bind(this)}
                disabled={this.props.disabled}
                className="sq-button sq-button__green sq-text__white">
                {this.props.buttonText}
            </button>
        )
    }
}

export default PlushButton