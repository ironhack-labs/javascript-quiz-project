class Quiz {
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }

    moveToNextQuestion(){
        this.currentQuestionIndex += 1;
    }

    shuffleQuestions(){
        for(let i=0; i<this.questions.length; i++){
            let j = Math.floor(Math.random()*this.questions.length-1);
            let tempVar = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = tempVar;
        }
        return this.questions
    }

    /* Doesn't check the answer, only increments the amount of 
    correct answers */
    checkAnswer(answer){
        return this.correctAnswers ++
    }

    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false;
        }
        else if(this.currentQuestionIndex === this.questions.length){
            return true
        }
    }
}


// 6. hasEnded()