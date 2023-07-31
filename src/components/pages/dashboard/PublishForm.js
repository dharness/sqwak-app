import React, { Component } from "react";
import PlushButton from "./../../shared/PlushButton";
import { connect } from "react-redux";
import { publishModel } from "./../../../actions/mlApps";
import Clipboard from "clipboard";
import Tooltip from "rc-tooltip";

class PublishForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isPublished: false };
  }

  componentDidMount() {
    this.clipboard = new Clipboard("#sq-copy-route-button");
  }

  onPublishModel() {
    this.props.publishModel({
      userId: this.props.userId,
      appId: this.props.currentMlAppId,
    });
    this.setState({ isPublished: true });
  }

  renderFormattedDate() {
    if (this.props.lastPublished) {
      let parts = this.props.lastPublished.split("-");
      let year = parts[0];
      let month = parts[1];
      let day = parts[2].split("T")[0];
      return [year, month, day].join("/");
    }
  }
  render() {
    // const publishUrl = `${process.env.REACT_APP_API_URL}/user/${this.props.userId}/ml_app/${this.props.currentMlAppId}/predict`
    const publishUrl = `https://sqwak-app.com/user/${this.props.userId}/ml_app/${this.props.currentMlAppId}/predict`;

    return (
      <div className="sq-publish-form">
        <div className="sq-publish-form--contents">
          <div className="sq-publish-form--header">
            <div className="sq-text__xl sq-publish-form--title">
              Publish App
            </div>
            <div className="sq-text__sm__pale sq-publish-form--status">
              Status: {this.state.isPublished ? "Published" : "Not published"}
              <br /> {this.renderFormattedDate()}
            </div>
          </div>

          <div className="sq-text__md sq-publish-form--description">
            By publishing {this.props.mlAppName} you can access the most
            recently trained version of your classifier at the /predict route
            via HTTP.
          </div>

          <table cellSpacing="0" className="sq-text__sm sq-publish-form--table">
            <tbody>
              <tr>
                <td>Content-type</td>
                <td>multipart/form-data</td>
              </tr>
              <tr>
                <td>Supported file types</td>
                <td>.wav</td>
              </tr>
              <tr>
                <td>file</td>
                <td>a single audio file</td>
              </tr>
            </tbody>
          </table>

          <p className="sq-text__sm__pale">
            <Tooltip
              trigger="click"
              placement="left"
              mouseEnterDelay={0}
              mouseLeaveDelay={0.1}
              overlay={
                <div className="sq-text__sm sq-text__white">Copied!</div>
              }
              align={{ offset: [2, 0] }}
            >
              <button
                data-clipboard-target="#sq-publish-route"
                id="sq-copy-route-button"
                className="sq-publish-form--copy"
              >
                Copy the URL below!
              </button>
            </Tooltip>
          </p>

          <div className="sq-publish-form--route">
            <div className="sq-text__sm sq-publish-form--route--content">
              {publishUrl}
              <div id="sq-publish-route" style={{ marginTop: 50 }}>
                {publishUrl}
              </div>
            </div>
          </div>

          <div className="sq-publish-form--button">
            <PlushButton
              buttonText="Publish app"
              onClick={this.onPublishModel.bind(this)}
              isLoading={this.props.isLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.statuses.publishModelPending,
  currentMlAppId: state.currentMlAppId,
  userId: state.user.id,
});

export default connect(mapStateToProps, { publishModel })(PublishForm);
