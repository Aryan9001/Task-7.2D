import React, { useState, useEffect } from 'react';
import { db } from './Firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './FindQuestion.css';

function FindQuestion() {
  const [questions, setQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const userQuestionsRef = collection(db, 'questions');
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Separate filtered array

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getDocs(userQuestionsRef);
      const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
      setFilteredQuestions(questionData); // Initialize filtered array with all questions
    };
    getQuestions();
  }, []);

  const handleFilter = () => {
    const filteredQuestions = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        question.tag.toLowerCase().includes(filterTag.toLowerCase())
    );
    setFilteredQuestions(filteredQuestions); // Update filtered array, not questions
  };

  const handleDeleteQuestion = async (id) => {
    // Remove the question with the given id from the database
    await deleteDoc(doc(db, 'questions', id));

    // Update filteredQuestions to remove the deleted question
    const updatedQuestions = filteredQuestions.filter((question) => question.id !== id);
    setFilteredQuestions(updatedQuestions);
  };

  const handleExpand = (index) => {
    // Toggle the expanded state for the clicked question
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      <h1>Filter Questions</h1>
      <div className="filter">
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Filter by title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      {filteredQuestions.map((question, index) => (
        <div className="card" key={question.id}>
          <h2>Question: {index + 1}</h2>
          <h2>Title: {question.title}</h2>
          <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
          <button onClick={() => handleExpand(index)}>
            {expandedIndex === index ? 'Collapse' : 'Expand'}
          </button>
          {expandedIndex === index && (
            <div>
              <h3>More Details:</h3>
              <p>Description: {question.desc}</p>
              <p>Tag: {question.tag}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FindQuestion;
