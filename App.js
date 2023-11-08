import React, { useState } from 'react';
import './App.css';
import PostTypeSelector from './PostTypeSelector';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import FindQuestion from './FindQuestion';
import "firebase/firestore";
function App() {
  const [postType, setPostType] = useState('question');

  return (
    <div className="App">
      <h1>New Post</h1>
      <PostTypeSelector postType={postType} setPostType={setPostType} />
      {postType === 'question' ? <QuestionForm /> : null}
      {postType === 'article' ? <ArticleForm /> : null}
      <div className="Find"> 
      {postType === 'FindQuestion' ? <FindQuestion /> : null} 
      </div>
     
    </div>
  );
}

export default App;