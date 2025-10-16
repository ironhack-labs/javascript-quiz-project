class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)

    constructor(text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
    }

    // 2. shuffleChoices()

    shuffleChoices() {

        for (let i = this.choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // random index 0–i
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];   // swap elements
        }

        return this.choices
    }
}

const questionOne = new Question('what is the color below?',['yellow','red','blue'], 'blue', 1) // example queston, probably array that we use on quiz class named 'questions; goingt to consist of these objects

// console.log(questionOne.shuffleChoices())
