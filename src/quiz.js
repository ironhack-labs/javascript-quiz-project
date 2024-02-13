class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    } // end of constructor
    
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    } // end of gotQuestion method
    
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
        return this.currentQuestionIndex;

    } // end of moveToNextQuestion method

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1)); 
              [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; 
            } 
            return this.questions; 
    } // end of shuffleQuestions

    checkAnswer(answer) {
        if (answer === Object.values(this.questions[2])) {
         this.correctAnswers += 1;
        }
        
/* Nota para Shannon: Solo nos falta lograr esto -
1.  should increase 'correctAnswers' by 1 when a correct answer is passed as an argument
2. should check if the answer is correct by comparing it to the 'answer' property of the current question
Al cumplir con esto, cuadramos con lo asignado hoy. */

    } // end of checkAnswer
    
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    } //end of hasEnded 
} // end of Quiz class


// WEEEPAAAA!!!