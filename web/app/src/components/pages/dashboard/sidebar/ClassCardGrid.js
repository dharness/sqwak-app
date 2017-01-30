import React, {Component} from 'react';
import ClassCard from './ClassCard';


class ClassCardGrid extends Component {
    render () {
        return (
            <div className="sq-class-card-grid">
                {this.props.classes.map((classInfo, i) => {
                    return (<ClassCard key={i}/>)
                })}
            </div>
        )
    }
}

export default ClassCardGrid