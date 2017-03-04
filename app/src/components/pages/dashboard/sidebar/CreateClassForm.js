import React, {Component} from 'react';
import { connect } from 'react-redux';
import ButtonGroup from './../../../shared/ButtonGroup';
import CustomClassForm from './CustomClassForm';
import ExploreClassForm from './ExploreClassForm';

class CreateClassForm extends Component {

  constructor() {
    super();
    this.state = { selectedTabId: 0 };
  }

  changeTab(tabId) {
    this.setState({selectedTabId: tabId})
  }

  renderSelectedPanel() {
    return [
      <CustomClassForm onSubmit={this.props.onSubmit}/>,
      <ExploreClassForm />
    ][this.state.selectedTabId]
  }

  render () {
    return (
      <div className="sq-create-class-form">
        <ButtonGroup buttonTexts={["Create class", "Copy class"]} selectedId={this.state.selectedTabId} onButtonSelected={this.changeTab.bind(this)}/>
        {this.renderSelectedPanel()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { fileUploadProgress } = state.statuses;
  return { fileUploadProgress }
};

export default connect(
  mapStateToProps,
  {}
)(CreateClassForm)