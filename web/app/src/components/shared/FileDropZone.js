import React, {Component} from 'react';
import fileUploadImg from './../../assets/images/file-upload.svg';


class FileDropZone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  browse() {
     this.fileInput.click();
  }

  onFilesChanged() {
    this.setState({files: [...this.state.files, ...this.fileInput.files]});
    this.props.onFilesChanged({
      files: [...this.state.files, ...this.fileInput.files]
    });
  }


  render () {
    return (
      <div className="sq-file-drop-zone">
          <div className={"sq-class-upload-form--drop-zone" +
            (this.state.files.length <= 0 ? "" : " active")}
            >
            <img src={fileUploadImg} role="presentation" className="sq-class-upload-form--icon"/>
            <div className="sq-class-upload-form--sub-1 sq-text__lg">Drag & drop</div>
            <div className="sq-class-upload-form--sub-2 sq-text__pale">
              .wav files or
              <pre
                onClick={this.browse.bind(this)}
                className="sq-class-upload-form--underline-text sq-text"> browse</pre>
              <input
                  style={{display: "none"}}
                  ref={(el) => this.fileInput = el}
                  type="file"
                  name="uploads[]"
                  onChange={this.onFilesChanged.bind(this)}
                  multiple="multiple"/>
            </div>
            <div
                style={{display: (this.state.files.length <= 0) ? "none" : "block"}}
              className="sq-class-upload-form--upload-message sq-text__lg">
              {this.state.files.length} file ready to upload!
            </div>
          </div>
      </div>
    )
  }
}

export default FileDropZone