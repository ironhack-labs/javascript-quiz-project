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
            return this.currentQuestionIndex += 1; 
        }
        
        shuffleQuestions(){
            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
              }
              return shuffle(this.questions);
        }

        checkAnswer(answer){ // should increase 'correctAnswers' by 1 when a correct answer is passed as an argument
        return this.correctAnswers += 1;

        }

        hasEnded(){
            if (this.currentQuestionIndex < this.questions.length){
                return false;
            }
            else {
                return true;
            }
        }
}