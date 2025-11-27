class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    // //*************************** WORKING ALTERNATIVE WITHOUT .sort ************************
    // for (let i = this.choices.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   const temp = this.choices[i];
    //   this.choices[i] = this.choices[j];
    //   this.choices[j] = temp;
    // }
    
    this.choices.sort(() => Math.random() - 0.5);
    return this.choices;
  }
}