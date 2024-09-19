import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ListGroup } from 'react-bootstrap';
import { getAllSubjects } from '../services/api'; // Import the API function

const SubjectList: React.FC = () => {
  const { subjects, setSubjects, setSelectedSubjectId, setQuestions } = useQuiz();

  useEffect(() => {
    getAllSubjects()
      .then((fetchedSubjects) => {
        setSubjects(fetchedSubjects); // Store fetched subjects in state
      })
      .catch((error) => console.error('Error fetching subjects:', error));
  }, [setSubjects]);

  return (
    <div>
      <h4>Select a Subject</h4>
      <ListGroup>
        {subjects.map((subject) => (
          <ListGroup.Item
            key={subject.id}
            action
            onClick={() => {
              setSelectedSubjectId(subject.id); // Set selected subject
              setQuestions([]); // Clear previous questions
            }}
          >
            {subject.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SubjectList;
