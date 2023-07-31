import React, { Component } from "react";
import fileUploadImg from "./../../assets/images/file-upload.svg";
import Dropzone from "react-dropzone";

class FileDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  browse(e) {
    e.stopPropagation();
    this.refs.dropzone.open();
  }

  onFilesChanged(event, newFiles) {
    newFiles = newFiles || this.fileInput.files;
    this.setState({ files: [...newFiles] });
    this.props.onFilesChanged({
      files: [...newFiles],
    });
  }

  renderFooter() {
    if (this.props.uploadProgress < 0) {
      return (
        <div
          style={{ display: this.state.files.length <= 0 ? "none" : "block" }}
          className="sq-class-upload-form--upload-message sq-text__lg"
        >
          {this.state.files.length} file ready to upload!
        </div>
      );
    } else {
      return (
        <div className="sq-class-upload-form--progress-bar">
          <div
            style={{
              width: `${Math.min(this.props.uploadProgress, 100)}%`,
            }}
            className="sq-class-upload-form--progress-bar-filling"
          ></div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="sq-file-drop-zone">
        <Dropzone
          disableClick={true}
          accept=".wav,audio/*"
          onDrop={(files) => {
            this.onFilesChanged(null, files);
          }}
          ref="dropzone"
          className={
            "sq-class-upload-form--drop-zone" +
            (this.state.files.length > 0 ? " active" : "")
          }
          activeClassName="sq-class-upload-form--drop-zone active"
        >
          <img
            src={fileUploadImg}
            role="presentation"
            className="sq-class-upload-form--icon"
          />
          <div className="sq-class-upload-form--sub-1 sq-text__lg">
            Drag & drop
          </div>
          <div className="sq-class-upload-form--sub-2 sq-text__pale">
            .wav files or
            <pre
              onClick={this.browse.bind(this)}
              className="sq-class-upload-form--underline-text sq-text"
            >
              {" "}
              browse
            </pre>
          </div>
          {this.renderFooter()}
        </Dropzone>
      </div>
    );
  }
}

export default FileDropZone;
