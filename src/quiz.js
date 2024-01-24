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
          let randomQuestionIndex = Math.floor(Math.random() * this.questions.length);
          [this.questions[i], this.questions[randomQuestionIndex]] = [this.questions[randomQuestionIndex], this.questions[i]];
      }
  }
  
    checkAnswer(answer) {
        if (this.getQuestion().answer === answer) {
            this.correctAnswers++;

        }
    }
    hasEnded() {
      if (this.currentQuestionIndex < this.questions.length) {
        return false;
      } else if (this.currentQuestionIndex == this.questions.length) {
        return true;
      }
    }
    filterQuestionsByDifficulty(difficulty) {
      if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
        return this.questions.filter(function (question) {
          return question.difficulty === difficulty;
        });
      } else {
       
        return this.questions;
      }
    }
    averageDifficulty(){
      let answer = this.questions.reduce(function(accumulator, question) {
        return accumulator + question.difficulty
      },0);
      return answer / this.questions.length;
    }

  }

  