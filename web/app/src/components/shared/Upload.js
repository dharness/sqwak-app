import React, {Component} from 'react'
import {createClass} from './../../services/api'


class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            features: []
        };
    }

    uploadAudio() {
        const formData = new FormData();
        const file = this.fileInput.files[0];
        createClass({
            className: "car_honker",
            file
        }).then((res)=> {
            console.log(res.srcElement.responseText)
        });
    }

    render () {
        return (
            <div style={{margin: "auto", width: "80%", display: "flex", justifyContent: "space-around"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>
                    Class Name
                    </label>
                    <input type="text" value={this.state.audioClass} />
                    <input
                        ref={(el) => this.fileInput = el}
                        type="file"
                        name="uploads[]"
                        multiple="multiple"
                        onClick={() => {this.setState({features: ""});}}/>
                    <button onClick={this.uploadAudio.bind(this)}>Upload</button>
                </div>
                <div style={{width: 400, border: "solid 1px black", wordWrap: "break-word"}}>{this.state.features}</div>
            </div>
        )
    }
}

export default Upload