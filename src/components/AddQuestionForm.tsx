import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useQuiz } from '../context/QuizContext'; // Import the context
import { getAllSubjects, addQuestionToSubject } from '../services/api'; // Import API service

const AddQuestionForm: React.FC = () => {
  const { setQuestions } = useQuiz();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);

  // Fetch the subjects when the component loads
  useEffect(() => {
    getAllSubjects().then((fetchedSubjects) => {
      setSubjects(fetchedSubjects);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjectId) {
      const newQuestion = { questionText, correctAnswer, options };
      addQuestionToSubject(selectedSubjectId, newQuestion).then((response) => {
        setQuestions((prev) => [...prev, response.data]); // Update the question list if needed
        // Clear form fields after submitting
        setQuestionText('');
        setCorrectAnswer('');
        setOptions(['', '', '', '']);
      });
    }
  };

  return (
    <div>
      <h4>Add a New Question</h4>

      <Form.Group controlId="subjectSelect">
        <Form.Label>Select Subject</Form.Label>
        <Form.Control
          as="select"
          value={selectedSubjectId || ''}
          onChange={(e) => setSelectedSubjectId(parseInt(e.target.value))}
          required
        >
          <option value="">-- Select a Subject --</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Show the question form only if a subject is selected */}
      {selectedSubjectId && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Options</Form.Label>
            {options.map((option, index) => (
              <Form.Control
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                required
                className="mb-2"
              />
            ))}
          </Form.Group>
          <Button type="submit" variant="success">
            Add Question
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddQuestionForm;
