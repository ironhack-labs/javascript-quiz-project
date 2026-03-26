class Quiz {
    constructor (questions, timeLimit, timeRemaining){
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;


    
    }


    // should return the item from the questions array at the position of currentQuestionIndex.
    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    } 
    

    
    moveToNextQuestion(){ 
        this.currentQuestionIndex ++;

    }

    shuffleQuestions(){

        this.questions.sort(() => Math.random()-0.5);

    }

    checkAnswer(answer){
       if( answer = true) {
       }return this.correctAnswers ++;
    }

    hasEnded(){

        if (this.currentQuestionIndex < this.questions.length) {

            return false;

        }else if (this.currentQuestionIndex === this.questions.length) {

            return true;

        }

    }
}