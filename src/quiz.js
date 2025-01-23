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

    shuffleQuestions(answer) {
        this.questions.sort(() => Math.random() - 0.5);
    }

    checkAnswer(answer) {
        const correctAnswer = this.getQuestion().answer;
        if ( answer === correctAnswer){
            this.correctAnswers++;
            return true;
        }
        return false;
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else {
            return true;
        }

    }
    filterQuestionsByDifficulty(difficulty) {
        if (difficulty > 0 && difficulty < 4) {

            const filteredQuestions = this.questions.filter(question => question.difficulty === difficulty);
            this.questions = filteredQuestions

        }


    }
averageDifficulty() {
const sumDifficulty = this.questions.reduce(function(sum, question) {
    return sum + question.difficulty;

}, 0);
    return sumDifficulty / this.questions.length;
}

    resetQuiz() {
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
        this.shuffleQuestions();
        this.timeRemaining = this.timeLimit;
    }

}
