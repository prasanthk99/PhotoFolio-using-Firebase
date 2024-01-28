// AlbumForm.js
import React, { useRef, useState } from 'react';
// import { firestore } from './firebase';
import { db } from '../firebaseInit';
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import "../Assets/Styles/AlbumForm.css";

const AlbumForm = () => {
  const [albumName, setAlbumName] = useState('');
  const albumNameRef = useRef();

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    // await firestore.collection('albums').add({ name: albumName });
    // Add a new document with a generated id.
    // console.log(albumNameRef.current.value);return;
    const albumInput = albumNameRef.current
    albumInput.focus();

    // Add a new document with a generated id
    const docRef = doc(collection(db, "albums"));
    // const docRef = await addDoc(collection(db, "albums"), {
    //     albumName:albumInput.value,
    //     createdOn: new Date()
    // });
    await setDoc(docRef, {
        albumName:albumInput.value,
        createdOn: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    // setAlbumName('');
    albumInput.value = "";
  };

  return (
    // Render the album form
    <div className="albumForm">
        <span>Create an album</span>
        <form onSubmit={handleAlbumSubmit}>
            <input required="true" placeholder="Album Name" ref={albumNameRef}/>
            <button type="button" onClick={()=>albumNameRef.current.value = ""}>Clear</button>
            <button>Create</button>
        </form>
    </div>
  );
};

export default AlbumForm;