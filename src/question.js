class Question {
  // YOUR CODE HERE:
  //
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  shuffleChoices() {
    // the fancy Fisher-Yates Shuffle
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
    }

    // the standard one
    // const randomArray = [];

    // for (let i = this.choices.length - 1; i >= 0; i--) {
    //   const randomIndex = Math.ceil(Math.random() * this.choices.length);
    //   randomArray.push(this.choices.splice(randomIndex, 1)[0]);
    // }

    return this.choices;
  }
}
