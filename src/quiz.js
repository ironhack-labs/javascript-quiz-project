class Quiz {
    // YOUR CODE HERE:
    constructor(questions,timeLimit,timeRemaining) {

    this.questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    ];
    // 1. constructor (questions, timeLimit, timeRemaining)

        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    // 2. getQuestion()
     getQuestion() {

       return this.questions[this.currentQuestionIndex];

    }
    
    // 3. moveToNextQuestion()
    
      moveToNextQuestion() {

     this.currentQuestionIndex++;
}

    // 4. shuffleQuestions()
    shuffleQuestions() {
         let currentIndex = this.questions.length - 1;

    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
       
        [this.questions[currentIndex], this.questions[randomIndex]] = 
        [this.questions[randomIndex], this.questions[currentIndex]];

         currentIndex--; 
    }
    /* return this.questions; */
    }

  

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
      if (answer === this.getQuestion().answer) {
        this.correctAnswers++;
      }

    }

    // 6. hasEnded()

    hasEnded() {
      
  return this.currentQuestionIndex >= this.questions.length;

 }
        
    
    // 7. filterQuestionsByDifficulty(difficulty)

    filterQuestionsByDifficulty(difficulty) {
      if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
    }
  }


  // averageDifficulty()

   averageDifficulty() {

     if (this.questions.length === 0) return 0;

    const total = this.questions.reduce((acc, q) => {
      return acc + q.difficulty;
    }, 0);
    return  total / this.questions.length;
   }
   
    
}