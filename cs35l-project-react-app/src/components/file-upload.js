import React, { useState } from "react";
import { storage } from '../firebase';
import { render } from "react-dom"; 

const FirebaseUpload = () => { // custom hook created
  const [image, setImage] = useState(null); // variable stored if file
  const [url, setUrl] = useState(""); // url variable stores url of image after uploading
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // stores image in data type
    }
  };

  const handleUpload = () => { // upload button
    const uploadTask = storage.ref(`images/postimages/${image.name}`).put(image); // create firebase images folder
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
          .ref("images/postimages")
          .child(image.name) 
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    )
  }; 

  return ( // frontend part
    <div>
        <progress value={progress} max="100" />
        <br/>
        <br/>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br/>
        <br/>
        <img src={url || "http://via.placeholder.com/300x400"} alt="firebase-image" />
    </div>
  );
}

/* input type="file" is the button that is pressed to select a file
 * that line calls the handleChange() function
 * button upload handles the upload part
 * handleUpload() is the function that is called when button pressed 
 * placeholder image just there until picture uploaded
 * picture is stored in url variable
 */


render (<FirebaseUpload />, document.querySelector("#root"));
export {FirebaseUpload};
