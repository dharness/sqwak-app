import React, {Component} from 'react'
import alertCancelIcon from './../../assets/images/icons/alert-cancel.svg'

class Warning1 extends Component {

    constructor(props) {
        super(props);
        
    }


    handleSelection(event, isConfirmed) {
        event.stopPropagation();
        if (isConfirmed) {return this.props.onConfirm();}
    }

    render () {
         return (
            <div className="sq-warning-panel--wrapper" style={{display: "block"}}>
                <div className="sq-warning-panel" style={{top: 0}}>
                    <div className="sq-warning-panel--header">
                        <img src={alertCancelIcon} role="presentation" className="sq-warning-panel--close-icon"/>
                    </div>
                    <div className="sq-warning-panel--message">
                        {this.props.warningMessage}
                    </div>
                    <div className="sq-warning-panel--footer" style={{display: (this.props.hasButtons ? "block" : "none")}}>
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

export default Warning1