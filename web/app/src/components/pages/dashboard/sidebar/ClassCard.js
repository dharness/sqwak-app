import React, {Component} from 'react';
import shapeIcon from './../../../../assets/images/shapes/blue/cube.svg';

class ClassCard extends Component {
    render () {
        return (
            <div className="sq-class-card">
                <div className="sq-class-card--header"></div>
                <div className="sq-class-card--icon">
                    <img src={shapeIcon} role="presentation"/>
                </div>
                <div className="sq-class-card--label sq-text__sm">Dog Barks</div>
            </div>
        )
    }
}

export default ClassCard