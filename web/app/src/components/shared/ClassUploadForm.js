import React, {Component} from 'react';
import PlushButton from './PlushButton';
import fileUploadImg from './../../assets/images/file-upload.svg';
import {createClass} from './../../services/api';


class ClassUploadForm extends Component {

  constructor() {
    super();
    this.state = {
      files: []
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
    this.setState({files: this.fileInput.files});
  }

  browse() {
     this.fileInput.click();
  }

  render () {
    return (
      <div className="sq-class-upload-form">
        <div className="sq-class-upload-form--container">
          <div className="sq-text__xl sq-class-upload-form--title">Create Class</div>
          <input type="text" className="sq-basic-input" placeholder="class name"/>
          <div className="sq-class-upload-form--drop-zone">
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
          </div>
          <PlushButton 
            buttonText="Creat class" 
            onClick={this.uploadAudio.bind(this)} 
            disabled={this.state.files.length <= 0}/>
        </div>
      </div>
    )
  }
}

export default ClassUploadForm