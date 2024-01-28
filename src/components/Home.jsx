// import logo from './logo.svg';
import { useState } from "react";
import AlbumForm from "./AlbumForm";
import AlbumsList from "./AlbumsList";
import { NavBar } from "./NavBar";
import ImagesList from "./ImagesList";

function Home() {
  const [ImagesListActive,setImageListActive] = useState(false);
  const [activeAlbumDocId,setActiveAlbumDocId] = useState("");

  return (
    <div className="App">
      <NavBar/>
      {ImagesListActive?
        <ImagesList ImagesListActive={ImagesListActive} setImageListActive={setImageListActive} activeAlbumDocId={activeAlbumDocId}/>:
        <AlbumsList ImagesListActive={ImagesListActive} setImageListActive={setImageListActive} setActiveAlbumDocId={setActiveAlbumDocId}/>
      }
    </div>
  );
}

export default Home;
