class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (text, choices, answer, difficulty)

  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
    this.newArr = [];
  }
  // 2. shuffleChoices()
  shuffleChoices() {
    this.currentIndex = this.choices.length;
    this.randomIndex = Math.floor(Math.random() * this.currentIndex);
    // While there remain elements to shuffle.
    while (this.currentIndex > 0) {
      // Pick a remaining element.

      this.currentIndex--;

      // And swap it with the current element.
      [this.choices[this.currentIndex], this.choices[this.randomIndex]] = [
        this.choices[this.randomIndex],
        this.choices[this.currentIndex],
      ];
    }
    //   console.log(this.choices);
    return this.choices;
  }
}
