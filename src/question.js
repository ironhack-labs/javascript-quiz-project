class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(question, choices, answer, difficulty) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
    }
    // 2. shuffleChoices()

    shuffleChoices(){
        let array = this.choices;
        let randomIdex;
        for (let i =array.length -1; i > 0; i--){
            randomIdex = Math.floor(Math.random()*(i+1));
            [array[i], array[randomIdex]] = [array[randomIdex], array[i]];
        }
    }
}

