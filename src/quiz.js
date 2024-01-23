class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions ;
        this.timeLimit = timeLimit ;
        this.timeRemaining = timeRemaining ;
        this.correctAnswers = 0 ;
        this.currentQuestionIndex = 0 ;
    }
    
    getQuestion(){
        return this.questions[this.currentQuestionIndex]
    }
    
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }

    shuffleQuestions(){
        for(let i = 0; i < this.questions.length; i++){
            let j = Math.floor(Math.random()*this.questions.length-1);
            let tempVar = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = tempVar;
        }
        return this.questions
    }

    checkAnswer(answer){
        const currentQuestion = this.getQuestion();
        if(answer === currentQuestion.answer){
            this.correctAnswers++
        }
    }

    hasEnded(){
        return this.currentQuestionIndex === this.questions.length
    }
}
