class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining){
        this.questions      = questions;
        this.timeLimit      = timeLimit;
        this.timeRemaining  = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion(){
            this.currentQuestionIndex ++;

    }

    shuffleQuestions(){
        const randomisedArray = this.questions.sort(() => 0.5 - Math.random());
        this.questions = randomisedArray;
    }

    checkAnswer(answer){
        let question = this.getQuestion();
        if (answer ===  question.answer){
            this.correctAnswers ++;
            return true
        }   else {
            return false
        }
    }

    hasEnded(){
        if (this.currentQuestionIndex === this.questions.length){
            return true;
        }
        else{
            return false;
        }
    }

    filterQuestionsByDifficulty(difficulty){
        const difArray = [1, 2, 3];
        this.questions = this.questions.filter(question => (question.difficulty === difficulty) || !(difficulty in difArray));
    }

    averageDifficulty(){
        if (!this.questions) {
            return 0;
        }
        let average = this.questions.reduce((acc, curr) => acc + curr.difficulty, 0) / this.questions.length; 
        
        return average;
    }
}