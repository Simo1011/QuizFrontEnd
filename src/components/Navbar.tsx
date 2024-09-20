import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useQuiz } from '../context/QuizContext';

const AppNavbar: React.FC = () => {
  const { setQuestions, setSelectedSubjectId } = useQuiz();

  const resetQuiz = () => {
    setSelectedSubjectId(null); // Reset subject selection
    setQuestions([]); // Clear questions when navigating to the quiz page
  };

  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
      <Navbar.Brand href="/" className="mx-auto brand-name">Quiz App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/" onClick={resetQuiz}>
            <Nav.Link className="nav-link">Take Quiz</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/add-question">
            <Nav.Link className="nav-link">Add Questions</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
