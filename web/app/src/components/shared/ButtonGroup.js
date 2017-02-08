import React, {Component} from 'react'

class ButtonGroup extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      selectedId: 0
    }
  }

  toggleSelected(index) {
      this.setState({selectedId: index});
      this.props.onButtonSelected(index);
  }
      
    render () {
        return (
            <div className="sq-button-group--wrapper sq-text__md">
                {this.props.buttonTexts.map((text, i) => {
                    let selectedClass = "sq-button-group--button" + (this.state.selectedId === i ? " selected" : "")
                    return (
                        <div key={i} className={ selectedClass } onClick={() => {this.toggleSelected(i)}}>
                            {text}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ButtonGroup