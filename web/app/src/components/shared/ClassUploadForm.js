import React, {Component} from 'react';
import PlushButton from './PlushButton';
import fileUploadImg from './../../assets/images/file-upload.svg';


class ClassUploadForm extends Component {
  render () {
    return (
      <div className="sq-class-upload-form">
        <div className="sq-class-upload-form--container">
          <div className="sq-text__xl sq-class-upload-form--title">Create Class</div>
          <input type="text" className="sq-basic-input" placeholder="class name"/>
          <div className="sq-class-upload-form--drop-zone">
            <img src={fileUploadImg} role="presentation"/>
            <div className="sq-class-upload-form--sub-1 sq-text__lg">Drag & drop</div>
            <div className="sq-class-upload-form--sub-2 sq-text__pale">
              .wav files or
              <pre
                onClick={()=> {alert('upload')}}
                className="sq-class-upload-form--underline-text sq-text"> browse</pre>
            </div>
          </div>
          <PlushButton buttonText="Creat class" disabled={true}/>
        </div>
      </div>
    )
  }
}

export default ClassUploadForm