import React, { useEffect } from 'react'; // Import React and hooks
import { useQuiz } from '../context/QuizContext'; // Import the context
import { getQuestionsBySubjectId } from '../services/api'; // Import the API service
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap components


const QuestionList: React.FC = () => {
  const { selectedSubjectId, questions, setQuestions } = useQuiz();

  useEffect(() => {
    if (selectedSubjectId) {
      getQuestionsBySubjectId(selectedSubjectId).then((response) => setQuestions(response.data));
    }
  }, [selectedSubjectId, setQuestions]);

  return (
    <div>
      <h3>Questions</h3>
      {questions.map((question) => (
        <Card key={question.id} className="mb-3">
          <Card.Body>
            <Card.Title>{question.questionText}</Card.Title>
            <Card.Text>
              <strong>Correct Answer: </strong>{question.correctAnswer}
            </Card.Text>
            <Button variant="primary">Edit</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default QuestionList;
