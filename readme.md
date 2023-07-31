# Sqwak

<div style="display: flex; flex-direction: column;">
  <p>
    Sqwak allows users to train and deploy custom audio-models from a web browser. No coding needed, just upload your audio files and deploy!
  </p>
</div>

## [Demo Video](https://vimeo.com/850298237)

[![Watch the video](README/video-poster.png)](https://vimeo.com/850298237)

### Description

Sqwak lets you create an audio classifier without writing any code!
To train your classifier, create some bins (such as 'clanking' 'quacking' and 'rock music') and upload your music into the appropriate bin.
After that, click the train button and voila, your classifier is now available at an api endpoint.
You can now POST to that endpoint with completely new sounds your classifier has never seen before, and it'll attempt to label it.
<br/>

### Screenshots

<table>
  <tr>
    <td>
      <img src="README/video-poster.png" alt="Video Poster">
    </td>
    <td>
      <img src="README/screenshot_app_view.png" alt="App View">
    </td>
  </tr>
  <tr>
    <td>
      <img src="README/screenshot_upload_files.png" alt="Upload Files">
    </td>
    <td>
      <img src="README/screenshot_train_model.png" alt="Train Model">
    </td>
  </tr>
  <tr>
    <td>
      <img src="README/screenshot_predict.png" alt="Predict">
    </td>
    <td>
      <img src="README/screenshot_publish.png" alt="Publish">
    </td>
  </tr>
</table>

### How it Works

1. Create a class you want to detect (example: a dog barking)
2. Upload audio files of that sound
3. Click "Train" and Sqwak handles all the audio parsing and training for you.
4. Publish your model to an API endpoint with 1 click.
5. Access your personal endpoint from your product to classify new audio files!

### Local Development

```
yarn install
yarn start
```
