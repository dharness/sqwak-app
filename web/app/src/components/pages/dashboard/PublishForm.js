import React, { Component } from 'react';
import PlushButton from './../../shared/PlushButton';

class PublishForm extends Component {
  render() {
    return (
      <div className="sq-publish-form">
        <div className="sq-publish-form--header">
          <div className="sq-text__xl sq-publish-form--title">Publish App</div>
          <div className="sq-text__sm__pale sq-publish-form--status">Status: published<br/> 03/04/2017</div>
        </div>

        <div className="sq-text__md sq-publish-form--description">
          By publishing New App 1 you can access the most recently trained version of your classifier at the /predict route via HTTP.
        </div>

        <table cellSpacing="0" className="sq-text__sm sq-publish-form--table">
          <tbody>
            <tr>
              <td>Content-type</td>
              <td>multipart/form-data</td>
            </tr>
            <tr>
              <td>Accept-Encoding</td>
              <td>wav, gzip</td>
            </tr>
            <tr>
              <td>files</td>
              <td>content</td>
            </tr>
          </tbody>
        </table>

        <p className="sq-text__sm__pale">Copy the URL below!</p>
        <div className="sq-text__sm sq-publish-form--route">
            https://sqwak.kingofthestack.com/api/v0/noodlenut/newapp1/predict
        </div>

        <div className="sq-publish-form--button">
          <PlushButton buttonText="Publish app"/>
         </div>

      </div>
    )
  }
}

export default PublishForm