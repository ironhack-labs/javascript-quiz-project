class Quiz {
    // YOUR CODE HERE:
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    // 1. constructor (questions, timeLimit, timeRemaining)

    // 2. getQuestion()
    // It returns the current question.
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
    }

    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = 0; i < this.questions.length; i++) {
            const randomValue = Math.floor(Math.random() * this.questions.length);
            const tempValue = this.questions[i];
            this.questions[i] = this.questions[randomValue];
            this.questions[randomValue] =  tempValue;
        }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (this.getQuestion().answer === answer) {
            this.correctAnswers ++;
        }
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex > this.questions.length -1 ) {
            return true;
        } 
        else {
            return false;
        }
    }

}   