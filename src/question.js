class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) { //we set the parameters
        this.text = text
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
    }
    // 2. shuffleChoices()
    shuffleChoices() { // we shuffle the choices array
        for (let i = this.choices.length - 1; i > 0; i--) { // we do a loop to shuffle the choices
      const j = Math.floor(Math.random() * (i + 1)); // we get a random index
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // swapping the choices
    }
}
}
    