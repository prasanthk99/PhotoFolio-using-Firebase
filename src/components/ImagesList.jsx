import React, { useEffect, useRef, useState } from "react";
import ImagesForm from "./ImagesForm";

import Search from '../Assets/Images/search.png';
import Back from '../Assets/Images/back.png';
import Warning from '../Assets/Images/warning.png';
import Trash from '../Assets/Images/trash-bin.png';
import Edit from '../Assets/Images/edit.png';

import "../Assets/Styles/ImagesList.css";
import { db } from "../firebaseInit";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

const ImagesList = ({ImagesListActive,setImageListActive,activeAlbumDocId})=>{
    const [showForm, setShowForm] = useState(false);
    const [imagesList, setImageList] = useState([]);
    const [AlbumName, setAlbumName] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editImageIndex,setEditImageIndex] = useState("");
    const Title = useRef();
    const ImageUrl = useRef();

    useEffect(() => {
        // Retrieve images when the component mounts
        retrieveImages();
    }, []);

    const retrieveImages = async () => {
        // Get the document reference
        const imageListDocRef = doc(db, "albums", activeAlbumDocId);

        // Get the document data
        const docSnap = await getDoc(imageListDocRef);

        // If the document exists, update the state with the imagesList
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.imagesList) {
                setImageList(data.imagesList);
            }
            setAlbumName(data.albumName)
        }

        // console.log(imageList);
    };

    const editImage = (image,index) => {
        setShowForm(true);
        setEditMode(true);
        console.log(image);
        setTimeout(()=>{
            if(Title.current && ImageUrl.current){
                Title.current.value = image.title;
                ImageUrl.current.value = image.imageUrl;
            }
        },10)
        setEditImageIndex(index);

        console.log(index);
    }

    const deleteImage = async (image) => {
        console.log("Delete Image CLicked "+image.id)
        // Update Firestore to remove the image from the array
        const imageListDocRef = doc(db, "albums", activeAlbumDocId);
        await updateDoc(imageListDocRef, {
            imagesList: arrayRemove(image),
        });
        setShowForm(false);
        setEditMode(false);

        // After deleting an image, retrieve the updated list
        retrieveImages();
    };

    return(
        <div className="imageslist">
            {showForm?<ImagesForm Title={Title} 
            ImageUrl={ImageUrl} 
            retrieveImages={retrieveImages} 
            AlbumName={AlbumName} 
            imagesList={imagesList} 
            activeAlbumDocId={activeAlbumDocId} 
            editMode={editMode} 
            setEditMode={setEditMode} 
            editImageIndex={editImageIndex}/>
            :""}
            <div className="imageslist-top">
                {/* <button type="button">back</button> */}
                <span onClick={()=>setImageListActive(!ImagesListActive)}>
                    <img src={Back} alt="back" />
                </span>
                <h3>{(imagesList.length===0)?"No images found in the album.":`Images in ${AlbumName}`}</h3>
                {/* <div className="imagelist-search">
                    <img src={Search} alt="search" />
                </div> */}
                <button style={showForm?{color:"red",borderColor:"red"}:{}} onClick={()=>{setShowForm(!showForm);setEditMode(false)}}>{showForm?"Cancel":"Add image"}</button>
            </div>
            <div className="imageslist-content">
                {imagesList.map((image,index)=>(
                    <div className="imagelist-card" key={index}>
                        <div className="imageList_update" onClick={()=>editImage(image,index)}><img src={Edit} alt="update"/></div>
                        <div className="imageList_delete" onClick={()=>deleteImage(image)}><img src={Trash} alt="delete"/></div>
                        <img src={image.imageUrl} alt="" srcset="" />
                        <h3>{image.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImagesList;