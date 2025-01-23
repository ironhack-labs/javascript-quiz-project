class Quiz {
    // YOUR CODE HERE:
    //
    constructor(questions, timeLimit, timeRemaining) {
        // array of Question objects
        this.questions = questions;
        // numbers
        this.timeLimit = timeLimit;
        // numbers
        this.timeRemaining = timeRemaining;

        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    };

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    };

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    };

    shuffleQuestions() {
        // shuffles the lsit of questions in quiz
        for (let i = this.questions.length - 1; i >= 0; i--) {
            let rand = Math.floor(Math.random() * i + 1);
            [this.questions[i], this.questions[rand]] = [this.questions[rand], this.questions[i]]
        }
    }

    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        return true;
    }

    filterQuestionsByDifficulty(diff){
        if([1,2,3].includes(diff)){            
            this.questions = this.questions.filter(el=>el.difficulty === diff);
            return this.questions;
        }
    }

    averageDifficulty() {
        const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);

        return totalDifficulty / this.questions.length;
    }
}


