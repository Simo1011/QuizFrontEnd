import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ListGroup } from 'react-bootstrap';
import { getAllSubjects, getQuestionsBySubjectId } from '../services/api'; // Import the API

const SubjectList: React.FC = () => {
  const { subjects, setSubjects, selectedSubjectId, setSelectedSubjectId, setQuestions } = useQuiz();

  // Fetch subjects when the component loads
  useEffect(() => {
    getAllSubjects()
      .then((fetchedSubjects) => {
        setSubjects(fetchedSubjects); // Store subjects in state
      })
      .catch((error) => console.error('Error fetching subjects:', error));
  }, [setSubjects]);

  // Function to handle subject selection
  const handleSelectSubject = (subjectId: number) => {
    setSelectedSubjectId(subjectId); // Update selected subject
    getQuestionsBySubjectId(subjectId)
      .then((fetchedQuestions) => {
        setQuestions(fetchedQuestions); // Fetch questions for the selected subject
      })
      .catch((error) => console.error(`Error fetching questions for subject ID ${subjectId}:`, error));
  };

  return (
    <div>
      <h4>Select a Subject</h4>
      <ListGroup>
        {subjects.map((subject) => (
          <ListGroup.Item
            key={subject.id}
            action
            active={subject.id === selectedSubjectId} // Highlight the selected subject
            onClick={() => handleSelectSubject(subject.id)}
          >
            {subject.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SubjectList;
