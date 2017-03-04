import React, {Component} from 'react'

class TabPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
  }

  render () {
    return (
      <div className="sq-tab-panel">

        {/* TAB BUTTONS */}
        <div className="sq-tab-panel--tab-buttons">
          {this.props.tabNames.map((tabName, i) => {
            let selectedClass = "";
            if (i === this.state.selectedTabIndex) {
              selectedClass = " selected";
            }
            return (<div
              key={i}
              onClick={()=> {this.setState({selectedTabIndex: i})}}
              className={"sq-tab-panel--tab-button" + selectedClass}
              >{tabName}</div>);
          })}
        </div>

        {/* TAB PANELS */}
        <div className="sq-tab-panel--tab-panels">
          {this.props.children[this.state.selectedTabIndex]}
        </div>
      </div>
    )
  }
}

export default TabPanel