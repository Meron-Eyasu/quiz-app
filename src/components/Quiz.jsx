import { useState,useEffect } from "react"
import Results from "./Results"
import questions from "../data/questions";

function Quiz() {
    const questionBank = questions;
      
    const initialAnswers = [null, null, null]
    const [userAnswers, setUserAnswers] = useState(initialAnswers)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const selectedAnswer = userAnswers[currentQuestion]
    const [isQuizFinished, setIsQuizFinished] = useState(false)
    const [timeLeft, setTimeLeft] = useState(10)

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
    useEffect(() => {
        if (isQuizFinished) return
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        if (timeLeft === 0) {
            goToNext()
        }
        return () => clearInterval(timer)
    }, [timeLeft, isQuizFinished])

    useEffect(() => {
        setTimeLeft(10)
    }, [currentQuestion])

    useEffect(() => {
        if (isQuizFinished) return

        function handleKeyDown(e) {
            if (e.key === "ArrowRight") {
            goToNext()
            }

            if (e.key === "ArrowLeft") {
            goToPrev()
            }

            if (e.key >= "1" && e.key <= "4") {
            const index = Number(e.key) - 1
            const option = questionBank[currentQuestion].options[index]
            if (option) {
                handleSelectOption(option)
            }
            }

            if (e.key === "Enter" && selectedAnswer) {
            goToNext()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentQuestion, selectedAnswer, isQuizFinished])


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
        <h2>Question {currentQuestion + 1} of {questionBank.length}</h2>

        <progress
        value={currentQuestion + 1}
        max={questionBank.length}
        style={{ width: "100%", marginBottom: "1rem" }}
        />
        <p className={`timer ${timeLeft <= 3 ? "danger" : ""}`}>⏱ {timeLeft}s</p>


        <p className="hint">Use ← → to navigate, 1–4 to select, Enter to confirm</p>

        <p className="question">{questionBank[currentQuestion].question}</p>

        {/*{questionBank[currentQuestion].options.map((option) => (
            <button className={"option" + (selectedAnswer === option? " selected" : "")} onClick={() => handleSelectOption(option)}>{option}</button>
        ))}*/}
        {questionBank[currentQuestion].options.map((option, index) => (
            <button
                key={option}
                className={"option" + (selectedAnswer === option ? " selected" : "")}
                onClick={() => handleSelectOption(option)}
            >
                <span className="option-index">{index + 1}.</span> {option}
            </button>
        ))}

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