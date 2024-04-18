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
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    let oldElement;
    for (let i = this.questions.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = this.questions[i];
      this.questions[i] = this.questions[rand];
      this.questions[rand] = oldElement;
    }
    return this.questions;
}
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    console.log(answer)
    console.log(currentQuestion.answer)
    if (answer === currentQuestion.answer){
    this.correctAnswers++}
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
        return true
    } else if (this.currentQuestionIndex < this.questions.length) {
    return false
  }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty > 1 && difficulty <= 3) {
      this.questions = this.questions.filter(question => question.difficulty === difficulty)
    }
  }

  averageDifficulty() {
    const sumDifficulty = this.questions.reduce((acc, question) => 
      acc + question.difficulty, 0);
      return sumDifficulty / this.questions.length;
    }
  }


/* Fisher Yates Shuffle :

const shuffle = (this.questions) {
  let oldElement;
  for (let i = this.questions.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = this.questions[i];
    this.questions[i] = this.questions[rand];
    this.questions[rand] = oldElement;
  }
  return this.questions;} */


