import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassUploadForm from './../../../shared/ClassUploadForm'
import TabPanel from './../../../shared/TabPanel';
import * as actions from './../../../../actions';
import { moveMlClass, copyPremadeClass, deleteMlClass } from './../../../../actions/mlClasses';
import SidebarPanel from './SidebarPanel';


class Sidebar extends Component {

  newClassButtonClicked() {
    this.props.showModal((
      <ClassUploadForm 
        currentAppId={this.props.currentAppId}
      />
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

  render() {
    return (
      <TabPanel tabNames={["custom", "premade"]}>

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
  { ...actions, moveMlClass, copyPremadeClass, deleteMlClass}
)(Sidebar)