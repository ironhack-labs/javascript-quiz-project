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
        this.currentQuestionIndex += 1;
    }

    shuffleQuestions(){
        for(let i=0; i<this.questions.length; i++){
            let j = Math.floor(Math.random()*(i+1));
            let tempVar = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = tempVar;
        }
        return this.questions
    }

    /* Doesn't check the answer, only increments the amount of 
    correct answers */
    checkAnswer(answer){
        const question = this.getQuestion()
        const correctAnswers = question.answer === answer
        if(correctAnswers){
            this.correctAnswers ++
        } 
    }

    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false;
        }
        else if(this.currentQuestionIndex === this.questions.length){
            return true
        }
    }

    filterQuestionsByDifficulty(difficulty){
        let filtered = this.questions.filter((question)=>{
            return question.difficulty === difficulty
        })
        return filtered
    }

    averageDifficulty(){
        let result = this.questions.reduce((total, question) => {
            let newTotal = total + question.difficulty
            return newTotal
        },0)
        let average = result / this.questions.length
        return average
    }
}


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
  let quiz = new Quiz(questions, 3, 4);
  let array1 = quiz.filterQuestionsByDifficulty(2);
  console.log(array1)

console.log(quiz.averageDifficulty());

