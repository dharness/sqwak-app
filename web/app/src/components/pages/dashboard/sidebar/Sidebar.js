import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassUploadForm from './../../../shared/ClassUploadForm'
import PlushButton from './../../../shared/PlushButton';
import TabPanel from './../../../shared/TabPanel';
import ClassCardGrid from './ClassCardGrid';
import * as actions from './../../../../actions';
import { moveMlClass } from './../../../../actions/mlClasses';
import searchIcon from '../../../../assets/images/icons/search-icon.svg';
import SidebarPanel from './SidebarPanel';


class Sidebar extends Component {

  newClassButtonClicked() {
    this.props.showModal((
      <ClassUploadForm 
        currentAppId={this.props.currentAppId}
      />
    ))
  }

  onCustomCardSelected(classId) {
    this.props.moveMlClass({
      appId: this.props.currentAppId,
      classId,
      from: 'mlClasses',
      to: 'mlModel'
    });
  }

  onPremadeCardSelected(classId) {
    this.props.moveMlClass({
      appId: this.props.currentAppId,
      classId,
      from: 'premadeClasses',
      to: 'mlClasses'
    });
  }

  render() {
    return (
      <TabPanel tabNames={["custom", "premade"]}>

        {/* PANEL 1 */}
        <SidebarPanel
          mlClasses={this.props.customMlClasses}
          onEditCardSelected={this.props.onEditCardSelected.bind(this)}
          onCardSelected={this.onCustomCardSelected.bind(this)}
          onFooterButtonClicked={this.newClassButtonClicked.bind(this)}
        />

        {/* PANEL 2 */}
        <SidebarPanel
          hideFooter={true}
          mlClasses={this.props.premadeMlClasses}
          onEditCardSelected={this.props.onEditCardSelected.bind(this)}
          onCardSelected={this.onPremadeCardSelected.bind(this)}
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