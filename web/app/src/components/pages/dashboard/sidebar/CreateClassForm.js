import React, {Component} from 'react';
import FileDropZone from './../../../shared/FileDropZone';
import PlushButton from './../../../shared/PlushButton';

class CreateClassForm extends Component {

  constructor() {
    super();
    this.state = {
      className: "",
      files: [],
      uploadProgress: -1
    }
  }

  onFilesChanged({files}) {
      this.setState({files: [...this.state.files, ...files]});
  }

  handleClassNameChange(event) {
    this.setState({className: event.target.value});
  }

  onSubmit() {
    this.setState({uploadProgress: ++this.state.uploadProgress})
    setInterval(()=> {
      this.setState({uploadProgress: ++this.state.uploadProgress})
    }, 100)
    // this.props.onSubmit({
    //   files: this.state.files,
    //   className: this.state.className
    // });
  }

  render () {
    let canSubmit = this.state.className.length > 0 && this.state.files.length > 0;
    return (
      <div className="sq-create-class-form">
        <div className="sq-create-class-form--contents">
          <div className="sq-create-class-form--header">
            <div className="sq-text sq-text__xl">Create a class</div>
            <input
              type="text"
              className="sq-basic-input"
              value={this.state.className}
              onChange={this.handleClassNameChange.bind(this)}
              placeholder="class name"
          />
          </div>
          <FileDropZone
              uploadProgress={this.state.uploadProgress}
              onFilesChanged={this.onFilesChanged.bind(this)}
          />
          <div className="sq-test-upload--footer">
              <PlushButton 
                  disabled={!canSubmit}
                  onClick={this.onSubmit.bind(this)}
                  buttonText={"Create class"} />
          </div>
        </div>
      </div>
    )
  }
}

export default CreateClassForm