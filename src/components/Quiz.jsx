import { useState } from "react"
import Results from "./Results"

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "London", "Paris", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which language is used for web apps?",
            options: ["PHP", "Python", "JavaScript", "All"],
            answer: "All",
        },
        {
            question: "What does JSX stand for?",
            options: ["JavaScript XML", "Java Syntax eXtension", "Just a Simple eXample", "None"],
            answer: "JavaScript XML",
        },
    ]
    const initialAnswers = [null, null, null]
    const [userAnswers, setUserAnswers] = useState(initialAnswers)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const selectedAnswer = userAnswers[currentQuestion]
    const [isQuizFinished, setIsQuizFinished] = useState(false)

    function handleSelectOption(option){
        const newUserAnswers = [...userAnswers]
        newUserAnswers[currentQuestion] = option
        setUserAnswers(newUserAnswers)
    }
    function goToPrev(){
        if (currentQuestion > 0)
            setCurrentQuestion(currentQuestion - 1)
    }
    function goToNext(){
        if (currentQuestion === questionBank.length - 1){
            setIsQuizFinished(true)
        } else
            setCurrentQuestion(currentQuestion + 1)
    }
    function restartQuiz(){
        setUserAnswers(initialAnswers)
        setCurrentQuestion(0)
        setIsQuizFinished(false)
    }
    if (isQuizFinished){
        return (
            <Results 
                userAnswers={userAnswers} 
                questionBank={questionBank} 
                restartQuiz={restartQuiz}
            />
        );
    }

  return (
    <div>
        <h2>Question {currentQuestion + 1}</h2>
        <p className="question">{questionBank[currentQuestion].question}</p>
        {questionBank[currentQuestion].options.map((option) => (
            <button className={"option" + (selectedAnswer === option? " selected" : "")} onClick={() => handleSelectOption(option)}>{option}</button>
        ))}
        {/*<p>Option Selected: {newUserAnswers}</p> */}
        <div className="nav-buttons">
            <button onClick={goToPrev} disabled={currentQuestion === 0}>Previous</button>
            <button onClick={goToNext} disabled={!selectedAnswer}>
                {currentQuestion === questionBank.length - 1? "Finish" : "Next"}
            </button>
        </div>
    </div>
  )
}

export default Quiz