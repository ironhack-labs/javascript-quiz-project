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
    //code here
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    //code here
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    //code here
    return this.questions.sort((a, b) => 0.5 - Math.random());
  }

  checkAnswer(answer) {
    const expectedAnswer = this.getQuestion().answer;
    if (answer === expectedAnswer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    //code here
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
    return false;
  }

  filterQuestionsByDifficulty(difficultyArg) {
    //code goes here
    if (
      difficultyArg < 1 ||
      difficultyArg > 3 ||
      typeof difficultyArg !== 'number'
    ) {
      return undefined;
    }
    return this.questions.filter((x) => x.difficulty === difficultyArg);
  }

  reset(quizDuration) {
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.shuffleQuestions();
    this.timeRemaining = quizDuration;
  }
  //AVERAGE DIFFIULTY

  averageDifficulty() {
    //step 1 AVG
    // const sumOfDifficulty = this.questions.reduce(
    //   (accumulator, current) => accumulator + current.difficulty,
    //   0
    // );

    //step 2 Divided by length
    // const avDifficulty = sumOfDifficulty / this.questions.length ;

    //step 3 return avDifficultu
    //return avDifficulty

    return (
      this.questions.reduce(
        (accumulator, current) => accumulator + current.difficulty,
        0
      ) / this.questions.length
    );
  }
}
// === END OF OBJECT

// TESTING -------

const questions = [
  {
    text: 'Question 1',
    choices: ['a', 'b', 'c'],
    answer: 'a',
    difficulty: 1,
  },
  {
    text: 'Question 2',
    choices: ['d', 'e', 'f'],
    answer: 'd',
    difficulty: 2,
  },
  {
    text: 'Question 3',
    choices: ['g', 'h', 'i'],
    answer: 'g',
    difficulty: 2,
  },
  {
    text: 'Question 4',
    choices: ['j', 'k', 'l'],
    answer: 'j',
    difficulty: 3,
  },
];

const quiz = new Quiz(questions, 60, 60);

console.log(quiz.questions[0].answer);
