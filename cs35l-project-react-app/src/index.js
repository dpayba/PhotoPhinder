import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import logo from './logo.svg'; //important for handling images
import axios from 'axios'; //important for handling images (replace with AWS image handler?)
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

class ImgApp extends Component {
  state = {
    selectedFile: null
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post("", fd, {onUploadProgress: progressEvent => { //this is what we would replace with AWS if we can; here is where we put a link for storing data in backend
      console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100))}}) 
      .then(res => {console.log(res);}); 
  }

  fileSelectedHandler = event => {
    this.setState({
    selectedFile: event.target.files[0]})
  }

  render()
  {
    return (
      <div className="ImgApp">
        <input type="file" onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    )
  }
}

class ImgCaption extends Component {

  render() {
    return (<div className="Text"></div>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ImgApp />
    <ImgCaption />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
