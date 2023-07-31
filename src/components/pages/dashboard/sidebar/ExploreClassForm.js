import React, { Component } from "react";
import { connect } from "react-redux";
import ExploreClassCard from "./ExploreClassCard";
import ReactScrollbar from "react-scrollbar-js";
import { copyPremadeClass } from "./../../../../actions/mlClasses";

class ExploreClassForm extends Component {
  onCopyClicked(classId) {
    this.props.copyPremadeClass({
      appId: this.props.currentMlAppId,
      classId,
    });
  }

  render() {
    const scrollbarConfig = {
      width: 600,
      height: 300,
    };
    return (
      <div className="sq-explore-form">
        <div className="sq-explore-form--contents">
          <div className="sq-text sq-text__xl">
            Choose from our pre-made classes
          </div>
          <div className="sq-text__pale">
            Select any number of pre-made classes to copy to an app
          </div>
          <ReactScrollbar style={scrollbarConfig}>
            <div className="sq-explore-form--card-grid">
              {this.props.premadeClasses.map((classInfo, i) => {
                console.log(classInfo);
                let isBeingCopied =
                  this.props.premadeClassesCopying[classInfo.id] === true;
                return (
                  <ExploreClassCard
                    isBeingCopied={isBeingCopied}
                    key={i}
                    mlClass={classInfo}
                    onCopyClicked={this.onCopyClicked.bind(this)}
                  />
                );
              })}
            </div>
          </ReactScrollbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { fileUploadProgress, premadeClassesCopying } = state.statuses;
  const { premadeClasses, currentMlAppId } = state;
  return {
    fileUploadProgress,
    premadeClasses,
    currentMlAppId,
    premadeClassesCopying,
  };
};

export default connect(mapStateToProps, { copyPremadeClass })(ExploreClassForm);
