import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassUploadForm from './../../../shared/ClassUploadForm'
import TabPanel from './../../../shared/TabPanel';
import * as actions from './../../../../actions';
import { moveMlClass } from './../../../../actions/mlClasses';
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

  render() {
    return (
      <TabPanel tabNames={["custom", "premade"]}>

        {/* PANEL 1 */}
        <SidebarPanel
          mlClasses={this.props.customMlClasses}
          onEditCardSelected={this.props.onEditCardSelected.bind(this)}
          onCardSelected={this.onCardSelected.bind(this)}
          onFooterButtonClicked={this.newClassButtonClicked.bind(this)}
        />

        {/* PANEL 2 */}
        <SidebarPanel
          hideFooter={true}
          mlClasses={this.props.premadeMlClasses}
          onEditCardSelected={this.props.onEditCardSelected.bind(this)}
          onCardSelected={this.onCardSelected.bind(this)}
          onFooterButtonClicked={this.newClassButtonClicked.bind(this)}
        />

      </TabPanel>
    )
  }
}

Sidebar.propTypes = {
  customMlClasses: React.PropTypes.array,
  premadeMlClasses: React.PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({});

export default connect(
  mapStateToProps,
  { ...actions, moveMlClass }
)(Sidebar)