class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
    // 2. getQuestion()
    getQuestion(){
        console.log(this.questions[this.currentQuestionIndex])
        return this.questions[this.currentQuestionIndex]
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
          }
        return
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (answer) {
            this.correctAnswers++
        }
    }
    // 6. hasEnded()
    hasEnded() {
        console.log(this.questions.length)
        if (this.currentQuestionIndex === this.questions.length){
            return true
        } else {
            return false
        }
    }
    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty === "string") { 
            return this.questions
        }

        const checkDifficutly = this.questions.filter(function(element){
            return element.difficulty === difficulty
        })
        
        return checkDifficutly
    }

    averageDifficulty() {
        const avDiff = this.questions.reduce((acc, cuVal) =>{
            // console.log((acc + cuVal.difficulty) / this.questions.length)
            return (acc + cuVal.difficulty)
        }, 0);

        return avDiff / this.questions.length
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
      difficulty: 1,
    },
    {
      text: "Question 5",
      choices: ["m", "n", "o"],
      answer: "m",
      difficulty: 3,
    },
  ];


// const myQuiz1 = new Quiz(["Question 1:...", "Question 2:...", "Question 3:..." ,"Question 4:..." ], 60, 60)
const myQuiz1 = new Quiz(questions, 60, 60)
// console.log(myQuiz1)
const result = myQuiz1.averageDifficulty()
console.log(result)


// console.log(typeof myQuiz1.filterQuestionsByDifficulty)

// myQuiz1.getQuestion()
// myQuiz1.checkAnswer("my Answer")
// myQuiz1.hasEnded()
