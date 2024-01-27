class Question {
    // YOUR CODE HERE:
    //
  constructor(text, choices, answer, difficulty){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

    shuffleChoices(){
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
          return shuffle(this.choices);
    }
}