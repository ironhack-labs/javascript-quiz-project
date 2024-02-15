class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    } // end of constructor
    
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    } // end of gotQuestion method
    
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
        return this.currentQuestionIndex;

    } // end of moveToNextQuestion method

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1)); 
              [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; 
            } 
            return this.questions; 
    } // end of shuffleQuestions

    checkAnswer(answer) {
        console.log("Checking ===>", answer, this.questions[this.currentQuestionIndex].answer)
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            console.log("CORRECT!!!!")
         this.correctAnswers += 1;
        }

    } // end of checkAnswer
    
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    } //end of hasEnded
    
    filterQuestionsByDifficulty(difficulty) {
        if (difficulty > 0 && difficulty <= 3){
            const filteredQuestions = this.questions.filter(question => {
                return question.difficulty === difficulty
            })
            return filteredQuestions
        } else {
            return this.questions
        }
    } // end of filterQuestionsByDifficulty method

    averageDifficulty(){
        let difficultySum = this.questions.reduce((acc, curr) => { 
            return (acc + curr.difficulty)

        },0)

        return difficultySum / this.questions.length

    } // end of averageDifficulty
} // end of Quiz class
