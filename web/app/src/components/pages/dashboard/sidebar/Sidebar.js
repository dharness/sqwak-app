import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import ClassUploadForm from './../../../shared/ClassUploadForm'
import PlushButton from './../../../shared/PlushButton';
import ClassCardGrid from './ClassCardGrid';
import * as actions from './../../../../actions';
import searchIcon from '../../../../assets/images/icons/search.svg';
Tabs.setUseDefaultStyles(false);


class Sidebar extends Component {

  newClassButtonClicked() {
    this.props.showModal((
      <ClassUploadForm currentAppId={this.props.currentAppId}/>
    ))
  }

  onEditCardSelected(classId) {
  
    const selectedClass = this.props.customMlClasses
      .find(mlClass => classId === mlClass._id);
    this.props.showModal((
      <ClassUploadForm editMode={true} mlClass={selectedClass} currentAppId={this.props.currentAppId}/>
    ))
  }

  onCardSelected(classId) {
    console.log(classId)
  }

  render() {
    return (
      <div className="sq-side-bar">
        {/* TABS PANEL */}
        <Tabs selectedIndex={0} className="sq-side-bar--tab-panel">
          <TabList>
            <Tab>Custom Classes</Tab>
            <Tab>Pre-made Classes</Tab>
          </TabList>

          {/* PRE_MADE */}
          <TabPanel>
            <div className="sq-side-bar--header">
              <div className="sq-side-bar--search-wrapper">
                <img src={searchIcon} role="presentation" className="sq-side-bar--search-icon"/>
                <input type="text" className="sq-side-bar--search-field sq-text__lg"/>
              </div>
            </div>
            <div className="sq-side-bar--tab-panel--content">
              <ClassCardGrid 
                mlClasses={this.props.customMlClasses}
                onEditCardSelected={this.onEditCardSelected.bind(this)}
                onCardSelected={this.onCardSelected.bind(this)}/>
            </div>
            <div className="sq-side-bar--footer">
                <PlushButton buttonText={"New Class"} onClick={this.newClassButtonClicked.bind(this)} />
            </div>
          </TabPanel>

            {/* PRE_MADE */}
          <TabPanel>
          </TabPanel>
        </Tabs>
      </div>
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
  actions
)(Sidebar)