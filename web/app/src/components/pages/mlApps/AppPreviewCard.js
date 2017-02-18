import React, {Component} from 'react';
import pluralize from 'pluralize';


class AppPreviewCard extends Component {
    render () {
        return (
            <div className="sq-app-preview-card" onClick={this.props.onCardSelected}>
                <div className="sq-app-preview-card--header">
                    <div className="sq-app-preview-card--status">
                        <div className={"sq-app-preview-card--status-indicator" + (this.props.isWorkingModelDirty ? " unpublished" : " published")}></div>
                        <div className="sq-app-preview-card--status-message sq-text__pale">
                            {this.props.isWorkingModelDirty ? "edited" : "pubished"}
                        </div>
                    </div>
                    <div className="sq-app-preview-card--delete" onClick={event => {
                        event.stopPropagation();
                        this.props.onDeleteClicked(this.props.appId);
                    }} role="presentation"/>
                </div>
                <div className="sq-app-preview-card--content">
                    {this.props.name}
                </div>
                <div className="sq-app-preview-card--footer">
                    <div className="sq-text__pale">
                        {this.props.numClasses} {pluralize('class', this.props.numClasses)}
                    </div>
                    <div className="sq-text__pale">300 sounds</div>
                </div>
            </div>
        )
    }
}
export default AppPreviewCard