class Quiz {
    // YOUR CODE HERE:
    //
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    moveToNextQuestion() {
        return this.currentQuestionIndex++
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();

        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
            return true;
        }
        else {
            return false;
        }
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty !== 1 && difficulty !== 2 && difficulty !== 3) {
            return;
        }

        this.questions = this.questions.filter(q => q.difficulty === difficulty);
    }
    averageDifficulty() {
        const average = this.questions.reduce(function (acc, current) {
            return acc + current.difficulty
        }, 0)

        return average / this.questions.length
    }
}




