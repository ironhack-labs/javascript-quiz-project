class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices(){
        for(let i = 0; i < this.choices.length; i++){   
            const shuffle = Math.floor(Math.random() * (i + 1));
            [this.choices[i], this.choices[shuffle]] = [this.choices[shuffle], this.choices[i]];
        }
    }

        }

