import React, {Component} from 'react';
import shapeIcon from './../../../../assets/images/shapes/blue/cube.svg';

class ClassCard extends Component {

    onClick() {
        this.props.onClick(this.props.mlClass._id);
    }

    render () {
        return (
            <div className="sq-class-card" onClick={this.onClick.bind(this)}>
                <div className="sq-class-card--header"></div>
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