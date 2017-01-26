import React, {Component} from 'react'
import PlushButton from './../../shared/PlushButton';


class NewAppForm extends Component {

    constructor(props) {
        super(props);
        this.state = {formIsValid: false}
    }

    componentDidMount() {
        this.nameInput.focus();
    }

    userDidType(event) {
        const formIsEmpty = (this.nameInput.value === "" )
        this.setState({formIsValid: !formIsEmpty})
    }

    render () {
        return (
            <div className="sq-new-app-form">
                <div className="sq-new-app-form--container">
                    <div className="sq-new-app-form--title">Create app</div>
                    <input ref={(el)=> {this.nameInput = el;}} type="text" className="sq-basic-input" placeholder="app name" onChange={this.userDidType.bind(this)}/>
                    <div className="sq-new-app-form--button-wrapper">
                        <PlushButton buttonText="New app" disabled={!(this.state.formIsValid)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewAppForm