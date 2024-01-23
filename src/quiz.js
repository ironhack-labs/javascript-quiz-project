class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions,timeLimit,timeRemaining){
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
        this.currentQuestionIndex++;
    }

    shuffleQuestions(){
    for (let i = this.questions.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; 
      } 
      // return this.questions; 
   }; 


    checkAnswer(answer){
     if (typeof answer === "string"){
        this.correctAnswers++; 
        //return answer === "true" ? correctAnswers ++ : "not right!" 
        //if(!arr.length)
    }

}

hasEnded(){
   return this.currentQuestionIndex === this.questions.length ? true : false;

  /* if(this.currentQuestionIndex === this.questions.length){
    return true;
   }else if(this.currentQuestionIndex < this.questions.length ){
    return false;
   }*/
}

filterQuestionsByDifficulty(difficulty){
    return questions.filter(question =>{
        console.log(question);
        return question.difficulty === difficulty;
    })
}
}
