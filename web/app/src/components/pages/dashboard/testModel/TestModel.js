import React, {Component} from 'react'
import { testModel } from './../../../../actions/mlApps';
import { connect } from 'react-redux';


class TestModel extends Component {

  testApp() {
    this.props.testModel(this.props.currentMlAppId);
  }

  render () {
    return (
      <div>
          <center>
            <h1> Test your app </h1>
            <button onClick={this.testApp.bind(this)}>Test</button>
          </center>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentMlAppId: state.currentMlAppId
})

export default connect(
  mapStateToProps,
  { testModel }
)(TestModel)