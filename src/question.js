class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()
    constructor(textValue, choicesValue, answerValue, difficultyValue){
        this.text = textValue  
        this.choices = choicesValue
        this.answer = answerValue
        this.difficulty = difficultyValue
    }
    shuffleChoices(){
      this.choices.sort(() => Math.random() - 0.5)
    }
}
