import React, {Component} from 'react';
import shapeIcon from './../../assets/images/shapes/blue/cube.svg';

class ClassCard extends Component {

    onClick() {
        this.props.onClick(this.props.mlClass._id);
    }

    onEditClick(event) {
        event.stopPropagation();
        this.props.onEditClick(this.props.mlClass._id);
    }

    render () {
        return (
            <div className="sq-class-card" onClick={this.onClick.bind(this)}>
                <div className="sq-class-card--header">
                    <div className="sq-class-card--status-indicator"></div>
                    <div
                        onClick={this.onEditClick.bind(this)}
                        className="sq-class-card--edit sq-text__pale"
                    >edit</div>
                </div>
                <div className="sq-class-card--icon">
                    <img src={shapeIcon} role="presentation"/>
                </div>
                <div className="sq-class-card--label sq-text__sm">
                    {this.props.mlClass.className}
                </div>
            </div>
        )
    }
}

export default ClassCard