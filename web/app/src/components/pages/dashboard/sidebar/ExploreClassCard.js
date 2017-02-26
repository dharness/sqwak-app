import React, {Component} from 'react';
import pluralize from 'pluralize';
import PlushButton from './../../../shared/PlushButton';


class ExploreClassCard extends Component {

  onCopyClicked() {
    this.props.onCopyClicked(this.props.mlClass.id);
    this.isCopied = true;
  }

  render () {
    let { imgName } = this.props.mlClass;
    imgName = imgName || "blue-cube";
    const imgIcon = require(`./../../../../assets/images/class-icons/${imgName}.svg`);

    return (
      <div className={"sq-class-card sq-class-card__explore" + (this.props.isBeingCopied ? " loading" : "") + (this.isCopied ? " is-copied" : "")}>
          <div className="sq-class-card--icon">
              <img src={imgIcon} role="presentation"/>
          </div>
          <div className="sq-class-card--label sq-text__sm">
              {this.props.mlClass.className}
          </div>
          <div className={"sq-class-card__explore--copy-button" + (this.props.isBeingCopied ? " loading" : "")}>
            <PlushButton loadingText=" " isLoading={this.props.isBeingCopied} buttonText={"Copy"} colorClass={"sq-button__blue"} onClick={this.onCopyClicked.bind(this)}/>
          </div>
          <div className="sq-class-card--num-samples sq-text__sm">
              {this.props.mlClass.numSamples}  {pluralize('sample', this.props.mlClass.numSamples)}
          </div>
      </div>
    )
  }
}

export default ExploreClassCard