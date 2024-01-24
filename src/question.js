

class Question {
    constructor(textValue, choicesValue, answerValue, difficultyValue) {
        this.text = textValue
        this.choices = choicesValue
        this.answer = answerValue
        this.difficulty = difficultyValue
    }

   

    // 2. shuffleChoices()

    shuffleChoices() {
        this.choices.sort(() => Math.random() - 0.5);
    }

}
