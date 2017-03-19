import React, {Component} from 'react'

class DropdownMenu extends Component {
  render () {
    return (
      <div className="sq-class-card--dropdown-menu" style={{
          left: this.props.position.left,
          right: this.props.position.right,
          top: this.props.position.top,
          bottom: this.props.position.bottom,
          display: (this.props.isOpen ? "block" : "none")
        }}>
        {this.props.children}
      </div>
    )
  }
}

export default DropdownMenu