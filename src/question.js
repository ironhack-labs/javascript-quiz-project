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
        this.choices.sort(() => Math.random() - 0.5);
        return this.choices;
    }
}

// shuffleChoices(){   
//         for (let i = this.choices.length - 1; i > 0; i--){
//             const j = Math.floor(Math.random() * (i + 1));
//             [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
//         }
//     }


  
    // shuffleChoices() {
    //   //correct way to shuffle
    //   for (let i = 0; i < this.choices.length; i++) {
    //     let randomIndex = Math.floor(Math.random() * this.choices.length);
    //     let choiceToMove = this.choices[i];
    //     this.choices.splice(i, 1);
    //     this.choices.splice(randomIndex, 0, choiceToMove);
    //   }
    // }
  