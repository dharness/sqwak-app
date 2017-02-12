import React, {Component} from 'react'
import FileDropZone from './../../../shared/FileDropZone';
import PlushButton from './../../../shared/PlushButton';


class UploadFilePanel extends Component {
  
    constructor(props) {
        super(props);
        this.state = { files: [] };
    }

    submitForm() {
        const file = this.state.files[0];
        this.props.onSubmitTest(file);
    }

    onFilesChanged({files}) {
        console.log(files);
        this.setState({files: [...this.state.files, ...files]});
    }

    render () {
        return (
            <div>
                <div className="sq-test-upload--header">
                    <div className="sq-text sq-text__xl">Test your app</div>
                    <div className="sq-text sq-text__md">Upload a .wav file</div>
                </div>
                <FileDropZone
                    onFilesChanged={this.onFilesChanged.bind(this)}
                />
                <div className="sq-test-upload--footer">
                    <PlushButton 
                        disabled={this.state.files.length <= 0}
                        onClick={this.submitForm.bind(this)}
                        buttonText={"Classify it"} 
                        colorClass="sq-button__blue"/>
                </div>
            </div>
        )
    }
}

export default UploadFilePanel