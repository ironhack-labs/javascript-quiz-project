// YOUR CODE HERE:
//
// 1. constructor (questions, timeLimit, timeRemaining)



class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    // 2. getQuestion()

    getQuestion() {

        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {

        this.currentQuestionIndex++;

    }

    shuffleQuestions() {

        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }

    }

    checkAnswer(answer) {

        let correctAnswer = this.questions[this.currentQuestionIndex].answer;
        
        if( answer === correctAnswer) {
        
            this.correctAnswers++;
        
        };

        
    }

    hasEnded() {

        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }

        if (this.currentQuestionIndex = this.questions.length) {
            return true;
        }

    }

    filterQuestionsByDifficulty(difficulty) {

        if (difficulty < 1 || difficulty > 3) {
            return this.questions;
        }

        const dif1 = this.questions.filter((question) => {

            return question.difficulty === difficulty;

        })
        return this.questions = dif1;




    }

    averageDifficulty() {

        const arrayDif = this.questions.reduce((a, b) => {

            let count = a + b.difficulty;

            return count;

        }, 0);

        return arrayDif / this.questions.length;
    };
};