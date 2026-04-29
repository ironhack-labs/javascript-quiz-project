class Quiz {
  // YOUR CODE HERE:
  /// Quiz {

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
    //return currentQuestionIndex;
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    return this.currentQuestionIndex++;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    const questionShuffle = this.questions;

    for (let k = questionShuffle.length - 1; k > 0; k--) {
      const m = Math.floor(Math.random() * (k + 1));

      // swap elements
      let temp1 = questionShuffle[k];
      questionShuffle[k] = questionShuffle[m];
      questionShuffle[m] = temp1;
    }

    return questionShuffle;
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
      return this.correctAnswers++;
    }
  }
  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex >= this.questions.length) {
      return true;
    } else {
      return false;
    }
  }

  // 7. filterQuestionsByDifficulty()
  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
      return;
    }

    // filter and update questions
    this.questions = this.questions.filter((question) => {
      return question.difficulty === difficulty;
    });
  }
  //let filterQuestion = this.questions.filter((eachDifficulty) => {
  // return eachDifficulty.difficulty >= 1 && eachDifficulty.difficulty <= 3;
  // });
  //return filterQuestion === difficulty;
  //this.questions.push(eachDifficulty.difficulty);
  ///return filterQuestion;

  //if (difficulty => 1 || difficulty =< 3) {
  ////return "difficulty must be a number between 1 and 3";
  //}
  // this.questions.filter((question) => {
  //question.difficulty === difficulty);
  //}

  averageDifficulty() {
    let sum = this.questions.reduce(
      (total, question) => total + question.difficulty,
      0,
    );
    let average = sum / this.questions.length;
    return average;
  }
}
