class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex]
        return currentQuestion
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++
    }

    shuffleQuestions() {
        console.log('BARAJANDO PREGUNTAS JEJEJE')
        this.questions.sort(() => .5 - Math.random());
    }

    checkAnswer(answerToCheck) {

        const currentQuestion = this.getQuestion()
        const currentAnswer = currentQuestion.answer

        if (answerToCheck === currentAnswer) {
            this.correctAnswers++
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex >= this.questions.length) {
            return true
        } else {
            return false
        }
    }

    filterQuestionsByDifficulty(difficulty) {

        if (isNaN(difficulty) || !(difficulty > 0 && difficulty < 4) || typeof difficulty != 'number') {
            return
        }

        const filteredQuestions = this.questions.filter(eachQuestion => {
            return eachQuestion.difficulty === difficulty
        })

        this.questions = filteredQuestions
    }

    averageDifficulty() {

        const sumDifficulty = this.questions.reduce((acc, eachQuestion) => {
            return acc + eachQuestion.difficulty
        }, 0)

        return sumDifficulty / this.questions.length
    }
}