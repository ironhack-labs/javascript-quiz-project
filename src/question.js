class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    
    let currentIndex = this.choices.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.choices[currentIndex], this.choices[randomIndex]] = [
        this.choices[randomIndex],
        this.choices[currentIndex],
      ];
    }
  }
}


// const testChoices = [
//   "choice1",
//   "choice2",
//   "choice3",
//   "choice4",
//   "choice5",
//   "choice6",
//   "choice7",
// ];

// const testQuestion = new Question("testText", testChoices, "answer", 1);
// console.log("Before shuffling:", testQuestion.choices);
// testQuestion.shuffleChoices();
// console.log("After shuffling:", testQuestion.choices);