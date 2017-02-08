import React, {Component} from 'react';
import ClassUploadForm from './../../../shared/ClassUploadForm';
import PlushButton from './../../../shared/PlushButton';
import ClassCardGrid from './ClassCardGrid';
import searchIcon from '../../../../assets/images/icons/search-icon.svg';

class SidebarPanel extends Component {
  render () {
    return (
      <div className="sq-side-bar--wrapper">
        <div className="sq-side-bar--header">
          <div className="sq-side-bar--search-wrapper">
            <img src={searchIcon} role="presentation" className="sq-side-bar--search-icon"/>
            <input type="text" className="sq-side-bar--search-field sq-text__sm" placeholder="search..."/>
          </div>
        </div>
        <div className={"sq-side-bar--content" + (this.props.hideFooter ? " no-footer" : "")}>
            <ClassCardGrid 
              mlClasses={this.props.mlClasses}
              onEditCardSelected={this.props.onEditCardSelected.bind(this)}
              onCardSelected={this.props.onCardSelected.bind(this)}/>
        </div>
        <div className="sq-side-bar--footer" style={{display: (this.props.hideFooter ? "none" : "")}}>
          <PlushButton buttonText={"New Class"} onClick={this.props.onFooterButtonClicked.bind(this)} />
        </div>
      </div>
    )
  }
}

export default SidebarPanel