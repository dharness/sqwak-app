import React, {Component} from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import optionsImg from './../../assets/images/icons/options.svg';
import DropdownMenu from './DropdownMenu'
import pluralize from 'pluralize';


class ClassCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropwdownPosition: {
                left: 0
            }
        };
    }

    onMoveClick() {
        this.dropDownButton.blur();
        this.props.onMoveClick(this.props.mlClass.id);
    }

    onEditClick(event) {
        console.log('EDIT')
        event.stopPropagation();
        this.dropDownButton.blur();
        this.props.onEditClick(this.props.mlClass.id);
    }

    onDeleteClick(event) {
        event.stopPropagation();
        this.dropDownButton.blur();
        this.props.onDeleteClick(this.props.mlClass.id);
    }

    handleBlur() {
        this.setState({ dropdownOpen: false });
    }

    openDropdown() {
        const left = this.dropDownButton.offsetLeft;
        const top = this.dropDownButton.offsetTop;

        this.setState({
            dropdownOpen: true,
            dropwdownPosition: {
                left: left,
                top: top + 20,
            }
        })
    }
    
    render () {
        let {imgName} = this.props.mlClass;
        imgName = imgName || "blue-cube";
        const imgIcon = require(`./../../assets/images/class-icons/${imgName}.svg`);
        let addRemoveText = this.props.mlClass.inModel ? "Remove" : "Add";

        return (
            <div className="sq-class-card">
                <div className="sq-class-card--header">
                    <DropdownMenu position={this.state.dropwdownPosition} isOpen={this.state.dropdownOpen}>
                        <div className="sq-class-card--dropdown-menu-item sq-text__md" onMouseDown={this.onEditClick.bind(this)}>Edit</div>
                        <div className="sq-class-card--dropdown-menu-item sq-text__md" onMouseDown={this.onMoveClick.bind(this)}>{addRemoveText}</div>
                        <div className="sq-class-card--dropdown-menu-item sq-text__md" onMouseDown={this.onDeleteClick.bind(this)}>Delete</div>
                    </DropdownMenu>
                    <button
                        onBlur={this.handleBlur.bind(this)}
                        onClick={this.openDropdown.bind(this)}
                        ref={(e)=>{this.dropDownButton = e;}}
                        className="sq-class-card--edit sq-text__sm__pale">
                        <img src={optionsImg} role="presentation"/>
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