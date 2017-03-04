import React, {Component} from 'react';
import fileUploadImg from './../../assets/images/file-upload-landing.svg'
import trainModelImg from './../../assets/images/train-model-landing.svg'
import jsonResponseImg from './../../assets/images/json-response-landing.svg'

class LandingPreviewSldier extends Component {

  constructor(props) {
    super();
    this.state = {
      currentCardIndex: 0
    };
    this.cardData = [{
      cardTitle: 'Create classes and add sounds',
      cardBody: 'All you have to do is upload sounds into your classes and you\'re good to go. The hardest part of machine learning is now done!',
      cardImg: fileUploadImg
    }, {
      cardTitle: 'Train your model',
      cardBody: 'Change the sounds in your classes all you want. When you\'re satisfied,  just click \'train\' button.',
      cardImg: trainModelImg
    }, {
      cardTitle: 'Get results right away!',
      cardBody: 'Test your model with different sounds, and when you\'re ready, publish your app. Now you can classify sounds from anywhere just by sending a POST request to the URL we provide.',
      cardImg: jsonResponseImg
    }]
  }

  render () {
    const currentCard = this.cardData[this.state.currentCardIndex];
    return (
      <div className="sq-landing-preview">
          <div className="sq-landing-preview--cards">
            <div className="sq-landing-preview--card">
              <img src={currentCard.cardImg} role="presentation" className="sq-landing-preview--card-img"/>
            </div>
          </div>
          <div className="sq-landing-preview--descriptions">
            <div className="sq-landing-preview--description">
              <div className="sq-landing-preview--description-number">{this.state.currentCardIndex+1}</div>
              <div className="sq-text  sq-text__xl sq-landing-preview--description-title">{currentCard.cardTitle}</div>
              <div className="sq-text  sq-text__lg sq-landing-preview--description-body">{currentCard.cardBody}</div>
              <div className="sq-landing-preview--navigation">
                {this.cardData.map((e,i)=> {
                  let isActive = (i === this.state.currentCardIndex);
                  return (<div
                  key={i}
                  onClick={()=> {this.setState({currentCardIndex: i})}}
                  className={
                      "sq-landing-preview--navigation-button" + (isActive ? " active" : "")
                    }></div>)
                })}
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default LandingPreviewSldier