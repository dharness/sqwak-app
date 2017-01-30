import React, {Component} from 'react'
import trainIcon from './../../../assets/images/icons/train.svg'
import testIcon from './../../../assets/images/icons/predict.svg'
import publishIcon from './../../../assets/images/icons/star.svg'

class SubNav extends Component {
    render () {
        return (
            <div className="sq-subnav">
                <div className="sq-subnav--app-name">
                    {this.props.appName}
                </div>
                <div className="sq-subnav--buttons">
                    <div className="sq-subnav--button">
                        <img className="sq-subnav--icon" role="presentation" src={trainIcon}/>  
                        train
                    </div>
                    <div className="sq-subnav--button">
                        <img className="sq-subnav--icon" role="presentation" src={testIcon}/>  
                        test
                    </div>
                    <div className="sq-subnav--button">
                        <img className="sq-subnav--icon" role="presentation" src={publishIcon}/>
                        publish
                    </div>
                </div>
            </div>
        )
    }
}

export default SubNav