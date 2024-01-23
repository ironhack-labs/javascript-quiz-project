class Quiz {
    // YOUR CODE HERE:
    
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {

        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }

    // 4. shuffleQuestions()
    shuffleQuestions(){
        this.questions.sort(() => Math.random() - 0.5);

    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
        this.answer = answer;
        if (this.answer){
            this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false
        }else if(this.currentQuestionIndex === this.questions.length){
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty) {
    //    this.difficulty = difficulty;
        const filteredQuestion = this.questions.filter(function(element) {
            return element.difficulty === difficulty;
        })
           return filteredQuestion;
    }
    averageDifficulty(){
        const average = this.questions.reduce(function(acc, curr) {
            console.log( curr)
            return (acc + curr.difficulty) / curr.length 
        }, 0)
          //  return average;
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
          difficulty: 3,
        },
      ];
const test = new Quiz(questions, 60, 60)
// console.log(questions.averageDifficulty())
