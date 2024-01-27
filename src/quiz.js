class Quiz {

    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    moveToNextQuestion() {
        return this.currentQuestionIndex += 1;
    }

    shuffleQuestions() {
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        return shuffle(this.questions);
    }

    checkAnswer(answer) { // should increase 'correctAnswers' by 1 when a correct answer is passed as an argument
        const question = this.getQuestion()
        const isCorrectAnswer = question.answer === answer
        if (isCorrectAnswer) {
            this.correctAnswers++
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        else {
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty) {

        if (difficulty >=1 && difficulty <=3 ){
        const dif1 = this.questions.filter((question) => {
            
            return question.difficulty === difficulty;
        });
     return this.questions = dif1;
    }
}

    averageDifficulty() {
        
        const totalDifficulty = this.questions.reduce((accumulator, question) => {
            return accumulator + question.difficulty;
        },0);
    
        return totalDifficulty / this.questions.length;
    }
}


