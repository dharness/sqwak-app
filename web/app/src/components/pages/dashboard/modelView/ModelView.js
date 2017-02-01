import React, {Component} from 'react';
import ClassCard from './../../../shared/ClassCard';


class ModelView extends Component {
  render () {
    let mlClasses = [
      ...this.props.workingModel.mlClasses,
      ...this.props.workingModel.mlClasses,
      ...this.props.workingModel.mlClasses
    ]
    return (
      <div className="sq-model-view">
        {mlClasses.map((mlClass, i) => {
          return (
            <div className="sq-model-view--card-wrapper" key={i}>
                <ClassCard
                    mlClass={mlClass}
                    onClick={()=>{}}
                    onEditClick={()=>{}}
                />
            </div>)
        })}
      </div>
    )
  }
}

export default ModelView