import React, {Component} from 'react';
import ClassCard from './../../../shared/ClassCard';


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

ClassCardGrid.defaultProps = {
  mlClasses: []
};

export default ClassCardGrid