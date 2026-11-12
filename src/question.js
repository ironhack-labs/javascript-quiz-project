class Question {
    // YOUR CODE HERE:
    
     constructor (text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
     }

    shuffleChoices(){
  this.choices.sort(() => Math.random() - 0.5);
     }
    
}

  new Question("What is the scientific name for modern humans?", ["Homo erectus", "Homo habilis", "Homo sapiens", "Australopithecus"], "Homo sapiens", 1),

  new Question("Where did Homo sapiens originate?", ["Asia", "Africa", "Europe", "South America"], "Africa", 2),