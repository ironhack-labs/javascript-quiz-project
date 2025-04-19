class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor (text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    // 2. shuffleChoices()

    shuffleChoices() {
        this.choices.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
    }
    }