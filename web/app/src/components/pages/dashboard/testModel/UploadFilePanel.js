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
        this.setState({files: [...this.state.files, ...files]});
    }

    render () {
        return (
            <div>
                <FileDropZone
                    onFilesChanged={this.onFilesChanged.bind(this)}
                />
                <div className="sq-test-upload--footer">
                    <PlushButton 
                        disabled={this.state.files.length <= 0}
                        isLoading={this.props.isLoading}
                        onClick={this.submitForm.bind(this)}
                        buttonText={"Classify it"} 
                        colorClass="sq-button__blue"/>
                </div>
            </div>
        )
    }
}

export default UploadFilePanel