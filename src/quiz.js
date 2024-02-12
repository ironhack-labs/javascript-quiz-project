class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    
    moveToNextQuestion() {
        this.currentQuestionIndex ++
    }

    shuffleQuestions() {
        let currentIndex = this.questions.length , randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            [this.questions[currentIndex], this.questions[randomIndex]] = [this.questions[randomIndex], this.questions[currentIndex]];
        }
    }

    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++ 
            return true
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        else return true
    }
}