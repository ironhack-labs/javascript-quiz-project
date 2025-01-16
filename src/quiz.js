class Quiz {
  // YOUR CODE HERE:
  //
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
    return this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    if (this.questions.some((question) => question.answer === answer)) {
      this.correctAnswers++;
    }
  }
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) return false;
    if (this.currentQuestionIndex === this.questions.length) return true;
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number")
      return this.questions;

    this.questions = this.questions.filter(
      (question) => question.difficulty === difficulty
    );
    return this.questions;
  }
  averageDifficulty() {
    // const avgDiff = this.questions.reduce((acc, curr) => {
    //   console.log(
    //     "this is accumulator ::",
    //     acc,
    //     "this is currentValue ::",
    //     curr.difficulty
    //   );
    //   return acc + curr.difficulty;
    // }, 0);
    // return avgDiff / this.questions.length;

    const avgDiff = this.questions.reduce((acc, curr, index) => {
      // The first "if" only applies when we reach the last index. Otherwise it returns acc + curr.difficulty
      if (index === this.questions.length - 1)
        return (acc + curr.difficulty) / this.questions.length;
      return acc + curr.difficulty;
    }, 0);
    return avgDiff;
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
const quiz = new Quiz(questions, "test", 60);
console.log("this is average difficulty::", quiz.averageDifficulty());
