class Question {
    // YOUR CODE HERE:
    constructor(text, choices, answer, difficulty){
        this.text= text;
        this.choices= choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()
    shuffleChoices(){
      let arrayChoiceSize = this.choices.length;
      
      while(arrayChoiceSize !== 0) {
        let randomPos = Math.floor(Math.random() * arrayChoiceSize);
        arrayChoiceSize--;
        //swapping
        [this.choices[arrayChoiceSize], this.choices[randomPos]] = [this.choices[randomPos], this.choices[arrayChoiceSize]];
      }

    }
}