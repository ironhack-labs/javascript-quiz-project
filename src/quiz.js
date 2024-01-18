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
    this.currentQuestionIndex += 1;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
    return this.questions;
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (typeof answer === "string") {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty === "number" && difficulty > 0 && difficulty <= 3) {
      this.questions = this.questions.filter((q) => {
        return q.difficulty === difficulty;
      });
    }
  }

  averageDifficulty() {
    const totDiff = this.questions.reduce((acc, current) => {
      return acc + current.difficulty;
    }, 0);
    // console.log(totDiff);
    return totDiff / this.questions.length;
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
//     difficulty: 3,
//   },
// ];

// const quiz = new Quiz(questions, 3, 4);
