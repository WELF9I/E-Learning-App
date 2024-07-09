import React, { FC, useState, useEffect } from "react";
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar} from 'react-native-paper';
import { ScreenProps } from '../../types';
import { questions } from './questions';
// @ts-ignore
import Icon3DDesign from '../../assets/categories/ICON3D-Design.png';
// @ts-ignore
import IconGraphicDesign from '../../assets/categories/ICONGraphicDesign.png';
// @ts-ignore
import IconWebDevelopment from '../../assets/categories/ICONWebDevelopment.png';
// @ts-ignore
import IconSeoMarketing from '../../assets/categories/ICONSeoMarketing.png';
// @ts-ignore
import IconFinanceAccounting from '../../assets/categories/ICONFinanceAccounting.png';
// @ts-ignore
import IconHRManagement from '../../assets/categories/ICONHRManagement.png';
// @ts-ignore
import IconPersonalDevelopment from '../../assets/categories/ICONPersonalDevelopment.png';
// @ts-ignore
import IconOfficeProductivity from '../../assets/categories/ICONOfficeProductivity.png';
// @ts-ignore
import quizzCover from '../../assets/categories/quizz-background.jpg';
// @ts-ignore
import TimerIcon from '../../assets/categories/timer.png';
// @ts-ignore
import correcte from '../../assets/categories/correct-mark.png';
// @ts-ignore
import wrong from '../../assets/categories/wrong-mark.png';
// @ts-ignore
import congratulation from '../../assets/categories/congratulation.png';
import {useTheme} from '../../utils/ThemeContext';

interface Question {
  id: number;
  idQuiz: number;
  point: number;
  question: string;
  answers: string[];
  writeAnswer: string;
}

const categories = [
  { id: 1, name: '3D Design', icon: Icon3DDesign },
  { id: 2, name: 'Graphic Design', icon: IconGraphicDesign },
  { id: 3, name: 'Web Development', icon: IconWebDevelopment },
  { id: 4, name: 'SEO & Marketing', icon: IconSeoMarketing },
  { id: 5, name: 'Finance & Accounting', icon: IconFinanceAccounting },
  { id: 6, name: 'Personal Development', icon: IconPersonalDevelopment },
  { id: 7, name: 'Office Productivity', icon: IconOfficeProductivity },
  { id: 8, name: 'HR Management', icon: IconHRManagement },
];

const quizzes = [
  { id: 1, category: '3D Design', image: quizzCover, questions: [] },
  { id: 2, category: '3D Design', image: quizzCover, questions: [] },
  { id: 3, category: 'Graphic Design', image: quizzCover, questions: [] },
  { id: 4, category: 'Graphic Design', image: quizzCover, questions: [] },
  { id: 5, category: 'Web Development', image: quizzCover, questions: [] },
  { id: 6, category: 'Web Development', image: quizzCover, questions: [] },
  { id: 7, category: 'SEO & Marketing',  image: quizzCover, questions: [] },
  { id: 8, category: 'SEO & Marketing',  image: quizzCover, questions: [] },
  { id: 9, category: 'Finance & Accounting',  image: quizzCover, questions: [] },
  { id: 10, category: 'Finance & Accounting',  image: quizzCover, questions: [] },
  { id: 11, category: 'Personal Development', image: quizzCover, questions: []},
  { id: 12, category: 'Personal Development', image: quizzCover, questions: []},
  { id: 13, category: 'Office Productivity',  image: quizzCover, questions: [] },
  { id: 14, category: 'Office Productivity',  image: quizzCover, questions: [] },
  { id: 14, category: 'HR Management',  image: quizzCover, questions: []},
  { id: 15, category: 'HR Management',  image: quizzCover, questions: []},
];

quizzes.forEach(quiz => {
  //@ts-ignore
  quiz.questions = questions.filter(q => q.idQuiz === quiz.id);
});

