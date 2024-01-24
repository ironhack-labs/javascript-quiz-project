class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions,timeLimit,timeRemaining){
        this.questions=questions;
        this.timeLimit =timeLimit;
        this.timeRemaining =timeRemaining;
        this.correctAnswers =0;
        this.currentQuestionIndex=0;


    }

    // 2. getQuestion()
    getQuestion(){
        return this.questions[this.currentQuestionIndex]        
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
        this.currentQuestionIndex+=1;
    }

    // 4. shuffleQuestions()
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
          }

    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){

        return this.correctAnswers ++;
            
    }

    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex<this.questions.length){
            return false
        } return true

    }

    filterQuestionsByDifficulty(difficulty){
            if( difficulty < 1 || difficulty > 3 || typeof difficulty !== "number" ){
                return;
            }
            const filteredQuestions = this.questions.filter((question) =>{
                return question.difficulty === difficulty;
            })
            this.questions = filteredQuestions;
            return this.questions;
        
       
    }


    averageDifficulty(){
        if (this.questions.length === 0) {
            return 0; 
          }
          const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
          return totalDifficulty / this.questions.length;
        }
       
    
}