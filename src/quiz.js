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
        this.currentQuestionIndex++;
    }


    shuffleQuestions(){
        for(let i = this.questions.length -1; i >= 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
            
        }
    }


    checkAnswer(answer){
        if(answer === this.questions[this.currentQuestionIndex].answer){
            this.correctAnswers++;
        }
    }

    
     hasEnded(){
        if(this.questions.length -1 >= this.currentQuestionIndex){
            return false;
        }
        return true;
     }

     filterQuestionsByDifficulty(difficulty){

        if(difficulty >= 1 && difficulty <= 3){
            this.questions = this.questions.filter((question)=>{
                return (question.difficulty === difficulty);
   
            })
        }
     }

     averageDifficulty(){

        const totalDifficulty = this.questions.reduce(function(acc, currentValue){
            return acc + currentValue.difficulty;
        }, 0)

        return totalDifficulty/this.questions.length;
     }
}
