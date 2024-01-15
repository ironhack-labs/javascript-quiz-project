class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
    }

    shuffleChoices() {
        const newChoices = [...this.choices];
        let currentIndex = newChoices.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = newChoices[currentIndex];
            newChoices[currentIndex] = newChoices[randomIndex];
            newChoices[randomIndex] = temporaryValue;
        }
        this.choices = newChoices;
        return this.choices;
    }
}