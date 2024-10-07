class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
    this.timer = null;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    let currentIndex = this.questions.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      let temp = this.questions[currentIndex];
      this.questions[currentIndex] = this.questions[randomIndex];
      this.questions[randomIndex] = temp;
    }
    return this.questions;
  }

  checkAnswer(answer) {
    this.getQuestion().answer === answer ? this.correctAnswers++ : null;
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    difficulty > 0 && difficulty <= 3
      ? (this.questions = this.questions.filter(
          (question) => question.difficulty === difficulty
        ))
      : "Invalid difficulty level";
  }

  averageDifficulty() {
    return (
      this.questions
        .reduce((acc, question) => acc + question.difficulty, 0)
        .toFixed(1) / this.questions.length
    );
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeRemaining === 0) {
        this.stopTimer();
        this.hasEnded();
      } else {
        this.timeRemaining--;
        console.log("Time remaining:", this.timeRemaining);
        document.getElementById("timeRemaining").innerText = this.timeRemaining;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
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
    difficulty: 3,
  },
];

// Create a new Quiz instance object
const quiz = new Quiz(questions, 60, 100);
