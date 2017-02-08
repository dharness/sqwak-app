import React, {Component} from 'react'
import RecordButton from './RecordButton';
import PlushButton from './../../../shared/PlushButton';

class RecordSoundPanel extends Component {

    constructor() {
        super();
        this.state = {
            isRecording: false,
            countdown: 0
        };
        this.interval = 0;
    }

    recordButtonClicked() {
        if (!this.state.isRecording) {

            this.setState({isRecording: true});
            this.startTimer();
        }
    }

    startTimer() {
        const startTime = Date.now();

        this.interval = setInterval(() => { 
            let timeRemaining = Math.abs(4.1 - (Date.now() - startTime)/1000);
            this.setState({countdown: timeRemaining.toFixed(2)});

            if (this.state.countdown <= 0.1) {
                this.setState({isRecording: false});
                clearInterval(this.interval);
            }
        }, 100)        
    }

    render () {
        let subheader = this.state.isRecording ? "Recording..." : "Click to record a 4 second sound";
        return (
        <div className="sq-test-record-wrapper">
            <div className="sq-test-record-header sq-text__xl"> Test your app </div>
            <div className="sq-test-record-subheader sq-text__md"> {subheader} </div>
            <div className="sq-test-record-button">
                <RecordButton isRecording={this.state.isRecording} onClick={this.recordButtonClicked.bind(this)}/>
            </div>
            
            <div className="sq-test-record-timer sq-text__lg" style={{
                opacity: (this.state.isRecording ? 1 : 0)
            }}>
                {this.state.isRecording ? this.state.countdown.replace('.', ':') : "0:00"}
            </div>

            <div className="sq-test-record-classify-wrapper">
                <div className="sq-test-record-classify-text">
                    Record the sound again
                    <br/>
                    or
                </div>
                <PlushButton buttonText={"Classify it"} colorClass="sq-button__blue"/>
            </div>

        </div>
        )
    }
}

export default RecordSoundPanel