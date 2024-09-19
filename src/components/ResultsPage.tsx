import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getQuestionsBySubjectId, submitAnswers as submitAnswersAPI } from '../services/api'; // Use real API

interface Question {
  id: number;
  questionText: string;
  options: string[];
}

interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
}

interface Subject {
  id: number;
  name: string;
}

interface QuizContextType {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  goToNextQuestion: () => void;
  submitAnswers: (subjectId: number, answers: UserAnswer[]) => Promise<boolean[]>; // Add submitAnswers to the context type
  selectedSubjectId: number | null;
  setSelectedSubjectId: React.Dispatch<React.SetStateAction<number | null>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex] || null;

  // Fetch questions when a subject is selected
  useEffect(() => {
    if (selectedSubjectId !== null) {
      getQuestionsBySubjectId(selectedSubjectId)
        .then((fetchedQuestions) => {
          setQuestions(fetchedQuestions); // Store fetched questions in state
          setCurrentQuestionIndex(0); // Reset question index when a new subject is selected
        })
        .catch((error) => console.error('Error fetching questions:', error));
    }
  }, [selectedSubjectId]);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log('Quiz complete!');
    }
  };

  const submitAnswers = async (subjectId: number, answers: UserAnswer[]) => {
    try {
      const results = await submitAnswersAPI(subjectId, answers); // Call the real API
      return results; // Return the results (true/false for each answer)
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  };

  return (
    <QuizContext.Provider
      value={{
        subjects,
        setSubjects,
        questions,
        setQuestions,
        currentQuestion,
        currentQuestionIndex,
        goToNextQuestion,
        submitAnswers, // Make submitAnswers available in the context
        selectedSubjectId,
        setSelectedSubjectId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
