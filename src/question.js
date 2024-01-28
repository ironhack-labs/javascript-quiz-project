class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    // 2. shuffleChoices()
    shuffleChoices() {
        let isTheSame = true
        while (isTheSame) {
            let mixedChoices = [];
            let copyOfChoices = [];

            // Making a copy of this.choices (I do a value copy instead of a reference copy)
            this.choices.forEach(function(element) {
                copyOfChoices.push(element);
            });

            this.choices.forEach(function() {
                const randomNumber = Math.floor(Math.random() * copyOfChoices.length);
                mixedChoices.push(copyOfChoices[randomNumber]);
                copyOfChoices.splice(randomNumber, 1);
            });

            // Check if the array is not the same as the one at the beginning, otherwise it will give an error on Jasmine
            if (this.choices.toString() !== mixedChoices.toString()) {
                this.choices = mixedChoices;
                isTheSame = false
            }
        }
    }
}