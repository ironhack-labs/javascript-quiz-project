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
    // this.randomQuestion = this.choices[Math.floor(Math.random * this.choices.length)];
    for (let i = this.questions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer)
      this.correctAnswers++;
  }

  // shorter version with new syntax
  // this.questions[this.currentQuestionIndex === answer].answer && this.correctAnswers++

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) return false;
    return true;
  }

  // Day2
  filterQuestionsByDifficulty(difficulty) {
    //if (isNaN(this.difficulty)) return;
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 3) {
      return [];
    }

    // Filter questions based on difficulty
    this.questions = this.questions.filter(
      (element) => element.difficulty === difficulty
    );

    return this.questions;
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.difficulty,
      0
    );

    return totalDifficulty / this.questions.length;
  }
}
