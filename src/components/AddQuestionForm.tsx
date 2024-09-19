import React, { useState } from 'react'; // Import React and hooks
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { useQuiz } from '../context/QuizContext'; // Import the context
import { addQuestionToSubject } from '../services/api'; // Import API service

const AddQuestionForm: React.FC = () => {
  const { selectedSubjectId, setQuestions } = useQuiz();
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjectId) {
      const newQuestion = { questionText, correctAnswer, options };
      addQuestionToSubject(selectedSubjectId, newQuestion).then((response) => {
        setQuestions((prev) => [...prev, response.data]); // Update the question list
        // Clear form fields after submitting
        setQuestionText('');
        setCorrectAnswer('');
        setOptions(['', '', '', '']);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Add a New Question</h4>
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
      <Button type="submit" variant="success">Add Question</Button>
    </Form>
  );
};

export default AddQuestionForm;
