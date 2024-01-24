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
        for(let i = this.questions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
            }
    }

    checkAnswer(answer) {
      this.correctAnswers++;

    }

    hasEnded() {
    if(this.currentQuestionIndex < this.questions.length){
    return false;
    }else{
    return true;
    }

    }

    filterQuestionsByDifficulty(difficulty) {  // number 
      if (difficulty >= 1 && difficulty <= 3) {
      const filteredDifficulty = this.questions.filter(function(element){
      return element.difficulty === difficulty;   
      });
      this.questions = filteredDifficulty;
      return filteredDifficulty; 
  }  else {
    return this.questions; // Return the original questions array if the difficulty is not between 1 and 3
  }
}


    averageDifficulty() {
    const totalDifficulty = this.questions.reduce((accumulator, question) => {
      // Accumulate the total difficulty by adding the difficulty of each question to the accumulator
      return accumulator + question.difficulty;
    }, 0);

    const average = totalDifficulty / this.questions.length;
    return average;
    
  }
}
