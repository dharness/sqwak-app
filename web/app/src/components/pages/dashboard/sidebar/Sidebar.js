import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TabPanel from './../../../shared/TabPanel';
import * as actions from './../../../../actions';
import { createMlClass, addSampleToClass, moveMlClass, copyPremadeClass, deleteMlClass } from './../../../../actions/mlClasses';
import SidebarPanel from './SidebarPanel';
import CreateClassForm from './CreateClassForm';


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

  onCardSelected(classId) {
    this.props.moveMlClass({
      appId: this.props.currentAppId,
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
      appId: this.props.currentAppId,
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

  render() {
    return (
      <TabPanel tabNames={["Your Classes", "Pre-made Classes"]}>

        {/* PANEL 1 */}
        <SidebarPanel
          mlClasses={this.props.customMlClasses}
          onEditCardSelected={this.props.onEditCardSelected.bind(this)}
          onCardSelected={this.onCardSelected.bind(this)}
          onDeleteClick={this.onDeleteCardClick.bind(this)}
          onFooterButtonClicked={this.newClassButtonClicked.bind(this)}
        />

        {/* PANEL 2 */}
        <SidebarPanel
          hideFooter={true}
          mlClasses={this.props.premadeMlClasses}
          onEditCardSelected={()=>{}}
          onCardSelected={this.copyPremadeClass.bind(this)}
          onDeleteClick={()=>{}}
          onFooterButtonClicked={()=>{}}
        />

      </TabPanel>
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