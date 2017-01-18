import React, {Component} from 'react'


class Upload extends Component {

    uplaodAudio() {
        const formData = new FormData();
        const file = this.fileInput.files[0];
        formData.append('uploads[]', file, file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_API_URL}/upload`, true);
         xhr.upload.onprogress = function(e) {
             console.log(e);
         };
        xhr.send(formData);
    }

    render () {
        return (
            <div>
                I am the upload Component
                <input
                    ref={(el) => this.fileInput = el}
                    type="file"
                    name="uploads[]"
                    multiple="multiple"
                    onChange={this.uplaodAudio.bind(this)}/>
            </div>
        )
    }
}

export default Upload