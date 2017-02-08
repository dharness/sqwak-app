import React, {Component} from 'react'

class PlushButton extends Component {

    handleClick() {
        if(this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }

    render () {
        let buttonColorClass = this.props.colorClass ? this.props.colorClass : "sq-button__green"
        return (
            <button onClick={this.handleClick.bind(this)}
                disabled={this.props.disabled}
                className={`sq-button ${buttonColorClass} sq-text__white`}>
                {this.props.buttonText}
            </button>
        )
    }
}

export default PlushButton