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
        return this.questions[this.currentQuestionIndex]
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
        this.currentQuestionIndex++;
        return this.questions[this.currentQuestionIndex];
    }

    // 4. shuffleQuestions()
    shuffleQuestions(){
      this.questions =  this.questions.reduce((shuffledArr, item)=>{
      
        let index = Math.floor(Math.random()*shuffledArr.length +1 )
        shuffledArr.splice(index,0,item )
        return shuffledArr

      },[])


    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
     if ( answer === this.questions[this.currentQuestionIndex].answer){
      
      this.correctAnswers++
      
     }

    }

    // 6. hasEnded()
    hasEnded(){
      if (this.currentQuestionIndex < this.questions.length ){ return false

      }else if ( this.currentQuestionIndex == this.questions.length){

         return true 
      }

    }


    filterQuestionsByDifficulty(difficulty){
       



     if ( typeof difficulty != "number" || difficulty < 1 || difficulty > 3 )return ;
      
      

      this.questions = this.questions.filter((item)=>{
         return item.difficulty === difficulty

        })
    
    
    }


   averageDifficulty(){
     const summ = this.questions.reduce((currentDifficulty, question )=>{
      currentDifficulty += question.difficulty 
 

      console.log(currentDifficulty)
      return currentDifficulty 
    },0)
 console.log(summ)
     let average =  summ / this.questions.length

     return average 

   }


}


