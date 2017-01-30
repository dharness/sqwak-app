import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ClassUploadForm from './../../../shared/ClassUploadForm'
import PlushButton from './../../../shared/PlushButton';
import ClassCardGrid from './ClassCardGrid';
import { fetchClasses } from './../../../../services/api';
Tabs.setUseDefaultStyles(false);


class Sidebar extends Component {

  newClassButtonClicked() {
    this.props.showModal((
      <ClassUploadForm/>
    ))
  }

  componentDidMount() {
    const appId = this.props.currentApp.id;
    fetchClasses(appId).then(mlClasses => {
      mlClasses.forEach(mlClass => {
        this.props.addClass(appId, mlClass);
      });
    });
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
            <div className="sq-side-bar--tab-panel--search-wrapper"></div>
            <div className="sq-side-bar--tab-panel--content">
              <ClassCardGrid classes={[1,1,1,1,1,1,1,1,1,1,1]} />
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
    modal: state.modal
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