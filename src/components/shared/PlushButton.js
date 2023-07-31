import React, { Component } from "react";

class PlushButton extends Component {
  constructor() {
    super();
    this.state = {
      isDelaying: false,
      timeoiutId: null,
    };
  }

  handleClick() {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading === true && this.props.isLoading === false) {
      const timeoutId = setTimeout(() => {
        this.setState({ isDelaying: false });
      }, 300);
      this.setState({ isDelaying: true, timeoutId });
    }
  }

  render() {
    let buttonColorClass = this.props.colorClass
      ? this.props.colorClass
      : "sq-button__green";
    let isLoading = this.state.isDelaying || this.props.isLoading;
    let loadingText = this.props.loadingText || "Loading...";
    return (
      <button
        onClick={this.handleClick.bind(this)}
        disabled={this.props.disabled || isLoading}
        className={
          `sq-button ${buttonColorClass} sq-text__lg sq-text__white` +
          (isLoading ? " loading" : "")
        }
      >
        <div className="sq-button--spinner">{loadingText}</div>
        {isLoading ? "" : this.props.buttonText}
      </button>
    );
  }
}

export default PlushButton;
