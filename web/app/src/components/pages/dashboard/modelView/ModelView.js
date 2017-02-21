import React, {Component} from 'react';
import { connect } from 'react-redux';
import { moveMlClass, deleteMlClass } from './../../../../actions/mlClasses';
import ClassCard from './../../../shared/ClassCard';

class ModelView extends Component {

  onMoveClick(classId) {
    this.props.moveMlClass({
      userId:  this.props.userId,
      appId: this.props.currentMlAppId,
      classId,
      to: 'mlClasses'
    });
  }

  onDeleteCardClick(classId) {
    this.props.deleteMlClass({
      userId: this.props.userId,
      mlAppId: this.props.currentMlAppId,
      mlClassId: classId
    });
  }


  render () {
    return (
      <div className="sq-model-view">
        <div className="sq-model-header">
          Model Workspace
        </div>
        <div className="sq-model-view--card-grid">
          {this.props.mlModel.mlClasses.map((classInfo, i) => {
            return (
              <div className="sq-model-view--card-wrapper" key={i}>
                  <ClassCard
                    mlClass={classInfo}
                    onEditClick={this.props.onEditCardSelected}
                    onMoveClick={this.onMoveClick.bind(this)}
                    onDeleteClick={this.onDeleteCardClick.bind(this)}
                  />
              </div>)
          })}
        </div>
      </div>
    )
  }
}

ModelView.defaultProps = {
  mlModel: {
    mlClasses: []
  }
};

ModelView.PropTypes = {
  mlClasses: React.PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  userId: state.user.id
});

export default connect(
  mapStateToProps,
  { moveMlClass, deleteMlClass }
)(ModelView)