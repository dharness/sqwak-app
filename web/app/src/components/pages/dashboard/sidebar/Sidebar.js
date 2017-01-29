import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PlushButton from './../../../shared/PlushButton'
import ClassUploadForm from './../../../shared/ClassUploadForm'
import ClassCardGrid from './ClassCardGrid';
Tabs.setUseDefaultStyles(false);


class Sidebar extends Component {

  newClassButtonClicked() {
    this.props.showModal((
      <ClassUploadForm/>
    ))
  }

  componentDidMount() {
    this.props.showModal((
      <ClassUploadForm/>
    ))
  }


  render() {
    return (
      <div className="sq-side-bar">
        <Tabs selectedIndex={0} className="sq-side-bar--tab-panel">
          <TabList>
            <Tab>Custom Classes</Tab>
            <Tab>Pre-made Classes</Tab>
          </TabList>
          <TabPanel>
            <h2>Custom</h2>
            <ClassCardGrid classes={[{}, {}, {}]} />
          </TabPanel>
          <TabPanel>
            <h2>Premade</h2>
            <ClassCardGrid classes={[]} />
          </TabPanel>
        </Tabs>
        <div className="sq-side-bar--footer">
          <PlushButton buttonText={"New Class"} onClick={this.newClassButtonClicked.bind(this)} />
        </div>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)