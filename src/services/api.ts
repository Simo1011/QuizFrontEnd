import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Fetch all subjects
export const getAllSubjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

// Fetch questions for a specific subject (QuizController)
export const getQuestionsBySubjectId = async (subjectId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quiz/subjects/${subjectId}/questions`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions for subject ID ${subjectId}:`, error);
    throw error;
  }
};

// Submit answers to evaluate the quiz (QuizController)
export const submitAnswers = async (subjectId: number, answers: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quiz/subjects/${subjectId}/submit`, answers);
    return response.data;
  } catch (error) {
    console.error(`Error submitting answers for subject ID ${subjectId}:`, error);
    throw error;
  }
};

export const addQuestionToSubject = async (subjectId: number, question: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subjects/${subjectId}/questions`, question);
    return response;
  } catch (error) {
    console.error(`Error adding question to subject ID ${subjectId}:`, error);
    throw error;
  }
};