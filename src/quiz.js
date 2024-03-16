class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
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
    return this.questions[this.currentQuestionIndex++];
  }

  // 4. shuffleQuestions()

  shuffleQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      let j = Math.floor(Math.random() * this.questions.length);

      let temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }

    return this.questions;
  }

  // 5. checkAnswer(answer)

  checkAnswer(answer) {

    let  currentQuestion = this.questions[this.currentQuestionIndex]
    if (answer ===  currentQuestion.answer) {
      this.correctAnswers++;
    }
    return this.correctAnswers
  }
    
  // 6. hasEnded()

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else return true; 

}

}
// Day 1 Tasks

// https://my.ironhack.com/cohorts/64f9d687e359e5002a77a120/lms/courses/course-v1:IRONHACK+WDPT+202402_RMT/modules/ironhack-course-chapter_5/units/ironhack-course-chapter_5-sequential_1-vertical_1

// hasEnded() method

// Returns true if the quiz has ended (the last question has been answered), and false otherwise.

//     should be defined.

//     should be a function.

//     should receive no arguments.

//     should return false when currentQuestionIndex is less than the questions array length

//     should return true when currentQuestionIndex is equal to the questions array length

// Research Tasks:

//     Watch the video “What is THIS in JavaScript? in 100 seconds” (est. time ~7 min).
//     Read the lesson “JS | Special keyword - this” on the Student Portal (est. time ~45 min).
