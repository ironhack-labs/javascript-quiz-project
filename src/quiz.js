class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
   
    getQuestion(){
      return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion(){
        return this.currentQuestionIndex += 1;
    }

    shuffleQuestions(){
        let randomQuestion = [];
        for(let i=this.questions.length - 1; i > 0; i--){
            const randomizer = Math.floor(Math.random()*(i+1));
            randomQuestion.push([this.questions[i],this.questions[randomizer]]=[this.questions[randomizer],this.questions[i]])
        }
        return randomQuestion;
    }

    checkAnswer(answer){
        if(answer === this.getQuestion().answer){
            this.correctAnswers += 1;
        }
    }

    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false
        }else if (this.currentQuestionIndex === this.questions.length){
            return true
        }

    }

    filterQuestionsByDifficulty(difficulty){

          if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
             return;
                }

            this.questions = this.questions.filter(
                question => question.difficulty === difficulty
            );
                }


    averageDifficulty(){

        const sum = this.questions.reduce((acc, question) =>{
            return acc + question.difficulty;

        },0);
        return sum/ this.questions.length
            
    }
     
}
