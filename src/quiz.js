class Quiz {
  // YOUR CODE HERE:

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
    return this.questions;
  }

  checkAnswer(answer) {
    let currentQuestion = this.questions[this.currentQuestionIndex];

    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
    return answer;
  }
  hasEnded() {
    if(this.currentQuestionIndex < this.questions.length){
        return false
    }
    else {
        return true
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    // si la dificultad de la pregunta es diferente de 1, 2,3  no funciona
    if(difficulty !== 1 && difficulty !== 2 && difficulty !== 3){
      return;
    }
    let preguntasSegunSuGradoDificultad = this. questions.filter((eachQuestion) => {
      return eachQuestion.difficulty === difficulty
     
    })
     
    this.questions = preguntasSegunSuGradoDificultad;
  }

  averageDifficulty() {
    
    let mediaDeDificultad = this.questions.reduce((acc, eachD) => {
      return (acc + eachD.difficulty) 

    }, 0);
    return mediaDeDificultad / this.questions.length
  }

}

