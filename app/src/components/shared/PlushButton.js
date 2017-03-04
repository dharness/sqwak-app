import React, {Component} from 'react'

class PlushButton extends Component {

    constructor() {
        super();
        this.state = {
            isDelaying: false
        };
    }

    handleClick() {
        if(this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading === true && this.props.isLoading === false) {
            this.setState({isDelaying: true})
            setTimeout(()=>{
                this.setState({isDelaying: false});
            }, 300)
        }
    }

    render () {
        let buttonColorClass = this.props.colorClass ? this.props.colorClass : "sq-button__green"
        let isLoading = this.state.isDelaying || this.props.isLoading;
        let loadingText = this.props.loadingText || "Loading..."
        return (
            <button onClick={this.handleClick.bind(this)}
                disabled={this.props.disabled || isLoading}
                className={`sq-button ${buttonColorClass} sq-text__lg sq-text__white` + (isLoading ? " loading" : "")}>
                <div className="sq-button--spinner">{loadingText}</div>
                {isLoading ? "" : this.props.buttonText}
            </button>
        )
    }
}

export default PlushButton