// class Question {
//     // YOUR CODE HERE:
//     //
//     // 1. constructor (text, choices, answer, difficulty)

//     // 2. shuffleChoices()


class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
        
    }

    shuffleChoices() {
        let currentIndex = this.choices.length;
        while(currentIndex != 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            var temp = this.choices[currentIndex];
            this.choices[currentIndex]= this.choices[randomIndex];
            this.choices[randomIndex] = temp;
        }
   

}

}


// let question1 = new Question("food",[1, 7, 4, 5], 4, "hard");
// console.log(question1.shuffleChoices());
