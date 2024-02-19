class Question {

    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
        this.choices.sort((a,b) => Math.random() >= Math.random() ? -1 : 1 )
    }

}
