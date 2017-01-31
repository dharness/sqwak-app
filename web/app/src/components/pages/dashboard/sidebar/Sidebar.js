import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ClassUploadForm from './../../../shared/ClassUploadForm'
import PlushButton from './../../../shared/PlushButton';
import ClassCardGrid from './ClassCardGrid';
Tabs.setUseDefaultStyles(false);


class Sidebar extends Component {

  newClassButtonClicked() {
    this.props.showModal((
      <ClassUploadForm currentAppId={this.props.currentAppId}/>
    ))
  }

  onCardSelected(classId) {
    const selectedClass = this.props.mlClasses
      .find(mlClass => classId === mlClass._id);
    this.props.showModal((
      <ClassUploadForm editMode={true} mlClass={selectedClass} currentAppId={this.props.currentAppId}/>
    ))
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
            <div className="sq-side-bar--tab-panel--search-wrapper">
              <center><input type="text"/></center>
            </div>
            <div className="sq-side-bar--tab-panel--content">
              <ClassCardGrid 
                mlClasses={this.props.mlClasses} 
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

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
    mlClasses: state.mlClasses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showModal(component) {
      dispatch({
        type: 'SHOW_MODAL',
        component
      })
    },
    addClass(appId, mlClass) {
      dispatch({
        type: 'ADD_CLASS_TO_APP',
        appId,
        mlClass
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)