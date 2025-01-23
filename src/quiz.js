class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    shuffleQuestions() {
        // Fisher-Yates Shuffle
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j] = [this.questions[j], this.questions[i]]];
        }
    }

    checkAnswer(answer) {
        if (answer===this.getQuestion().answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty !== 1 && difficulty !== 2 && difficulty !== 3) {
            return this.questions;
        }
        this.questions = this.questions.filter((question) => question.difficulty === difficulty);
        return this.questions;
    }
    averageDifficulty() {
        if (this.questions.length === 0) {
            return 0;
        }
        const difficultySum = this.questions.reduce((sum, question) => {
            return sum + question.difficulty;
        }, 0);
        return difficultySum / this.questions.length;
    }
}