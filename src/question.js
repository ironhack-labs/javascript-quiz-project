class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    shuffleChoices() {
        let i = this.choices.lenght;
        let j = 0;
        let temp = 0;
        for (let i = this.choices.length - 1; i >= 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.choices[i];
            this.choices[i] = this.choices[j];
            this.choices[j] = temp;
        }

    }
}
