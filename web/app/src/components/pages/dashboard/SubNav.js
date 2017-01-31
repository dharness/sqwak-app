import React, { Component } from 'react'
import trainIcon from './../../../assets/images/icons/train.svg'
import testIcon from './../../../assets/images/icons/predict.svg'
import publishIcon from './../../../assets/images/icons/star.svg'
import PublishForm from './PublishForm.js'
import { connect } from 'react-redux';


class SubNav extends Component {

  openPublishModal() {
    this.props.showModal((
      <PublishForm />
    ))
  }
  
  render() {
    return (
      <div className="sq-subnav">
        <div className="sq-subnav--app-name">
          {this.props.appName}
        </div>

        <div className="sq-subnav--buttons">
          <div className="sq-subnav--button">
            <img role="presentation" className="sq-subnav--icon" src={trainIcon} />
            train
          </div>

          <div className="sq-subnav--button">
            <img role="presentation" className="sq-subnav--icon" src={testIcon} />
            test
           </div>
           
          <div className="sq-subnav--button" onClick={this.openPublishModal.bind(this)}>
            <img role="presentation" className="sq-subnav--icon" src={publishIcon} />
            publish
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
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
)(SubNav)