import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, hashHistory as history } from 'react-router';
import routes from './routes'
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
    <Router routes={routes} history={history} />,
    <ImgApp />
    <ImgCaption />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
