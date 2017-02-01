import React, {Component} from 'react';


class AppPreviewCard extends Component {
    render () {
        return (
            <div className="sq-app-preview-card" onClick={this.props.onCardSelected}>
                <div className="sq-app-preview-card--header">
                    <div className="sq-app-preview-card--status">
                        <div className="sq-app-preview-card--status-indicator unpublished"></div>
                        <div className="sq-app-preview-card--status-message sq-text__pale"> unpublished</div>
                    </div>
                    <div className="sq-app-preview-card--delete" onClick={event => {
                        event.stopPropagation();
                        this.props.onDeleteClicked(this.props.appId)
                    }} role="presentation"/>
                </div>
                <div className="sq-app-preview-card--content">
                    {this.props.name}
                </div>
                <div className="sq-app-preview-card--footer">
                    <div className="sq-text__pale">10 classes</div>
                    <div className="sq-text__pale">300 sounds</div>
                </div>
            </div>
        )
    }
}
export default AppPreviewCard