import React, {Component} from 'react';
import PlushButton from './PlushButton';
import fileUploadImg from './../../assets/images/file-upload.svg';
import {createClass} from './../../services/api';


class ClassUploadForm extends Component {

  constructor() {
    super();
    this.state = {
      files: [],
      className: ""
    }
  }

  uploadAudio() {
    const file = this.fileInput.files[0];
    createClass({
        className: "car_honker",
        file
    }).then((res)=> {
        console.log(res.srcElement.responseText)
    });
  }

  onFilesChanged() {
    this.setState({files: [...this.state.files, this.fileInput.files]});
  }
  
  handleClassNameChange(event) {
    this.setState({className: event.target.value});
  }

  browse() {
     this.fileInput.click();
  }

  render () {
    let formIsValid = (this.state.files.length > 0 && this.state.className !== "");
    return (
      <div className="sq-class-upload-form">
        <div className="sq-class-upload-form--container">
          <div className="sq-text__xl sq-class-upload-form--title">Create Class</div>
          <input
            type="text"
            className="sq-basic-input"
            value={this.state.className}
            onChange={this.handleClassNameChange.bind(this)}
            placeholder="class name"
          />
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
          <PlushButton 
            buttonText="Creat class" 
            onClick={this.uploadAudio.bind(this)} 
            disabled={!formIsValid}/>
        </div>
      </div>
    )
  }
}

export default ClassUploadForm