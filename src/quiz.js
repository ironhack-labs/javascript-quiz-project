class Quiz {
  // YOUR CODE HERE:
  //
  constructor (questions, timeLimit, timeRemaining) {
    this.questions = questions
    this.timeLimit = timeLimit
    this.timeRemaining = timeRemaining
    this.correctAnswers = 0
    this.currentQuestionIndex = 0
  }

  getQuestion () {
    return this.questions[this.currentQuestionIndex]
  }

  moveToNextQuestion () {
    this.currentQuestionIndex += 1
  }

  shuffleQuestions () {
    for (let i = 0; i < this.questions.length - 1; i++) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i]
      ]
    }
  }

  checkAnswer (answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1
    }
  }

  hasEnded () {
    return this.currentQuestionIndex >= this.questions.length
  }
  filterQuestionsByDifficulty (difficulty) {
    if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
      return
    }

    this.questions = this.questions.filter(
      question => question.difficulty === difficulty
    )
  }
  averageDifficulty () {
    let total = this.questions.reduce((acc, cu) => {
      return acc + cu.difficulty
    }, 0)
    return total / this.questions.length
  }
}
// Example questions array
const questions = [
  { question: 'What is 2 + 2?', answer: '4', difficulty: 1 },
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
    difficulty: 2
  },
  { question: 'What is the square root of 144?', answer: '12', difficulty: 3 },
  {
    question: 'What is the chemical symbol for water?',
    answer: 'H2O',
    difficulty: 2
  },
  { question: 'Who wrote "Hamlet"?', answer: 'Shakespeare', difficulty: 3 }
]
const quiz = new Quiz(questions, 10, 10)
console.log('All questions:', quiz.questions)
