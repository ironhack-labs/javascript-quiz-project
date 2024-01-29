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
      const currentQuestion = this.questions[this.currentQuestionIndex]; // obj{}
      if (answer === currentQuestion.answer) {
        this.correctAnswers++;
      }
    }
  
    hasEnded() {
      if (this.currentQuestionIndex < this.questions.length) {
        return false;
      } else if (this.currentQuestionIndex === this.questions.length) {
        return true;
      }
    }
  
    filterQuestionsByDifficulty(difficulty) {
      if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
        this.questions = this.questions.filter(
          (question) => question.difficulty === difficulty
        );
      }
    }
  
    averageDifficulty() {
      if (this.questions.length === 0) {
        return 0;
      }
      const questionDifficulty = this.questions.reduce(
        (accumulator, question) => {
          return accumulator + question.difficulty;
        },
        0
      );
      return questionDifficulty / this.questions.length;
    }
  }
  
  