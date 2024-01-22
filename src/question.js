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
    this.newArr = [];
    // console.log("choices before change", this.choices);
    // for (let i = this.choices.length - 1; i >= 0; i--) {
    //   this.newArr.push(this.choices[i]);
    // }
    // console.log("choices after change", this.newArr);
  }
}
