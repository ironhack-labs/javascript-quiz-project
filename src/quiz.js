class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        ++this.currentQuestionIndex
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        return this.questions.sort(() => Math.random() - 0.5)
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        ++this.correctAnswers
    }
    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        if (this.currentQuestionIndex === this.questions.length) {
            return true
        }
    }
}