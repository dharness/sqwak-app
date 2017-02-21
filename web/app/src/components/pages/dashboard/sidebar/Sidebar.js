import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from './../../../../actions';
import { createMlClass, addSampleToClass, moveMlClass, copyPremadeClass, deleteMlClass } from './../../../../actions/mlClasses';
import CreateClassForm from './CreateClassForm';
import ClassCard from './../../../shared/ClassCard';
import PlushButton from './../../../shared/PlushButton';


class Sidebar extends Component {

  newClassButtonClicked() {
    browserHistory.push({
      pathname: browserHistory.getCurrentLocation().pathname,
      search: '?modal=create-class'
    });
    this.props.showModal((
      <CreateClassForm onSubmit={this.onSubmitCreateClassForm.bind(this)}/>
    ))
  }

  onMoveClick(classId) {
    this.props.moveMlClass({
      appId: this.props.currentMlAppId,
      classId,
      from: 'mlClasses',
      to: 'mlModel'
    });
  }

  onSubmitCreateClassForm({className, files}) {
    const mlClassData = {
      appId: this.props.currentMlAppId,
      userId: this.props.userId,
      className,
      files
    };
    this.props.createMlClass(mlClassData);
  }

  onDeleteCardClick(classId) {
    this.props.deleteMlClass({
      userId: this.props.userId,
      mlAppId: this.props.currentMlAppId,
      mlClassId: classId
    });
  }

  copyPremadeClass(classId) {
    this.props.copyPremadeClass({
      appId: this.props.currentMlAppId,
      classId
    });
  }
  
  componentDidMount() {
    if(this.props.openModal === 'create-class') {
      this.props.showModal((
        <CreateClassForm onSubmit={this.onSubmitCreateClassForm.bind(this)}/>
      ))
    }
  }

  handleScroll() {
    document.activeElement.blur();
  }

  render() {
    return (
      <div className="sq-sidebar">
          <div className="sq-sidebar--header">
            <div className="sq-text__lg">Your Classes</div>
            <div className="sq-text__sm">All your classes are kept here. Click “Add” to add them to your model.</div>
          </div>
          <div className="sq-sidebar--card-grid" onScroll={this.handleScroll.bind(this)}>
            {this.props.customMlClasses.map((classInfo, i) => {
              return (
                <div className="sq-sidebar--card-wrapper" key={i}>
                  <ClassCard
                    mlClass={classInfo}
                    onEditClick={this.props.onEditCardSelected}
                    onMoveClick={this.onMoveClick.bind(this)}
                    onDeleteClick={this.onDeleteCardClick.bind(this)}
                  />
                </div>)
            })}
          </div>
          <div className="sq-sidebar--footer">
            <PlushButton buttonText={"New Class"} onClick={this.newClassButtonClicked.bind(this)} />
          </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  customMlClasses: React.PropTypes.array,
  premadeMlClasses: React.PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentMlAppId: state.currentMlAppId,
    userId: state.user.id
  }
};

export default connect(
  mapStateToProps,
  { ...actions, moveMlClass, copyPremadeClass, deleteMlClass, createMlClass, addSampleToClass }
)(Sidebar)