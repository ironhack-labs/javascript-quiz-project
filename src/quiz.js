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
   }; 


    checkAnswer(answer){
        const expectedAnswer = this.getQuestion().answer
        console.log(`answer: ${answer}`);
       
     if (answer === expectedAnswer){
        this.correctAnswers++; 
    }else{
        this.correctAnswers;
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
    if(difficulty > 0 && difficulty <= 3){
        return this.questions.filter(question =>{
            console.log(question);
            return question.difficulty === difficulty;
        })
    }else{
        return questions;
    }
      
        
    }
    averageDifficulty(){
        const difficulties =  this.questions.reduce((total, current) =>{
            return  total + current.difficulty;
        },0)
        return difficulties / this.questions.length;
    }
    }
    


