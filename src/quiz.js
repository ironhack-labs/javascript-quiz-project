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
    return this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    return this.questions.sort(() => Math.random() - 0.5);
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer)
      return this.correctAnswers++;
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) return false;
    if (this.currentQuestionIndex === this.questions.length) return true;
  }

  // 7. filterQuestionsByDifficulty()
  filterQuestionsByDifficulty(difficulty) {
    // Check if difficulty is a number between 1 and 3
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
      return; // Exit without modifying the array
    }

    // If valid difficulty, filter the questions
    this.questions = this.questions.filter(
      (question) => question.difficulty === difficulty
    );
  }

  // 8. averageDifficulty()

  averageDifficulty() {
    let sum = this.questions.reduce((acc, cur) => acc + cur.difficulty, 0);
    return sum / this.questions.length;
  }

  resetQuiz() {
    // Reset the current question index to 0
    this.currentQuestionIndex = 0;
    // Reset the correct answers count
    this.correctAnswers = 0;
    // Reset the time remaining to initial duration
    this.timeRemaining = this.duration;
    // Optionally shuffle questions again
    this.shuffleQuestions();
  }
}

// const testQuestions = ["question1", "question2", "question3"];

// // Instantiate a new Quiz object with the test questions
// const quiz = new Quiz(testQuestions, 60, 60);
// console.log(quiz.getQuestion());
// console.log(quiz.moveToNextQuestion());
// console.log(quiz.getQuestion());
// console.log(quiz.shuffleQuestions());
// console.log(quiz.shuffleQuestions());
// console.log(quiz.shuffleQuestions());

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

const quiz = new Quiz(questions, 60, 60);
console.log(quiz.averageDifficulty());
