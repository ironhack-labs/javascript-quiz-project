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
        this.questions.sort(function (a, b) { return 0.5 - Math.random() });
    }
    checkAnswer(answer) {
        if (answer === this.getQuestion().answer) {
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

        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            return;
        }

        this.questions = this.questions.filter(function (element) {
            if (element.difficulty === difficulty) {
                return true;
            }
        })

    }

    averageDifficulty() {
        const totalDifficulty = this.difficulty.reduce(function (acc, currentValue) {
            return acc + currentValue.difficulty;
        }, 0)
        return totalDifficulty / difficulty.length;
    }
};