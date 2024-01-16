class Quiz {
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
    const newQuestions = this.questions.slice();
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.questions[i];
      newQuestions[i] = this.questions[j];
      newQuestions[j] = temp;
    }
    this.questions = newQuestions;
    return this.questions;
  }

  checkAnswer(answer) {
    let currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    let hasEnded = false;
    if (this.currentQuestionIndex === this.questions.length) {
      hasEnded = true;
    }
    return hasEnded;
  }

  filterQuestionsByDifficulty(difficulty) {
      let difficultyArr = [];
      if(difficulty >= 1 || difficulty <= 3) {
        console.log("entrei")
      difficultyArr = this.questions.filter((question) => 
        question.difficulty === difficulty);
      } else {
        difficultyArr = this.questions;
      }

      return difficultyArr;
    }

    averageDifficulty() {
      if (this.questions.length === 0) {
        return 0;
      }
      const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
      const average = totalDifficulty / this.questions.length;
  
      return average;
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

// Instantiate a new Quiz object with the test questions
const quiz = new Quiz(questions, 60, 60);

console.log(quiz.filterQuestionsByDifficulty(1));

/* hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
}
} */
