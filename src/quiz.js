class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining) { // we set the parameters
        this.questions = questions // array of Question objects
        this.timeLimit = timeLimit // total time for the quiz 
        this.timeRemaining = timeRemaining  // time left for the quiz
        this.correctAnswers = 0 // number of correct answers
        this.currentQuestionIndex = 0 //0 or 1 or 2 depending on which question we are.
    }

    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex]; // returns question object
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() { // increments currentQuestionIndex by 1
        return this.currentQuestionIndex++; 
    }

    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length -1; i > 0; i--) { // we do a loop to shuffle the questions
            const j = Math.floor(Math.random() * (i +1)); // random index
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; // swapping the questions
        }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex]; // we get the current question
        if (answer === currentQuestion.answer) { // we compare the prior answer with the current question's answer
            this.correctAnswers++; // if they match we increment correctAnswers by 1 with the ++ operator
        }
    }

    //*We can also write it like this:
    // checkAnswer(answer) {
    //  let rightAnswer = this.questions[this.currentQuestionIndex].answer;
    //  if (answer === rightAnswer) {
    //      this.correctAnswers++;
    //  }
    // }    




    // 6. hasEnded()
    hasEnded() {
          if (this.currentQuestionIndex < this.questions.length) { // if currentQuestionIndex is less than the length of questions array
            return false; // quiz is false (not ended)
        }
        else {
            return true; // quiz is true (ended
        }
      }
       //DAY 2: Development Tasks: 
       
    filterQuestionsByDifficulty(difficulty) {
        if (difficulty >= 1 && difficulty <= 3) { // check if difficulty is between 1 and 3
            this.questions = this.questions.filter(question => question.difficulty === difficulty); // filter questions by difficulty
        }

    }

    averageDifficulty() {
        let sum = this.questions.reduce((acc, questions) => {

        return acc + questions.difficulty;
       }, 0);

       const average = sum / this.questions.length;
       return average;

    }

    }

    
  
 
    

   







