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
        this.questions = this.questions.sort(() => Math.random() - 0.5);
    }
    checkAnswer(answer) {
        if (answer === this.getQuestion().answer) {
            this.correctAnswers++;

        }
    }
    hasEnded() {

        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else if (this.currentQuestionIndex == this.questions.length) {
            return true;
        }

    }
    filterQuestionsByDifficulty(difficulty) {
        if (difficulty > 0 && difficulty <= 3) {
            this.questions = this.questions.filter((question) => question.difficulty === difficulty);
        }
        console.log(this.questions)
    }
    averageDifficulty() {

        const averageDifficulty = this.questions.reduce((total, quest) => total + quest.difficulty, 0) / this.questions.length;

        console.log(averageDifficulty)
        return averageDifficulty;

    }


}