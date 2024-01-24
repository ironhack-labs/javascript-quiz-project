// YOUR CODE HERE:

class Quiz {
    constructor(questionsValue, timeLimitValue, timeRemainingValue) {

        this.questions = questionsValue
        this.timeLimit = timeLimitValue
        this.timeRemaining = timeRemainingValue
        this.correctAnswers = 0
        this.currentQuestionIndex = 0

    }
    getQuestion() {
        return this.questions[this.currentQuestionIndex]

    }

    moveToNextQuestion() {
        this.currentQuestionIndex++

    }

    shuffleQuestions() {
        this.questions.sort(() => Math.random() - .5)
    }

    checkAnswer(answer) {
        this.correctAnswers++

    }

    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return true

        }
        else {
            return false
        }
    }

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







