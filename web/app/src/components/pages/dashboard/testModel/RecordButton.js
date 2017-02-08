import React from 'react';

export default (props) => {
    return (
        <div className="sq-record-button-wrapper">
            <div className={"sq-record-button-ring" + (props.isRecording ? " recording" : "")} >
            </div>
            <div
                onClick={props.onClick}
                className={"sq-record-button" + (props.isRecording ? " recording" : "")}>
                <div className={"sq-record-button-icon" + (props.isRecording ? " recording" : "")} />
            </div>
        </div>
    )
}