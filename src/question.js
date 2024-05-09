class Question {
    // YOUR CODE HERE:
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
    }


    // 2. shuffleChoices()

    // Fisher-Yates shuffle algorithm
    // Source Used: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleChoices() {
        let currentIndex = this.choices.length;
        while (currentIndex != 0) {
            let randomChoiceIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;

            [this.choices[currentIndex], this.choices[randomChoiceIndex]] = [this.choices[randomChoiceIndex], this.choices[currentIndex]]
        }
    }
}


