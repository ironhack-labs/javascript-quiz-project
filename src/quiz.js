class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
    // 2. getQuestion()
    getQuestion(){
        console.log(this.questions[this.currentQuestionIndex])
        return this.questions[this.currentQuestionIndex]
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
          }
        return
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (answer) {
            this.correctAnswers++
        }
    }
    // 6. hasEnded()
    hasEnded() {
        console.log(this.questions.length)
        if (this.currentQuestionIndex === this.questions.length){
            return true
        } else {
            return false
        }
    }
}


// const myQuiz1 = new Quiz(["Question 1:...", "Question 2:...", "Question 3:..." ,"Question 4:..." ], 60, 60)

// myQuiz1.getQuestion()
// myQuiz1.checkAnswer("my Answer")
// myQuiz1.hasEnded()
