class Quiz {
    // YOUR CODE HERE:

    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
       
    }
    
    // 2. getQuestion()
    getQuestion () {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex ++;
    }
    
    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));
            
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
          }
          return this.questions;
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
        
        //should increase correctAnswers by 1 when called with a correct answer for the current question
        return this.correctAnswers ++;
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return true;
        } else if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
    }

    //DAY 2:
    filterQuestionsByDifficulty(difficulty){
        if( typeof difficulty !== 'number') {
            return "Wrong datatype"
        }

        if(difficulty < 1 || difficulty > 3){
            return "There are only 3 difficulties"
        }
        this.questions = this.questions.filter(function(question) {
            return question.difficulty === difficulty;
        });
        return this.questions;
    }

    averageDifficulty() {

       let result =  this.questions.reduce(function(accum,question){
        return accum += question.difficulty;
        },0);
 
        return result/this.questions.length;
    }

    
}



//FOR TESTING 
const questions = [
    {
      text: "Question 1",
      choices: ["a", "b", "c"],
      answer: "a",
      difficulty: 1,
    },
    {
      text: "Question 2",
      choices: ["d", "e", "f"],
      answer: "d",
      difficulty: 2,
    },
    {
      text: "Question 3",
      choices: ["g", "h", "i"],
      answer: "g",
      difficulty: 2,
    },
    {
      text: "Question 4",
      choices: ["j", "k", "l"],
      answer: "j",
      difficulty: 3,
    },
  ];

const quiz = new Quiz(questions, 10, 10)

console.log(quiz.averageDifficulty());