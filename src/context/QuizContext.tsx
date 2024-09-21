import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getQuestionsBySubjectId } from '../services/api'; // Use real API

interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer?: string; // Add correctAnswer field (optional if necessary)
  }

interface Subject {
  id: number;
  name: string;
}

interface QuizContextType {
  subjects: Subject[]; // Add subjects array to the context type
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>; // Add setSubjects to the context type
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  goToNextQuestion: () => void;
  selectedSubjectId: number | null;
  setSelectedSubjectId: React.Dispatch<React.SetStateAction<number | null>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]); // Add subjects state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex] || null;

  useEffect(() => {
    if (selectedSubjectId !== null) {
      getQuestionsBySubjectId(selectedSubjectId)
        .then((fetchedQuestions) => {
          setQuestions(fetchedQuestions); // Store fetched questions in state
          setCurrentQuestionIndex(0); // Reset question index when new subject is selected
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

  return (
    <QuizContext.Provider
      value={{
        subjects,
        setSubjects, // Make setSubjects available in the context
        questions,
        setQuestions,
        currentQuestion,
        currentQuestionIndex,
        goToNextQuestion,
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
