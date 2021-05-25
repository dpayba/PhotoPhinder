import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from './firebase';

const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null); // variable stored if file
  const [url, setUrl] = useState(""); // url variable stores url of image after uploading
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // stores image in data type
    }
  };

  const handleUpload = () => { // upload button
    const uploadTask = storage.ref(`images/${image.name}`).put(image); // create firebase images folder
    uploadTask.on (
      "state_changed",
      snapshot => { // current progress of upload
        const progress = Math.round (
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      }, 
      error => { // check if error
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name) 
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    )
  }; 

    return (
        <div>
            <progress value={progress} max="100" />
            <br/>
            <br/>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            <br/>
            <img src={url || "http://via.placeholder.come/300x400"} alt="firebase-image" />
        </div>
    );
};

render (<ReactFirebaseFileUpload />, document.querySelector("#root"));