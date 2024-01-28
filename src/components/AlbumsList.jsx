// AlbumsList.js
import React, { useEffect, useState } from 'react';
// import { firestore } from './firebase';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseInit';

import "../Assets/Styles/AlbumsList.css";
import AlbumForm from './AlbumForm';

const AlbumsList = ({ImagesListActive,setImageListActive,setActiveAlbumDocId}) => {
  const [albums, setAlbums] = useState([]);
  const [displayAlbumForm,setDisplayAlbumForm] = useState(false);


  useEffect(() => {
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      // console.log("Current data: ", doc.data());
      const albumsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(albumsData);
      setAlbums(albumsData);
    });
  }, []);

  return (
    // Render the list of albums
    <div className='AlbumsList'>
        {displayAlbumForm?<AlbumForm/>:""}
        <header className='AlbumsList-header'>
            <h2>Your albums</h2>
            <button style={displayAlbumForm?{color:"red",borderColor:"red"}:{}} onClick={()=>setDisplayAlbumForm(!displayAlbumForm)}>
              {!displayAlbumForm ?"Add album":"cancel"}
            </button>
        </header>
        <div className='AlbumsList-Lists'>
          {albums.map((data)=>(
            <div className='album-card' onClick={()=>{setImageListActive(!ImagesListActive);setActiveAlbumDocId(data.id)}}>
              <img src='https://mellow-seahorse-fc9268.netlify.app/assets/photos.png'/>
              <h3>{data.albumName}</h3>
            </div>
          ))}
        </div>
    </div>
  );
};

export default AlbumsList;