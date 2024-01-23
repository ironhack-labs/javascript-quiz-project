class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questionsValue, timeLimitValue, timeRemainingValue) {
        this.questions = questionsValue
        this.timeLimit = timeLimitValue
        this.timeRemaining = timeRemainingValue
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        return this.questions[this.currentQuestionIndex++]
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5)
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (answer) {
            this.correctAnswers++
        }
    }
    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return true
        } else { return false }
    }

    filterQuestionsByDifficulty(difficulty) {

        if (difficulty > 3 || difficulty == NaN || difficulty < 0) {
            return this.questions
        }

        const filteredArray = this.questions.filter(eachQuestion => {
            if (difficulty === eachQuestion.difficulty) {
                return true
            }
        })
        this.questions = filteredArray
    }

    averageDifficulty() {
        const sumDifficulty = this.questions.reduce((acc, eachDifficulty) => {

            return acc + eachDifficulty.difficulty

        }, 0)

        return sumDifficulty / this.questions.length
    }
}