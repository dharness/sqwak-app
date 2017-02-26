import React, {Component} from 'react'
import FileDropZone from './../../../shared/FileDropZone';


class UploadFilePanel extends Component {
    render () {
        return (
            <div className="sq-test--upload-panel">
                <FileDropZone
                    uploadProgress={-1}
                    onFilesChanged={this.props.onFilesChanged.bind(this)}
                />
            </div>
        )
    }
}

export default UploadFilePanel