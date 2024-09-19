import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button, Form } from 'react-bootstrap';

interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
}

const QuizPage: React.FC = () => {
  const { questions } = useQuiz();
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleOptionChange = (questionId: number, selectedOption: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let correctCount = 0;
    const answers = questions.map((question) => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount += 1;
      }
      return { questionId: question.id, selectedAnswer: userAnswer };
    });

    setScore(correctCount);
    setUserAnswers(answers);
    setQuizComplete(true);
  };

  if (quizComplete) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>You answered {score} out of {questions.length} questions correctly.</p>
        <ul>
          {questions.map((question, index) => (
            <li key={question.id}>
              {question.questionText} - Your answer: {selectedAnswers[question.id]}, Correct answer: {question.correctAnswer}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h4>Take the Quiz</h4>
      <Form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <h5>{question.questionText}</h5>
            {question.options.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                name={`question-${question.id}`}
                label={option}
                value={option}
                onChange={() => handleOptionChange(question.id, option)}
                checked={selectedAnswers[question.id] === option}
              />
            ))}
          </div>
        ))}
        <Button type="submit" variant="primary" className="mt-3">Submit Quiz</Button>
      </Form>
    </div>
  );
};

export default QuizPage;
