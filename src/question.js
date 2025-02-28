class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    };
    shuffleChoices() {
        const shuffledArray = this.choices.sort((a, b) => 0.5 - Math.random());
        return shuffledArray;
    }
}