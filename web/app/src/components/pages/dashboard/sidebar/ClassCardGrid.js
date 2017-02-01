import React, {Component} from 'react';
import ClassCard from './ClassCard';


class ClassCardGrid extends Component {

    render () {
        return (
            <div className="sq-class-card-grid">
                {this.props.mlClasses.map((classInfo, i) => {
                    return (
                        <ClassCard
                            key={i} 
                            mlClass={classInfo} 
                            onClick={this.props.onCardSelected}
                            onEditClick={this.props.onEditCardSelected}
                        />)
                })}
            </div>
        )
    }
}

export default ClassCardGrid