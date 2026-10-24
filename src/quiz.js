class Quiz {

    constructor (questions, timeLimit, timeRemaining) {
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
        for (let i = 0; i < this.questions.length; i++) {
            const randomIndex = Math.floor(Math.random() * this.questions.length);
            const temp = this.questions[i];
            this.questions[i] = this.questions[randomIndex];
            this.questions[randomIndex] = temp;
        }
    }

    checkAnswer(answer) {
        // get the current question and check if the answer matches
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion.answer === answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else {
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        // only filter if difficulty is a number between 1 and 3
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            return;
        }
        this.questions = this.questions.filter(function(q) {
            return q.difficulty === difficulty;
        });
    }

    averageDifficulty() {
        const total = this.questions.reduce(function(sum, q) {
            return sum + q.difficulty;
        }, 0);
        return total / this.questions.length;
    }
}
