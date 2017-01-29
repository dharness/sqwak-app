import React, {Component} from 'react'
import deleteIcon from './../../assets/images/icons/cancel.svg'


class FullPageModal extends Component {
    
    render () {
        let style = {
            opacity: (this.props.isOpen ? '1' : '0'), 
            zIndex: (this.props.isOpen ? '101' : '-101')
        };
        return (
            <div className="sq-full-page-modal" style={style} ref={(el)=>{this.domNode = el;}}>
                <div className="sq-full-page-modal--header">
                    <img role="presentation" src={deleteIcon} className="sq-full-page-modal--cancel-button" onClick={this.props.onCloseEvent}/>
                </div>
                {this.props.component}
            </div>
        )
    }
}

export default FullPageModal