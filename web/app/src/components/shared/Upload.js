import React, {Component} from 'react'


class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            features: []
        };
    }

    uplaodAudio() {
        const formData = new FormData();
        const file = this.fileInput.files[0];
        formData.append('uploads[]', file, file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_API_URL}/upload`, true);
        xhr.upload.onprogress = function(e) {
            console.log(e);
        };
        xhr.addEventListener("load", (response) => {
            console.log(response.srcElement.responseText);
            this.setState({features: response.srcElement.responseText});
            this.fileInput.value = "";
        });
        xhr.send(formData);
    }

    render () {
        return (
            <div style={{margin: "auto", width: "80%", display: "flex", justifyContent: "space-around"}}>
                <input
                    ref={(el) => this.fileInput = el}
                    type="file"
                    name="uploads[]"
                    multiple="multiple"
                    onClick={() => {this.setState({features: ""});}}
                    onChange={this.uplaodAudio.bind(this)}/>
                <div style={{width: 400, border: "solid 1px black", wordWrap: "break-word"}}>{this.state.features}</div>
            </div>
        )
    }
}

export default Upload