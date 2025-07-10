class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    };
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    };

    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        return this.currentQuestionIndex++;
    };

    // 4. shuffleQuestions()
    shuffleQuestions = () => {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
        return this.questions;
    };

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        console.log('checking answer...')
         console.log("Answer submitted:", answer);
        console.log("Correct answer:", this.questions[this.currentQuestionIndex].answer);
        
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++
        }
         return this.correctAnswers;
    };

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        else if (this.currentQuestionIndex = this.questions.length) {
            return true
        }
    }


    filterQuestionsByDifficulty(difficulty) {
        const validDifficulties = [1, 2, 3];

        if (!validDifficulties.includes(difficulty)) {
            return this.questions;
        }
        this.questions = this.questions.filter(
            (question) => question.difficulty === difficulty
        );
    }

    averageDifficulty() {
        const total = this.questions.reduce((sum, question) => {
            return sum + question.difficulty
        }, 0);
        return Math.round((total / this.questions.length) * 10) / 10;
    }
}
/*const questions = [
  { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: 1 },
  { text: "Question 2", choices: ["d", "e", "f"], answer: "d", difficulty: 2 },
  { text: "Question 3", choices: ["g", "h", "i"], answer: "g", difficulty: 2 },
  { text: "Question 4", choices: ["j", "k", "l"], answer: "j", difficulty: 3 },
];

const quiz = new Quiz(questions, 60, 60); // z. B. 60 Sekunden Zeitlimit

console.log(quiz.filterQuestionsByDifficulty(1)); */
