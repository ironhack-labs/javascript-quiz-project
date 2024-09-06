class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining= timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    getQuestion () {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion () {
        this.currentQuestionIndex++
    }

    shuffleQuestions() {
        let array = this.questions
        for (let i=array.length-1; i>0;i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array [j]] = [array[j], array[i]];
        }
        return array;

    }
        
    
    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        else {
            return true
        }
    }
    filterQuestionsByDifficulty(difficulty){
        if (isNaN(difficulty) || difficulty < 1 || difficulty > 3) {
            return [];
          }
        this.questions = this.questions.filter(
            (element) => element.difficulty === difficulty
        )
        return this.questions;
    }
    averageDifficulty(){
        let totalDifficulty = this.questions.reduce((acc, question) => {
            return acc + question.difficulty
         }, 0)

        
        const averageDifficulty = totalDifficulty / this.questions.length
        return averageDifficulty
    }

}
    