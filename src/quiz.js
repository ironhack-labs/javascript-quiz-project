class Quiz {
    // 1. Constructor that accepts questions array, timeLimit, and timeRemaining
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;        // Initial correct answers set to 0
        this.currentQuestionIndex = 0;
    }

    // 2. Method to get the current question
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    // 3. Method to move to the next question
    moveToNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        } 
        return false;
    }

    // 4. Method to shuffle the questions
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    // 5. Method to check if the answer is correct and update correctAnswers
    checkAnswer(answer) {
        if (this.questions[this.currentQuestionIndex].answer === answer) {
            this.correctAnswers++;
            return true;
        }
        return false;
    }

    // 6. Method to check if the quiz has ended
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    //7. Method to filter the questions by difficulty
    filterQuestionsByDifficulty(difficulty) {
        let result = this.questions.filter((question)=> question.difficulty = difficulty);
        return result;
    }

    //8. Method to calculate the average difficulty 
    averageDifficulty() {
        const initialDifficulty = 0;
        const totalDifficulty = this.questions.reduce(
            (accumulator, currentValue) => accumulator + currentValue.difficulty, 
            initialDifficulty,
        );
        return totalDifficulty / this.questions.length;
    }
}