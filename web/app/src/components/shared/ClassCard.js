import React, {Component} from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import optionsImg from './../../assets/images/icons/options.svg';
import pluralize from 'pluralize';


class ClassCard extends Component {

    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false };
    }

    onClick() {
        this.dropDownButton.blur();
        this.props.onClick(this.props.mlClass.id);
    }

    onEditClick(event) {
        event.stopPropagation();
        this.dropDownButton.blur();
        this.props.onEditClick(this.props.mlClass.id);
    }

    onDeleteClick(event) {
        event.stopPropagation();
        this.dropDownButton.blur();
        this.props.onDeleteClick(this.props.mlClass.id);
    }
    
    optionsClicked() {
        this.dropDownButton.focus();
    }

    render () {
        let {imgName} = this.props.mlClass;
        imgName = imgName || "blue-cube";
        const imgIcon = require(`./../../assets/images/class-icons/${imgName}.svg`);
        let addRemoveText = this.props.mlClass.inModel ? "Remove" : "Add";

        return (
            <div className="sq-class-card">
                <div className="sq-class-card--header">
                    <button
                        onClick={this.optionsClicked.bind(this)}
                        ref={(e)=>{this.dropDownButton = e;}}
                        className="sq-class-card--edit sq-text__sm__pale">
                        <img src={optionsImg} role="presentation"/>
                        <div className="sq-class-card--dropdown-menu">
                            <div className="sq-class-card--dropdown-menu-item" onClick={this.onEditClick.bind(this)}>Edit</div>
                            <div className="sq-class-card--dropdown-menu-item" onClick={this.onClick.bind(this)}>{addRemoveText}</div>
                            <div className="sq-class-card--dropdown-menu-item" onClick={this.onDeleteClick.bind(this)}>Delete</div>
                        </div>
                    </button>
                </div>
                <div className="sq-class-card--icon">
                    <img src={imgIcon} role="presentation"/>
                </div>
                <div className="sq-class-card--label sq-text__sm">
                    {this.props.mlClass.className}
                </div>
                <div className="sq-class-card--num-samples sq-text__sm">
                    {this.props.mlClass.numSamples}  {pluralize('sample', this.props.mlClass.numSamples)}
                </div>
            </div>
        )
    }
}

export default ClassCard