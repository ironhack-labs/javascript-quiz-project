// YOUR CODE HERE:
//
class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    questions
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;

  }
  correctAnswers = 0;
  currentQuestionIndex = 0;

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = 0; i < this.questions.length; i += 1) {
      let index = Math.floor(Math.random() * this.questions.length);
      let tmp = this.questions[i]
      this.questions[i] = this.questions[index];
      this.questions[index] = tmp;
    }
  }

  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex == this.questions.length) {
      return true;
    }
  }
  filterQuestionsByDifficulty(difficultyArg){
    if(difficultyArg >= 1 && difficultyArg <= 3){
      const filteredQuestions = this.questions.filter(function (currentQuestion){
         return currentQuestion.difficulty === difficultyArg;
      })
      this.questions = filteredQuestions;
    }
  }
  averageDifficulty(){
    const totalDifficulty = this.questions.reduce(function (accumulator, currentQuestion){
       return accumulator + currentQuestion.difficulty;
    }, 0);
    return totalDifficulty / this.questions.length;
  }
}