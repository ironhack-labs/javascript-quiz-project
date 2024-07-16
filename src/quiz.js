class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)

  // 2. getQuestion()

  // 3. moveToNextQuestion()

  // 4. shuffleQuestions()

  // 5. checkAnswer(answer)

  // 6. hasEnded()
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {
    const questions = this.questions; //Ease of access to questions array
    for (let i = questions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * questions.length); // Rounding down random number between 0 to length of array
      const temp = questions[i]; // storing question at given index into memory to use in reshuffle
      questions[i] = questions[j]; // setting question at index to question at random index
      questions[j] = temp; //so we don't have duplicates, setting stored temp question to the question from random index used previously
    }
    return questions;
  }

  // prettier-ignore
  checkAnswer(answer) {
    if (answer == this.questions[this.currentQuestionIndex]/*getting question from current index*/.answer/*and retrieving the answer stored within*/) {
      this.correctAnswers += 1;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length)
      return false; // if number at current index is lower than amount of questions then not done
    else if (this.currentQuestionIndex == this.questions.length) return true; //if both numbers are the same, then has ended
  }
}