export const Quizz: FC<ScreenProps<'Quizz'>> = ({navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [progressValue, setProgressValue] = useState<number>(1);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  useEffect(() => {
    if (selectedQuiz !== null && !quizCompleted) {
      const quizQuestions = questions.filter(q => q.idQuiz === selectedQuiz);
      if (quizQuestions.length > 0) {
        if (timerInterval) {
          clearInterval(timerInterval); 
        }
        const interval = setInterval(() => {
          setTimer(prev => {
            const newTimerValue = prev === 1 ? 30 : prev - 1;
            setProgressValue(newTimerValue / 30);
            if (prev === 1) {
                handleNextQuestion();
              }
              return newTimerValue;
          });
        }, 1000);
        setTimerInterval(interval);
      }
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [selectedQuiz, currentQuestionIndex, quizCompleted]);

  const handlePressCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  const handlePressQuiz = (quizId: number) => {
    setSelectedQuiz(quizId);
    setCurrentQuestionIndex(0);
    setTimer(30);
    setProgressValue(1);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    const quizQuestions = questions.filter(q => q.idQuiz === selectedQuiz);
    if (answer === quizQuestions[currentQuestionIndex]?.writeAnswer) {
      setScore(prev => prev + 2);
    }
  };

  const handleNextQuestion = () => {
    const quizQuestions = questions.filter(q => q.idQuiz === selectedQuiz);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(30);
      setProgressValue(1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const renderItemCategories = () => (
    <>
      <Text style={styles.headerText}>Welcome to Quiz Game!</Text>
      <Text style={styles.subHeaderText}>Please choose a category to start</Text>
      <ScrollView contentContainerStyle={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => handlePressCategory(category.id)}>
            <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderItemQuizzes = () => {
    const filteredQuizzes = quizzes.filter(quiz => quiz.category === categories.find(cat => cat.id === selectedCategory)?.name);
    let counter = 1;
    return (
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.quizzesContainer} showsVerticalScrollIndicator={false}>
        {filteredQuizzes.map(quiz => (
          <TouchableOpacity key={quiz.id} style={styles.quizContainer} onPress={() => handlePressQuiz(quiz.id)}>
            <Image source={quiz.image} style={styles.quizImage} />
            <Text style={styles.quizText}>Quiz {counter++}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderResultScreen = () => (
    <View style={styles.resultContainer}>
    <View style={{marginBottom:20,}}><Image source={congratulation} style={styles.congratulationImage} /></View>
      <Text style={styles.resultHeaderText}>Quiz Completed!</Text>
      <Text style={styles.resultText}>Your Score: {score}/20</Text>
    </View>
  );

  const renderQuestionScreen = () => {
    const quizQuestions = questions.filter(q => q.idQuiz === selectedQuiz);

    if (quizQuestions.length === 0) {
      return (
        <View style={styles.noQuestionsContainer}>
          <Text style={styles.noQuestionsText}>Oops! There are no available questions for this quiz yet.</Text>
        </View>
      );
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
      <View style={styles.questionContainer}>
        <Image source={TimerIcon} style={styles.timerImage} />
        <ProgressBar progress={progressValue} theme={{ colors: { primary: '#0080ff' } }} style={{ height: 7, borderRadius: 5 ,width:'100%',marginBottom:10}}/>
        <Text style={styles.timerText}>Time left : {timer} seconds</Text>
        <Text style={styles.questionText}>Question {currentQuestionIndex + 1}:</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === answer && (answer === currentQuestion.writeAnswer ? styles.correctAnswer : styles.wrongAnswer),
            ]}
            onPress={() => handleAnswer(answer)}
            disabled={selectedAnswer !== null}
          >
            <View style={styles.answerContent}>
              <Text style={styles.answerText}>{answer}</Text>
              {selectedAnswer !== null && (
                <Image
                  source={answer === currentQuestion.writeAnswer ? correcte : wrong}
                  style={styles.answerIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
        {selectedAnswer !== null && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          )}
          </View>
          );
          };
          
          return (           
            <View style={styles.container}>
            {selectedCategory === null
              ? renderItemCategories()
              : selectedQuiz === null
              ? renderItemQuizzes()
              : quizCompleted
              ? renderResultScreen()
              : (
                <ScrollView nestedScrollEnabled contentContainerStyle={styles.quizzesContainer} showsVerticalScrollIndicator={false}>
                  {renderQuestionScreen()}
                </ScrollView>
              )}
          </View>
          
          );
          };
          
          const createStyles = (isDarkMode: boolean) =>
            StyleSheet.create({
          container: {
          flex: 1,
          backgroundColor: isDarkMode?'#333':"#F5F9FF",
          },
          progressBar: {
            height: 10,
            marginBottom: 8,
          },
          timerImage: {
            width: 50,
            height: 50,
            alignSelf: "center",
            marginBottom: 16,
            marginTop:-25,
          },
          headerText: {
          color:'#0080ff',
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
          marginTop:18,
          },
          subHeaderText: {
          fontSize: 18,
          textAlign: "center",
          color:isDarkMode?'#FFF':'black'
          },
          categoriesContainer: {
            marginTop:30,
            paddingHorizontal: 20,
          },
          categoryItem: {
          paddingLeft:10,
          height:60,
          borderRadius:10,
          backgroundColor:isDarkMode?'#5f5f5f':'#FFF',
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
          elevation: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          },
          categoryIcon: {
          width: 35,
          height: 35,
          marginRight: 20,
          },
          categoryText: {
          fontSize: 18,
          color:isDarkMode?'#FFF':'black'
          },
          quizzesContainer: {
            padding:10,
            marginTop:20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
          quizContainer: {
            width: '48%',
            padding: 10,
            marginBottom: 16,
            backgroundColor: '#FFF',
            borderRadius: 10,
            alignItems: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          quizImage: {
            width: '100%',
            height: 150,
            borderRadius: 10,
            marginBottom: 10,
          },
          quizText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
          },
          congratulationImage: {
            width: 80,
            height: 80,
            marginBottom: 10,
            },
          resultContainer: {
            marginTop:'40%',
          flex: 1,
          alignItems: "center",
          },
          resultHeaderText: {
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color:'#0080ff',
          },
          resultText: {
          fontSize: 20,
          fontWeight:'bold',
          color:isDarkMode?'#FFF':'black'
          },
          noQuestionsContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          },
          noQuestionsText: {
          fontSize: 18,
          textAlign: "center",
          paddingHorizontal: 20,
          color:isDarkMode?'#FFF':'black'
          },
          questionContainer: {
          flex: 1,
          padding: 20,
          },
          timerText: {
          marginBottom:30,
          fontSize: 18,
          textAlign: "center",
          marginVertical: 10,
          color:isDarkMode?'#FFF':'black'
          },
          questionText: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color:isDarkMode?'#dfdfdf':'black'
          },
          answerButton: {
          backgroundColor: "#f0f0f0",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 10,
          marginVertical: 10,
          width: "100%",
          alignSelf: "center",
          },
          correctAnswer: {
          borderColor: "#2FBE41",
          borderWidth: 2,
          },
          wrongAnswer: {
          borderColor: "#E72626",
          borderWidth: 2,
          },
          answerContent: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          },
          answerText: {
          fontSize: 18,
          },
          answerIcon: {
          width: 20,
          height: 20,
          },
          nextButton: {
            borderColor:'#FF9416',
            borderWidth:2,
          backgroundColor: "transparent",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 30,
          marginTop: 20,
          alignItems: "center",
          },
          nextButtonText: {
          color: "#FF9416",
          fontSize: 18,
          },
          });
