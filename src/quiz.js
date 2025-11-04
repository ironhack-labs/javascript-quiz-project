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
        this.questions.sort(() => Math.random() - 0.5);
    }

    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        return this.currentQuestionIndex < this.questions.length ? false : true;
    }

    filterQuestionsByDifficulty(difficulty) {
        return this.questions = this.questions.filter(question => {

            if (typeof difficulty !== "number") {
                return this.questions;
            }

            if (question.difficulty === difficulty) {
                return this.questions;
            }
        });
    }

    averageDifficulty() {
        return this.questions.reduce((acc, el, index, array) => {
            acc += (el.difficulty / array.length);
            return +acc.toFixed(1);
        }, 0)
    }
}