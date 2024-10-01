class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()
    constructor (text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices () {
        const randomisedArray = this.choices.sort(() => 0.5 - Math.random());
        this.choices = randomisedArray;
    }
}