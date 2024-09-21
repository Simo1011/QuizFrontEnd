import React, { useState } from 'react';
import { Form, Button, Alert, Modal, Card } from 'react-bootstrap';
import { useQuiz } from '../context/QuizContext';
import { createSubject } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa'; // Import icons for buttons

const AddSubjectPage: React.FC = () => {
  const [subjectName, setSubjectName] = useState('');
  const { setSubjects } = useQuiz();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const newSubject = { name: subjectName };
      const response = await createSubject(newSubject);
      setSubjects((prevSubjects) => [...prevSubjects, response.data]);
      setSubjectName('');
      setShowModal(true); // Show modal after successful subject addition
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Subject already exists. Please choose a different name.');
      } else {
        setErrorMessage('An error occurred while creating the subject.');
      }
    }
  };

  const handleAddAnother = () => {
    setShowModal(false); // Close modal and allow user to add another subject
  };

  const handleGoToAddQuestion = () => {
    setShowModal(false);
    navigate('/add-question'); // Redirect to the Add Question page
  };

  return (
    <div className="form-container">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h3 className="text-center">Add a New Subject</h3>

          {errorMessage && (
            <Alert variant="danger" className="text-center">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="subjectName">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </Form.Group>
            {/* Button with icon */}
            <Button className="custom-button mt-3" type="submit">
              <FaPlusCircle /> Add Subject
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal for user choice */}
      <Modal show={showModal} onHide={handleAddAnother} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subject Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The subject has been successfully added. What would you like to do next?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddAnother}>
            <FaPlusCircle /> Add Another Subject
          </Button>
          <Button className="custom-button" onClick={handleGoToAddQuestion}>
            <FaCheckCircle /> Proceed to Add Questions
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddSubjectPage;
