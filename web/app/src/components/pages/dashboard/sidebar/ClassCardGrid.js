import React, {Component} from 'react';
import ClassCard from './ClassCard';


class ClassCardGrid extends Component {
    render () {
        return (
            <div>
                <input type="text"/>
                <div className="sq-class-card-grid">
                    {this.props.classes.map((classInfo, i) => {
                        return (
                            <div className="sq-class-card-grid--card-wrapper" key={i}>
                                <ClassCard classInfo={classInfo}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ClassCardGrid