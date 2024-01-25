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
        const currentAnswer = this.questions[this.currentQuestionIndex].answer
        if (answer === currentAnswer) {
            this.correctAnswers++
        }
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

    // day 2


    filterQuestionsByDifficulty(difficulty) {
        if (!isNaN(difficulty) && difficulty > 0 && difficulty < 4) {
            const filteredQuestions = this.questions.filter(elm => {
                return elm.difficulty === difficulty
            })
            this.questions = filteredQuestions
        }
    }
    averageDifficulty() {
        const sumDifficulties = this.questions.reduce((acc, elm) => acc + elm.difficulty, 0)
        const totalQuestions = this.questions.length
        const average = sumDifficulties / totalQuestions
        return average
    }
}

