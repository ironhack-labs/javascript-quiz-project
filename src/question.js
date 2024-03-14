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
    for (let i = 0; i < this.choices.length; i++) {
      let j = Math.floor(Math.random() * this.choices.length);

      let temp = this.choices[i];
      this.choices[i] = this.choices[j];
      this.choices[j] = temp;
      // console.log(this.choices);
    }

    return this.choices;
  }
}
