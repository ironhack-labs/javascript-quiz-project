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

    // Methods
    
    getQuestion() {

        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {

        this.currentQuestionIndex++
    }

    shuffleQuestions(){

        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer){

        // questions -> array de Questions(la otra clase) -> cuyo tercer index es la respuesta
        // si answer = correcta

        if(this.questions[this.currentQuestionIndex].answer == answer) {
            this.correctAnswers++
        }
    }

    hasEnded(){

        if(this.currentQuestionIndex < this.questions.length) {
            return false
        } else {
            return true
        }
    }

    // Day02
    filterQuestionsByDifficulty(difficulty){
       
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
        }
    }

    averageDifficulty(){

        // Verificamos si hay preguntas, y si no la hay devolvemos 0.
        if (this.questions.length === 0) {
            return 0;
        }

        // Sumamos las dificultades
        const totalDifficulty = this.questions.reduce((suma, preguntas) => {
            return suma + (preguntas.difficulty || 0);
        }, 0);

        // Calculamos el promedio y lo devolvemos
        return totalDifficulty / this.questions.length;
    }

}