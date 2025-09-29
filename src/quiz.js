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
        this.currentQuestionIndex += 1;
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const b = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[b]] = [this.questions[b], this.questions[i]];
        }
    }

    checkAnswer(answer) {
        const q = this.getQuestion();
        if (!q) return false;
        const isCorrect = answer === q.answer;
        if (isCorrect) this.correctAnswers += 1;
        return isCorrect;
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter(q => q.difficulty === difficulty);
        }
    }

    averageDifficulty() {
        if (this.questions.length === 0) {
            return 0;
        }
        const totalDifficulty = this.questions.reduce((sum, question) => {
            return sum + question.difficulty;
        }, 0);
        return totalDifficulty / this.questions.length;
    }
}