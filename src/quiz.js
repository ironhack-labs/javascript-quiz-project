class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
      this.questions = questions;
      this.timeLimit = timeLimit;
      this.timeRemaining = timeRemaining;
      
      // Initialize additional properties with default values
      this.correctAnswers = 0;
      this.currentQuestionIndex = 0;
    }
  
    getQuestion() {
      // Return the current question based on the currentQuestionIndex
      return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion() {
      // Increment the currentQuestionIndex by 1
      this.currentQuestionIndex += 1;
    }
    
    shuffleQuestions() {
      // Create a copy of the questions array to avoid modifying the original
      const shuffled = [...this.questions];
      
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Update the questions property with the shuffled array
      this.questions = shuffled;
    }
  
    checkAnswer(answer) {
      const currentQuestion = this.getQuestion();
      
      // Check if the provided answer matches the correct answer for the current question
      if (currentQuestion && answer === currentQuestion.answer) {
        this.correctAnswers += 1;
        return true;
      }
      return false;
    }
    
    hasEnded() {
      // Check if we've reached the end of the questions
      return this.currentQuestionIndex >= this.questions.length;
    }
  
    filterQuestionsByDifficulty(difficulty) {
      // Check if difficulty is valid (between 1 and 3)
      if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
        return; // Do nothing if difficulty is invalid
      }
      
      // Filter questions by the specified difficulty
      this.questions = this.questions.filter(question => question.difficulty === difficulty);
    }
  
    averageDifficulty() {
      // If there are no questions, return 0 to avoid division by zero
      if (this.questions.length === 0) {
        return 0;
      }
      
      // Use reduce() to sum all difficulty values
      const totalDifficulty = this.questions.reduce((sum, question) => {
        return sum + question.difficulty;
      }, 0);
      
      // Calculate and return the average
      return totalDifficulty / this.questions.length;
    }
  }