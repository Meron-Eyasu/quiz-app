
function Results ({userAnswers, questionBank, restartQuiz}) {
    function getScore(){
        let finalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questionBank[index].answer)
                finalScore++
        });
        return finalScore;
    }
    const score = getScore()
    return (
        <div>
            <h2>Quiz Completed 🎉</h2>
            <p className="score">Your Score: {score}/{questionBank.length}</p>

            <ul>
                {questionBank.map((q, index) => (
                    <li key={index}>
                    <p>{q.question}</p>
                    <p>Your answer: {userAnswers[index]}</p>
                    <p>
                        Correct answer: {q.answer}
                    </p>
                    </li>
                ))}
            </ul>

            <button className="restart-button" onClick={restartQuiz}>Restart Quiz</button>
        </div>
    )
}
export default Results