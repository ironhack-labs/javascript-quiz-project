class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        if(difficulty < 1 || difficulty > 3) {
            throw new Error("Difficulty must be between 1 and 3");
        }
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    // 2. shuffleChoices()
    shuffleChoices() {
        this.choices.sort(() => Math.random() - 0.5);
    }
}