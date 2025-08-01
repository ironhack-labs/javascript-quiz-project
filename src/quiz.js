class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions.slice(0);
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    let currentQuestion = this.questions[this.currentQuestionIndex];
    let correctAnswerOfCurrentQuestion = currentQuestion.answer;

    if (correctAnswerOfCurrentQuestion === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      // this.currentQuestionIndex >= this.questions.length
      return true;
    }
    // return (this.currentQuestionIndex >= this.questions.length);
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty <=3 && difficulty >=1) {
      const diffQuestions = this.questions.filter((question) => {
        //console.log(difficulty, question.difficulty, question.difficulty === difficulty);
        return question.difficulty === difficulty;
      });
      //console.log (diffQuestions)
      this.questions = diffQuestions;
    }
  }

  averageDifficulty(){
    console.log(this.questions)
    const sumDifficulty = this.questions.reduce((acc, element) => {

      return acc + element.difficulty

    },0);
    let avg = sumDifficulty / this.questions.length

 console.log(sumDifficulty)   
    return avg

  }


}



