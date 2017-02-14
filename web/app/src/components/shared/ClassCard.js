import React, {Component} from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

class ClassCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
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

    render () {
        const {imgName} = this.props.mlClass;
        const imgIcon = require(`./../../assets/images/class-icons/${imgName}.svg`);
        return (
            <div className="sq-class-card">
                <div className="sq-class-card--header">
                    <Tooltip
                        placement="top"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0.1}
                        overlay={
                            <div className="sq-class-card--status-tooltip">
                                untrained samples
                            </div>}
                        align={{ offset: [0, 0] }}
                        >
                        <div
                            className={"sq-class-card--status-indicator" + (this.props.mlClass.inModel ? "" : " hidden")}></div>
                    </Tooltip>
                    <button ref={(e)=>{this.dropDownButton = e;}} className="sq-class-card--edit sq-text__sm__pale" >
                        . . .
                        <div className="sq-class-card--dropdown-menu">
                            <div className="sq-class-card--dropdown-menu-item" onClick={this.onEditClick.bind(this)}>Edit</div>
                            <div className="sq-class-card--dropdown-menu-item" onClick={this.onClick.bind(this)}>Add</div>
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
            </div>
        )
    }
}

export default ClassCard