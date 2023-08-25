// QuestionList.js
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleQuestionDelete = questionId => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedQuestions = { ...questions };
        delete updatedQuestions[questionId];
        setQuestions(updatedQuestions);
      })
      .catch(error => {
        console.error("Error deleting question:", error);
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {Object.keys(questions).map(id => (
          <QuestionItem
            key={id}
            question={questions[id]}
            onDelete={handleQuestionDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
