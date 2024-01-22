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
      this.currentQuestionIndex++;
    }
    shuffleQuestions() {
        for (let i = 0; i < this.questions.length; i++) {
      let randomQuestion = Math.floor(Math.random() * this.questions.length);
      [this.questions[i], this.questions[this.questions]] = [
        this.questions[randomQuestion],
        this.questions[i],
      ];
    }

    }
    checkAnswer(answer) {
        if (this.answer === this.choice) {
            this.correctAnswers++

        }
    }
    hasEnded() {
      if (this.currentQuestionIndex < this.questions.length) {
        return false;
      } else if (this.currentQuestionIndex == this.questions.length) {
        return true;
      }
    }
  }