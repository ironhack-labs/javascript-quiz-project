class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining) {
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
        this.currentQuestionIndex += 1;
    }

    shuffleQuestions() {
        for (let i = this.questions.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];    
        }
        return this.questions;
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (currentQuestion.answer ===  answer) {
            this.correctAnswers++;
        } ;
    }

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length) {
            return false;
        } else {
            return true;
        };

    };

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty < 3 || difficulty > 1) {
            return this.questions = this.questions.filter((question) => {
                return question.difficulty === difficulty
            })
        }
    }

    averageDifficulty() {
        const total = this.questions.reduce((acc, currentQuestion) => {
            return acc + currentQuestion.difficulty;
        }, 0);

        const average = (total / this.questions.length)

        return average
    }
}


//console.log(quiz.averageDifficulty())