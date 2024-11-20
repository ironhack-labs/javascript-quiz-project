class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
        this.totalQuestions = questions.length;
    }

    // getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    // moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
    }

    // shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    // checkAnswer()
    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (currentQuestion.answer === answer) {
            this.correctAnswers += 1;
            return true;
        }
        return false;
    }

    // hasEnded()
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    // getCorrectAnswersCount()
    getCorrectAnswersCount() {
        return this.correctAnswers;
    }

    // filterQuestionsByDifficulty()
    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
        }
    }

    // averageDifficulty()
    averageDifficulty() {
        if (this.questions.length === 0) {
            return 0;
        }
        const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
        return totalDifficulty / this.questions.length;
    }
}
