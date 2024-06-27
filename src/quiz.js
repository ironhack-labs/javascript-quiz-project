class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
constructor(questions, timeLimit, timeRemaining){
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0
}
    // 2. getQuestion()
    getQuestion(){
        return this.questions[this.currentQuestionIndex]
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
        this.currentQuestionIndex++
    }
    // 4. shuffleQuestions()
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; 
          } 
          return this.questions;
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer){
        //saca el array con todas las preguntas //this.questions
        //elige el elemento de ahora //[this.currentQuestionIndex]
        //y elige la respuesta // .answer
        if(answer == this.questions[this.currentQuestionIndex].answer){
            this.correctAnswers++
        }
    }
    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex<this.questions.length){
            return false
        }else{
            return true
        }
    }
    //6. filterQuestionByDifficulty()
    filterQuestionsByDifficulty(difficultyNumber){
        
        if (difficultyNumber !== 1 && difficultyNumber !== 2 && difficultyNumber !== 3){
            return
        }

         let busqueda = this.questions.filter((e)=>{

            return e.difficulty === difficultyNumber
        })
       

        this.questions = busqueda
    }

    //7. averageDifficulty()
    averageDifficulty(){

        
        let suma= this.questions.reduce((acc, e)=>{

            return acc += e.difficulty

        }
        
         ,0)

         return suma / this.questions.length
    }


}
    

