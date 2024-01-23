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
        const difficultyFilter = this.questions.filter(eachQuestion => {
            if (eachQuestion.difficulty === difficulty) {
                return true
            }
        })
        const newArray = this.f
    }

}







