class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
        
    getQuestion(){
        return this.questions[this.currentQuestionIndex]
    }
    
    moveToNextQuestion(){
        return this.currentQuestionIndex ++
    }

    shuffleQuestions(){
        for (let i = this.questions.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer) {
        const theQuestion = this.getQuestion();
        if (!theQuestion) return false;
        const correct = theQuestion.answer === answer;
        if (correct) this.correctAnswers ++;
        return correct;
    }
    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }
    filterQuestionsByDifficulty(difficulty){
        if(typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
            return;
        }

        this.questions = this.questions.filter(question => {
            return question.difficulty === difficulty;
        });    
    }  

    averageDifficulty() {

        const totalDifficulty = this.questions.reduce((x, question) => x + question.difficulty, 0)
    
        return totalDifficulty / this.questions.length
    }
    

}
    
    