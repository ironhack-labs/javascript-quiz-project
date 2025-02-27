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
  // ['1', '2' ,'4']

  //['3',]
  shuffleChoices() {
    let shuffleChoices = [];

    for (let i = 0; i < this.choices.length; i++) {
      let index = Math.round(Math.random() * (this.choices.length - 1));

      while (shuffleChoices.includes(this.choices[index])) {
        index = Math.round(Math.random() * (this.choices.length - 1));
      }

      shuffleChoices.push(this.choices[index]);
      //   console.log(this.choices, shuffleChoices);
    }
    this.choices = shuffleChoices;
  }
}
