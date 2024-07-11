class Quiz {

    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {
        return this.currentQuestionIndex++
    }

    shuffleQuestions() {
        return this.questions.sort(() => Math.random() - 0.5)
    }

    checkAnswer(answer) {

        const currentQuestion = this.getQuestion()
        const correctAnswer = currentQuestion.answer

        if (answer === correctAnswer) {
            this.correctAnswers++
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        } else if (this.currentQuestionIndex === this.questions.length) {
            return true
        }

    }

    filterQuestionsByDifficulty(difficulty) {

        if (typeof difficulty === 'number') {
            const filteredQuestions = this.questions.filter(eachQuestion => {
                return eachQuestion.difficulty === difficulty
            });
            this.questions = filteredQuestions
        }
    };

    averageDifficulty() {
        const allDifficulty = this.questions.reduce((acc, eachQuestion) => {
            return acc + eachQuestion.difficulty
        }, 0);
        return allDifficulty / this.questions.length
    }

};






//filterQuestionsByDifficulty(difficulty) {


