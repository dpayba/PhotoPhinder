import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import axios from 'axios';
// import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// class ImgApp extends Component {
//   state = {
//     selectedFile: null
//   }

//   fileUploadHandler = () => {
//     const fd = new FormData();
//     fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
//     axios.post("", fd, {onUploadProgress: progressEvent => { //this is what we would replace with AWS if we can; here is where we put a link for storing data in backend
//       console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100))}}) 
//       .then(res => {console.log(res);}); 
//   }

//   fileSelectedHandler = event => {
//     this.setState({
//     selectedFile: event.target.files[0]})
//   }

//   render()
//   {
//     return (
//       <div className="ImgApp">
//         <input type="file" onChange={this.fileSelectedHandler}/>
//         <button onClick={this.fileUploadHandler}>Upload</button>
//       </div>
//     )
//   }
// }


// class ImgCaption extends Component {

//   render() {
//     return (<div className="Text"></div>)
//   }
// }

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
   </BrowserRouter>
    {/* <ImgApp />
    <ImgCaption />  */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
