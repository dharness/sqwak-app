import React, {Component} from 'react'

class ButtonGroup extends Component {
      
    render () {
        return (
            <div className="sq-button-group--wrapper sq-text__md">
                {this.props.buttonTexts.map((text, i) => {
                    let selectedClass = "sq-button-group--button" + (this.props.selectedId === i ? " selected" : "")
                    return (
                        <div key={i} className={ selectedClass } onClick={()=> {this.props.onButtonSelected(i)}}>
                            {text}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ButtonGroup