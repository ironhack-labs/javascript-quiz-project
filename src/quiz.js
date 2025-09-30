
    // YOUR CODE HERE:
    class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    // 1. constructor (questions, timeLimit, timeRemaining)

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
    for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
        }

    // 5. checkAnswer(answer)
checkAnswer(answer){
    if (answer === this.getQuestion().answer) {
        this.correctAnswers++;
         return true;
         
    } else {
        return false;
    }  
}
//console.log(this.getQuestion());
         //  // logs the whole question object

        // console.log(this.getQuestion().answer); 
       // // logs just the answer value
        // console.log(this.getQuestion().question);
 //  // logs just the question text (if property exists)


    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
        }

        filterQuestionsByDifficulty(difficulty) {
            if (difficulty >= 1 && difficulty <=3) {
                this.questions = this.questions.filter(level => level.difficulty === difficulty)

            }
            }
averageDifficulty() {
    const sumAvrg = this.questions.reduce((accumlator, ques) => {
return accumlator + ques.difficulty;
    }, 0);
    return sumAvrg / this.questions.length;
}

        }
