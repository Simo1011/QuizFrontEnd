import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button, Form, Card } from 'react-bootstrap';
import Confetti from 'react-confetti';

interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
}

const QuizPage: React.FC = () => {
  const { questions, setQuestions, selectedSubjectId, setSelectedSubjectId } = useQuiz();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const questionsPerPage = 1; // Show 1 question per page

  useEffect(() => {
    // Reset quiz state whenever the subject changes
    setSelectedAnswers({});
    setQuizComplete(false);
    setScore(0);
    setCurrentPage(0); // Reset to the first page when the subject changes
  }, [selectedSubjectId]);

  const handleOptionChange = (questionId: number, selectedOption: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let correctCount = 0;
    questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer && userAnswer === question.correctAnswer) {  // Ensure correctAnswer is checked safely
        correctCount += 1;
      }
    });

    setScore(correctCount);
    setQuizComplete(true);
  };

  const handleRetakeQuiz = () => {
    // Reset selected answers and quiz completion state
    setSelectedAnswers({});
    setQuizComplete(false);
    setCurrentPage(0); // Go back to the first page
  };

  const successfulQuiz = score >= questions.length * 0.7; // For example, 70% or higher is a successful quiz

  const handleNext = () => {
    if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  if (quizComplete) {
    return (
      <div className="main-content text-center mt-4">
        {/* Conditionally render confetti if the quiz is successful */}
        {successfulQuiz && <Confetti />}

        <h2 className="display-4">Quiz Complete!</h2>
        <p className="lead">You answered {score} out of {questions.length} questions correctly.</p>
        <ul className="list-unstyled">
          {questions.map((question) => (
            <li key={question.id} className="mb-2">
              <strong>{question.questionText}</strong> <br />
              Your answer: {selectedAnswers[question.id]} | Correct answer: {question.correctAnswer}
            </li>
          ))}
        </ul>
        {/* Retake Quiz and Select New Subject Buttons */}
        <Button variant="primary" onClick={handleRetakeQuiz} className="custom-button">
          Retake Quiz
        </Button>
        <Button variant="secondary" onClick={() => setSelectedSubjectId(null)} className="custom-button">
          Choose a New Subject
        </Button>
      </div>
    );
  }

  if (!questions.length) {
    return <div className="main-content text-center mt-4">Please select a subject to take the quiz.</div>;
  }

  return (
    <div className="main-content">
      <h4 className="text-center mb-4">Take the Quiz</h4>
      <Form onSubmit={handleSubmit}>
        {currentQuestions.map((question, index) => (
          <Card key={question.id} className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">
                {startIndex + index + 1}. {question.questionText}
              </Card.Title>
              {question.options.map((option, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={`question-${question.id}`}
                  label={option}
                  value={option}
                  onChange={() => handleOptionChange(question.id, option)}
                  checked={selectedAnswers[question.id] === option}
                  className="mb-2"
                />
              ))}
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                {currentPage < Math.ceil(questions.length / questionsPerPage) - 1 ? (
                  <Button variant="primary" onClick={handleNext} className="custom-button">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" className='custom-button'>
                    Submit Quiz
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card>
        ))}
      </Form>
    </div>
  );
};

export default QuizPage;
