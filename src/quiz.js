class Quiz {
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
    for (let i = this.questions.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * this.questions.length);
      [this.questions[i], this.questions[random]] = [
        this.questions[random],
        this.questions[i],
      ];
    }
    return this.questions;
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) return false;
    return true;
  }

  // filterQuestionsByDifficulty()
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty == 1 || difficulty == 2 || difficulty == 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty == difficulty
      );
    }
  }

  // averageDifficulty()
  averageDifficulty() {
    return (
      this.questions.reduce((sum, question) => sum + question.difficulty, 0) /
      this.questions.length
    );
  }
}

// const questions = [
//   {
//     text: "Question 1",
//     choices: ["a", "b", "c"],
//     answer: "a",
//     difficulty: 1,
//   },
//   {
//     text: "Question 2",
//     choices: ["d", "e", "f"],
//     answer: "d",
//     difficulty: 2,
//   },
//   {
//     text: "Question 3",
//     choices: ["g", "h", "i"],
//     answer: "g",
//     difficulty: 2,
//   },
//   {
//     text: "Question 4",
//     choices: ["j", "k", "l"],
//     answer: "j",
//     difficulty: 1,
//   },
//   {
//     text: "Question 5",
//     choices: ["m", "n", "o"],
//     answer: "m",
//     difficulty: 3,
//   },
// ];

// const quiz1 = new Quiz(questions, 60, 0, 0, 0);
// console.log(quiz1.averageDifficulty());
