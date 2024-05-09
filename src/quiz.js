class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    // 4. shuffleQuestions()
    //Durstenfeld shuffle, an optimized version of Fisher-Yates:
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (this.questions[this.currentQuestionIndex].answer === answer) {
            this.correctAnswers += 1
        }
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    }

    // Day 2.
    // filterQuestionsByDifficulty(difficulty)

    filterQuestionsByDifficulty(difficulty) {
        if(difficulty < 1 || difficulty > 3) return this.questions;
        if(typeof difficulty == 'string') return this.questions;
        this.questions = this.questions.filter(question => question.difficulty === difficulty)
        return this.questions;
    }


    

    /*
        questions = [
            {
                name: q1,
                difficulty: 1
            },
            {
                name: q2,
                difficulty: 1
            },
            {
                name: q3,
                difficulty: 2
            }

        ]

        difficulty = 1
        return this.questions.filter(question => question.difficulty === difficulty);
        [
            {
                name: q1,
                difficulty: 1
            },
            {
                name: q2,
                difficulty: 1
            }
        ]
    */

    averageDifficulty() {

        const totalDifficultyPoints = this.questions.reduce((summary, question) => {
            return summary + question.difficulty;
        }, 0);

        return  totalDifficultyPoints / this.questions.length;
    }
}