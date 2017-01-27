import React, {Component} from 'react'
import alertCancelIcon from './../../assets/images/icons/alert-cancel.svg'

class Warning extends Component {

    constructor(props) {
        super(props);
        this.state = {isShaking: false}
    }

    tryToAvoidIt() {
        this.setState({isShaking: true});
        setTimeout(() => {
            this.setState({isShaking: false});
            clearTimeout(this.shakeTimer);
        }, 820)
    }

    handleSelection(event, isConfirmed) {
        event.stopPropagation();
        if (isConfirmed) {return this.props.onConfirm();}
    }

    render () {
        return (
            <div className="sq-warning-panel--wrapper" onClick={this.tryToAvoidIt.bind(this)} style={{
                    display: (this.props.isOpen ? "block" : "none")
                }}>
                <div className={"sq-warning-panel" + (this.state.isShaking ? " shake" : "")} onClick={event => event.stopPropagation()} style={{
                    top: (this.props.isOpen ? 0 : "-100%")
                }}>
                    <div className="sq-warning-panel--header">
                        <img src={alertCancelIcon} role="presentation" className="sq-warning-panel--close-icon"/>
                    </div>
                    <div className="sq-warning-panel--message">
                        Are you sure you want to delete app 1?
                    </div>
                    <div className="sq-warning-panel--footer">
                        <div className="sq-warning-panel--button-bar">
                            <button onClick={(e)=> {this.handleSelection(e, false);}}>No</button>
                            <button onClick={(e)=> {this.handleSelection(e, true);}}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Warning