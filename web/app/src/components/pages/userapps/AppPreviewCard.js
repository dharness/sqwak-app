import React, {Component} from 'react'
import deleteIcon from './../../../assets/images/icons/delete.svg'

class AppPreviewCard extends Component {
    render () {
        return (
            <div className="sq-app-preview-card">
                <div className="sq-app-preview-card--header">
                    <div className="sq-app-preview-card--status">
                        <div className="sq-app-preview-card--status-indicator unpublished"></div>
                        unpublished
                    </div>
                    <img src={deleteIcon} className="sq-app-preview-card--delete" onClick={()=> {alert('Delete!')}} role="presentation"/>
                </div>
                <div className="sq-app-preview-card--content">
                    {this.props.name}
                </div>
                <div className="sq-app-preview-card--footer">
                    <div>10 classes</div>
                    <div>300 sounds</div>
                </div>
            </div>
        )
    }
}
export default AppPreviewCard