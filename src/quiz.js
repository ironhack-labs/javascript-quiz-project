class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        // Assigning the arguments to the respective properties
        this.questions = questions; // Array of Question objects
        this.timeLimit = timeLimit; // Total time allowed for the quiz
        this.timeRemaining = timeRemaining; // Remaining time for the quiz
    
        // Initial values
        this.correctAnswers = 0; // Initially no correct answers
        this.currentQuestionIndex = 0; // Start with the first question
      }
    // 2. getQuestion()
    // Method to return the current question
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    // Method to move to the next question
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
    }

    // 4. shuffleQuestions()
    // Method to shuffle the questions array
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; // Swap elements
        }
    } 

    // 5. checkAnswer(answer)
    // Method to check if the given answer is correct
    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (currentQuestion.answer === answer) {
        this.correctAnswers += 1; // Increment correctAnswers if the answer is correct
        }
    }

    // 6. hasEnded()
    // Method to check if the quiz has ended
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

     // Method to filter questions by difficulty
    filterQuestionsByDifficulty(difficulty) {
        if (difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter((question) => question.difficulty === difficulty);
        }
    }

    // Method to calculate the average difficulty of the questions
    averageDifficulty() {
        if (this.questions.length === 0) 
            return 0; // Avoid division by zero if there are no questions

        const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
        // reduce() method iterates through each element of the questions array.
        // The sum argument accumulates the total sum of the difficulties.
        // For each question, question.difficulty is added to sum.
        // The 0 at the end is the initial value for sum, starting the accumulation from 0.
        
        return totalDifficulty / this.questions.length;
        //Once the total difficulty is calculated, it divides this value by the number of questions to get the average difficulty.
  }
}
