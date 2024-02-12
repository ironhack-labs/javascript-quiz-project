class Quiz  {
    // YOUR CODE HERE:

    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
       
    }
    
    // 2. getQuestion()
    getQuestion () {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex ++;
    }
    
    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));
            
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
          }
          return this.questions;
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
        
        //should increase correctAnswers by 1 when called with a correct answer for the current question
        return this.correctAnswers ++;
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return true;
        } else if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
    }
}

