class Quiz {
    // YOUR CODE HERE:

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
        this.questions.sort(() => Math.random() - 0.5);

    }

    checkAnswer(answer) {
        if (this.questions[this.currentQuestionIndex].answer === answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        return this.currentQuestionIndex < this.questions.length ? false : true;
    }

    filterQuestionsByDifficulty(difficulty) {

        if (difficulty === 1 || difficulty === 2 || difficulty === 3) {
            return this.questions.filter(question => question.difficulty === difficulty);
        } else {
            return this.questions;
        }
        
    }

    averageDifficulty() {
        return this.questions.reduce((acc, curr) => acc+curr.difficulty ,0) / this.questions.length;
    }
}