import React, { useEffect, useState } from "react";
import { db } from "../firebaseInit";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";

const ImagesForm = ({Title,ImageUrl,retrieveImages,AlbumName,imagesList,activeAlbumDocId,setEditMode,editMode,editImageIndex}) => {

    const addImage = async (e) => {
        e.preventDefault();

        if(editMode){
            updateImage();
        }else{
            // Update Firestore with the new image
            const imageListDocRef = doc(db, "albums", activeAlbumDocId);
            await updateDoc(imageListDocRef, {
                imagesList: arrayUnion({ "title": Title.current.value, "imageUrl": ImageUrl.current.value }),
            });
            Title.current.value = "";
            ImageUrl.current.value = "";
        }    

        // Clear the input fields
        // Title.current.value = "";
        // ImageUrl.current.value = "";

        // After adding an image, retrieve the updated list
        retrieveImages();
    };

    const updateImage = async () => {
        const imageListDocRef = doc(db, "albums", activeAlbumDocId);
        const docSnap = await getDoc(imageListDocRef);

        if (docSnap.exists()) {
            // Get the current data
            const data = docSnap.data();
            
            console.log(data);
            // Modify the array in your application
            const updatedImagesList = [...data.imagesList];
            updatedImagesList[editImageIndex] = {
                title: Title.current.value,
                imageUrl: ImageUrl.current.value,
            };

            // Update the entire array in Firestore
            await updateDoc(imageListDocRef, {
                imagesList: updatedImagesList,
            });
        }


        setEditMode(false);
        Title.current.value = "";
        ImageUrl.current.value = "";

        retrieveImages();

    }

    function clear(){
        // Clear the input fields
        Title.current.value = "";
        ImageUrl.current.value = "";
    }

    return (
        <div className="imageList_imageForm">
            <span>{editMode?'Update image dfsd':`Add image to ${AlbumName}`}</span>
            <form onSubmit={addImage}>
                <input required placeholder="Title" ref={Title} />
                <input required placeholder="Image URL" ref={ImageUrl} />
                <div className="imageForm_actions">
                    <button type="button" onClick={clear}>Clear</button>
                    <button type="submit">{editMode?"Update":"Add"}</button>
                </div>
            </form>

            {/* Display the retrieved images */}
            {/* <div className="imageList">
                <h2>Image List</h2>
                <ul>
                    {imageList.map((image, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {image.title}, <strong>URL:</strong> {image.imageUrl}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default ImagesForm;