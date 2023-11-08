
import './QuestionForm.css';

import{db } from "./Firebase";
import React, { useState } from 'react';
import{collection, addDoc} from "firebase/firestore"

function QuestionForm() {

  const[title, setTitle] = useState("");
  const[desc, setDesc] = useState("");
  const[tag, setTag] = useState("");
  const userCollectionRef = collection(db, "questions");

  const writeUserData = async() => {
    await addDoc( userCollectionRef, {title: title, desc: desc, tag: tag}).then(() => {
         alert("Data Uploaded!");})
    } 


 
  return (
    <>
    <div className='articleHeader'>
      <h2>What do you want to share or ask?</h2>
      <div className='title'>
        <label>Title:</label>
        <input type="text" placeholder="Enter title" onChange={(event) => {setTitle(event.target.value)}} />
      </div>
      <div className='Article'>
        <label>Description:</label>
        {/* <textarea rows="4" placeholder="Enter description"></textarea> */}
        <input type="text" placeholder="Enter description" onChange={(event) => {setDesc(event.target.value)}} />
      </div>
      <div className='Tag'>
        <label>Tags:</label>
        <input type="text" placeholder="Enter tags" onChange={(event) => {setTag(event.target.value)}}/>
      </div>
      <button onClick={writeUserData} className="Button">Post</button>
    </div>
    </>
    
  );
}

export default QuestionForm;