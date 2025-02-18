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
  // shuffleChoices() {
  //   let shuffled = this.choices
  //     .map((value) => ({ value, sort: Math.random() }))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map(({ value }) => value);

  //   console.log(shuffled);
  //   this.choices = shuffled;
  // }

  // 2. shuffleChoices()
  shuffleChoices() {
    return this.choices.sort(() => 0.5 - Math.random());
  }
}
