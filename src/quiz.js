
class Quiz {
    // YOUR CODE HERE:

        constructor (questions, timeLimit, timeRemaining){
            this.questions=questions;
            this.timeLimit=timeLimit;
            this.timeRemaining=timeRemaining;
            this.correctAnswers=0;
            this.currentQuestionIndex=0;
        }
       getQuestion(){
           return this.questions[this.currentQuestionIndex]
       } 
       moveToNextQuestion(){
          return this.currentQuestionIndex+=1
       }
       shuffleQuestions(){
           for (let i =this.questions.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
              [this.questions[i],this.questions[j]] = [this.questions[j],this.questions[i]];
           }
           return this.questions;
       }
       checkAnswer(answer){
         if(answer===this.getQuestion().answer){
            this.correctAnswers+=1
         }
       }

       hasEnded(){
          if(this.currentQuestionIndex<this.questions.length){
            return false
          }else{
            return true
          }
       }

       filterQuestionsByDifficulty(difficulty){
        
        if( typeof difficulty==="number" && difficulty >= 1 && difficulty <= 3){
          this.questions = this.questions.filter((eachElement) => {
          return eachElement.difficulty===difficulty
          })
        }else{
          return this.questions
        }
      }
      averageDifficulty(){
        let sumDifficulty= this.questions.reduce((acc,element)=>{
          return acc+element.difficulty
        },0)
        return sumDifficulty/this.questions.length
      }
}
