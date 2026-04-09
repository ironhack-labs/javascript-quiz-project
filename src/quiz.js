class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. getQuestion()
  // should return the item from the questions array at the position of currentQuestionIndex
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  //should increment the currentQuestionIndexby1
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  //should shuffle the items in the questions array.
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  // 5. checkAnswer(answer)
  //should increase correctAnswers by 1 when called with a correct answer for the current question
  // ask Jorge what is this ??
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  //should return false when currentQuestionIndex is less than the questions array length
  //should return true when currentQuestionIndex is equal to the questions array length
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if ((this.currentQuestionIndex = this.questions.length)) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter((element) => {
        return element.difficulty === difficulty;
      });

   return this.questions
    } }




    averageDifficulty() {
       
        const total = this.questions.reduce((sum,element)=> {
         return sum + element.difficulty
        },0)

        return total / this.questions.length
    }

}
