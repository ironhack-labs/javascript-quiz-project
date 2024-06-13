
    // YOUR CODE HERE:

    class Quiz {

        constructor (questions, timeLimit, timeRemaining){
            this.questions = questions;
            this.timeLimit = timeLimit;
            this.timeRemaining = timeRemaining;
            this.correctAnswers = 0;
            this.currentQuestionIndex = 0;
        }

            getQuestion(){
                
            let currentQuestion = this.questions[this.currentQuestionIndex];

        return currentQuestion;
            }

            moveToNextQuestion(){
                
                if (typeof this.currentQuestionIndex === "number") {
                  return  this.currentQuestionIndex += 1;
                }

            }

            shuffleQuestions(){

                const shuffledQuestions = this.questions.sort((a, b) => 0.7 - Math.random());
                    return shuffledQuestions;

            }
            
            checkAnswer(answer){

                if (this.questions[this.currentQuestionIndex].answer === answer){
                    return this.correctAnswers += 1;
                }

            }

            hasEnded(){

                if (this.currentQuestionIndex < this.questions.length){
                    return false
                  }  else{
                    return true
                        }
                    }

            filterQuestionsByDifficulty(difficulty){

             
                if (difficulty > 0 && difficulty  <= 3){
                    this.questions = this.questions.filter(function(questions) {

                  return  questions.difficulty === difficulty;
                    });
             }

            } 

            averageDifficulty(){

                let sum = this.questions.reduce((sum, question) => {
             return sum + question.difficulty
                },0 );

                return sum / this.questions.length
            }

                }
            
/* In the src/Quiz.js file, implement the averageDifficulty() method.

You should use the reduce() method to sum the difficulty of all the questions and then divide the sum by the number 
of questions to get the average difficulty.

return presidentsArr.reduce((totalYears, president)=> {
  if(president.leftOffice !== null){
    totalYears += president.leftOffice - president.tookOffice;
  }
  return totalYears;
}, 0);

}

return presidentsArr.reduce((acc, president) => {
    if (president.party === "Republican"){
     acc++;
    }

return acc;
}, 0)

You should use the reduce() method to sum the difficulty of all the questions and then divide the sum by the number 
of questions to get the average difficulty.
averageDifficulty() method:

should be defined.

should be a function.

should receive no arguments.

should return the average difficulty (number) of the questions in the quiz

filterQuestionsByDifficulty(difficulty) method:

Filters the questions array by the difficulty level passed as an argument.

should be defined.

should be a function.

should receive 1 argument (difficulty - a number between 1 and 3).

should update the questions array property to contain only the questions with the specified difficulty.

should not change the questions array if the difficulty argument is not a number between 1 and 3.




class BetterClock {
  constructor() {
    this.time = 300;

    this.tickArrow = () => {
      this.time -= 1;
      console.log(this.time);
    };
  }
}

const clockB = new BetterClock();

console.log(setInterval(clockB.tickArrow, 1000)); //


Function for SetInterval




 */