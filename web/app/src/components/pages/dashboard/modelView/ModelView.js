import React, {Component} from 'react';
import { connect } from 'react-redux';
import { moveMlClass } from './../../../../actions/mlClasses';
import ClassCard from './../../../shared/ClassCard';

class ModelView extends Component {

  onCardSelected(classId) {
    this.props.moveMlClass({
      userId:  this.props.userId,
      appId: this.props.currentAppId,
      classId,
      to: 'mlClasses'
    });
  }

  render () {
    return (
      <div className="sq-model-view">
        {this.props.mlModel.mlClasses.map((mlClass, i) => {
          return (
            <div className="sq-model-view--card-wrapper" key={i}>
                <ClassCard
                    mlClass={mlClass}
                    onClick={this.onCardSelected.bind(this)}
                    onEditClick={() => {this.props.onEditCardSelected(i)}}
                />
            </div>)
        })}
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
  {moveMlClass}
)(ModelView)