class Question {
    constructor (text , choices , answer , difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty; 
    }

    shuffleChoices() {
        for (let i = 0; i < this.choices.length; i++) {
            let j = Math.floor(Math.random() * this.choices.length);
            let tempVar = this.choices[i];
            this.choices[i] = this.choices[j];
            this.choices[j] = tempVar;
        }
        return this.choices;
 
    }     

        
}