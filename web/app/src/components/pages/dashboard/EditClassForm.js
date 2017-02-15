import React, {Component} from 'react';
import FileDropZone from './../../shared/FileDropZone';
import PlushButton from './../../shared/PlushButton';

class EditClassForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      className: props.mlClass.className,
      dirty: false,
      files: []
    }
  }

  onFilesChanged({files}) {
      this.setState({
        files: [...this.state.files, ...files],
        dirty: true
      });
  }

  handleClassNameChange(event) {
    this.setState({
      className: event.target.value,
      dirty: true
    });
  }

  onSubmit() {
    this.props.onSubmit({
      files: this.state.files,
      className: this.state.className,
      classId: this.props.mlClass.id
    });
  }

  render () {
    let canSubmit = this.state.dirty;
    return (
      <div>
          <div className="sq-create-class-form--header">
            <div className="sq-text sq-text__xl">Edit class</div>
            <input
              type="text"
              className="sq-basic-input"
              value={this.state.className}
              onChange={this.handleClassNameChange.bind(this)}
              placeholder="class name"
          />
          </div>
          <FileDropZone
              onFilesChanged={this.onFilesChanged.bind(this)}
          />
          <div className="sq-test-upload--footer">
              <PlushButton 
                  disabled={!canSubmit}
                  onClick={this.onSubmit.bind(this)}
                  buttonText={"Save Changes"} />
          </div>
      </div>
    )
  }
}

export default EditClassForm