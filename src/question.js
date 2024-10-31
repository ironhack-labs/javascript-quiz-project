class Question {
    // YOUR CODE HERE:
    //
    constructor(text, choices, answer, difficulty) {
        if (difficulty < 1 || difficulty > 3) this.difficulty = 1;

        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
        this.choices.sort(() => Math.random() - 0.5);
    }
}