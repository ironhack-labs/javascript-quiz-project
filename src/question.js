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
  // should shuffle the elements stored in the choices array property.
  shuffleChoices() {
      for (let i = this.choices.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i 
        const j = Math.floor(Math.random() * (i+1));
        // Swap elements

        [this.choices[i],this.choices[j]] = [this.choices[j],this.choices[i]];
    }
  }
}
