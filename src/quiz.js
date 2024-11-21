class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions // array => the array is meant to contain Question objects
        this.timeLimit = timeLimit // number
        this.timeRemaining = timeRemaining // number
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        //should return the item from the 'questions' array at the position of 'currentQuestionIndex'
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    shuffleQuestions() {
        //should shuffle the items in the questions array
        for(let i = this.questions.length - 1; i > 0; i--) {
            // Seleccionar un indice anterior al actual de manera aleatoria
            const j = Math.floor(Math.random() * (i + 1));
            // Intercambiar las preguntas en las posiciones i y j
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer) { //string
        //should increase correctAnswers by 1 when called with a correct answer for the currect question
        if(answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++;
        }
        
    }

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length) {
            return false;
        } else if(this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty) {       
        if(difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
            return this.questions;
        }

        this.questions = this.questions.filter((eachQuestions) => {
            if(eachQuestions.difficulty === difficulty) {
                return true;
            };
        });     
    }

    averageDifficulty() {
        const sumDifficulty = this.questions.reduce((acc, question) => {
            return acc + question.difficulty;
        }, 0);

        const avgCalculated = sumDifficulty / this.questions.length;
        return avgCalculated;
    }
}