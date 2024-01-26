class Quiz {
    // YOUR CODE HERE:
    
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    // 4. shuffleQuestions()
    shuffleQuestions(){
        this.questions.sort(() => Math.random() - 0.5);

    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
        // this.answer = answer;
        if (this.getQuestion().answer === answer) {
            this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false
        }else if(this.currentQuestionIndex === this.questions.length){
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty) {

        if (difficulty < 1 || difficulty > 3) { 
            return this.questions}

        const filteredQuestion = this.questions.filter(element => {
            return element.difficulty === difficulty;
        })
           return filteredQuestion;
    }
    averageDifficulty() {
        const total = this.questions.reduce(function(acc, curr) {
            return acc + curr.difficulty;
        }, 0)
            return total / this.questions.length;
    }
}