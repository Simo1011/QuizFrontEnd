import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SubjectList from './components/SubjectList';
import QuizPage from './pages/QuizPage';
import AddQuestionForm from './components/AddQuestionForm';
import AppNavbar from './components/Navbar'; // Navbar
import { QuizProvider, useQuiz } from './context/QuizContext'; // Use context

const QuizSection: React.FC = () => {
  const { selectedSubjectId } = useQuiz();

  return (
    <Row>
      <Col md={4}>
        <SubjectList /> {/* List of subjects */}
      </Col>
      <Col md={8}>
        {selectedSubjectId ? <QuizPage /> : <p>Please select a subject to take the quiz.</p>}
      </Col>
    </Row>
  );
};

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            {/* Route for Quiz Page */}
            <Route path="/" element={<QuizSection />} />

            {/* Route for Add Question Page */}
            <Route path="/add-question" element={
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <AddQuestionForm /> {/* Form to add a new question */}
                </Col>
              </Row>
            } />
          </Routes>
        </Container>
      </Router>
    </QuizProvider>
  );
};

export default App;
