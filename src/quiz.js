class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    } // end of constructor
    
    getQuestion() {
// return {this.currentQuestionIndex}
    } // end of gotQuestion method
    
    moveToNextQuestion() {

    } // end of moveToNextQuestion method

    shuffleQuestions() {

    } // end of shuffleQuestions

    checkAnswer(answer) {

    } // end of checkAnswer
    
    hasEnded() {

    } //end of hasEnded 
} // end of Quiz class


// getQuestion() method

// Returns the question from the questions array at the position of currentQuestionIndex.

// should be defined.
// should be a function.
// should receive no arguments.
// should return the item from the questions array at the position of currentQuestionIndex.

// moveToNextQuestion() method

// When called, increments the currentQuestionIndex by 1.

// should be defined.
// should be a function.
// should receive no arguments.
// should increment the currentQuestionIndex by 1.

// shuffleQuestions() method

// Shuffles the elements stored in the questions array of the Quiz.

// should be defined.
// should be a function.
// should receive no arguments.
// should shuffle the items in the questions array.

// checkAnswer(answer) method

// Checks if the passed answer is correct for the current question and increments correctAnswers by 1 if the answer is correct.

// should be defined.
// should be a function.
// should receive 1 argument (answer - string).
// should increase correctAnswers by 1 when called with a correct answer for the current question

// hasEnded() method

// Returns true if the quiz has ended (the last question has been answered), and false otherwise.

// should be defined.

// should be a function.

// should receive no arguments.

// should return false when currentQuestionIndex is less than the questions array length

// should return true when currentQuestionIndex is equal to the questions array length