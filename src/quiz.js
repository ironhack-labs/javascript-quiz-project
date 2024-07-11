class Quiz {

    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions //array
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
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
        this.questions.sort((a, b) => 0.5 - Math.random());
    }

    checkAnswer(answer) {

        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++

        }
    }

    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return true
        } else {
            return false
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty === 1 || difficulty === 2 || difficulty === 3) {


            const filteredQuestions = this.questions.filter((eachQuestion) => {
                return eachQuestion.difficulty === difficulty
            })
            this.questions = filteredQuestions

        }
    }
    averageDifficulty() {
        const numberDifficulty = this.questions.reduce((acc, eachQuestion) => {
            return acc + eachQuestion.difficulty
        }, 0)

        const difficultyAvg = numberDifficulty / this.questions.length

        return difficultyAvg

    }

}
