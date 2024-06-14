class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()

    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    shuffleChoices(){
        this.choices.sort(() => Math.random() - 0.5);
    }
}