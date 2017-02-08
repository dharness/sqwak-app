import React, {Component} from 'react'
import RecordButton from './RecordButton';


class RecordSoundPanel extends Component {

    constructor() {
        super();
        this.state = {
            isRecording: false
        };
    }

    recordButtonClicked() {
        this.setState({isRecording: !this.state.isRecording});
    }

    render () {
        let subheader = this.state.isRecording ? "Recording..." : "Click to record a 4 second sound" 
        return (
        <div className="sq-test-record-wrapper">
            <div className="sq-test-record-header sq-text__xl"> Test your app </div>
            <div className="sq-test-record-subheader sq-text__md"> {subheader} </div>
            <div className="sq-test-record-button">
                <RecordButton isRecording={this.state.isRecording} onClick={this.recordButtonClicked.bind(this)}/>
            </div>
            <div className="sq-test-record-timer">
                seconds
            </div>
        </div>
        )
    }
}

export default RecordSoundPanel