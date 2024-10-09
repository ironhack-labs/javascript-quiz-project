class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
        /* Randomize array in-place using Durstenfeld shuffle algorithm */
        for (var i = this.choices.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.choices[i];
            this.choices[i] = this.choices[j];
            this.choices[j] = temp;
        }
    }
}