class Question {
  // YOUR CODE HERE:
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    for (let i = 0; i < this.choices.length; i++) {
      let randomChoice = Math.floor(Math.random() * this.choices.length);
      [this.choices[i], this.choices[randomChoice]] = [this.choices[randomChoice], this.choices[i]];
    }
    
  }
  

}

