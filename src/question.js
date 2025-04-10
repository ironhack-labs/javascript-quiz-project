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
            for (let i = this.choices.length - 1; i > 0; i--) {
                // Generate a random index between 0 and the current index `i`
                const j = Math.floor(Math.random() * (i + 1));
                // Swap the elements at indices `i` and `j`
                [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
              }
              return this.choices;
            }
        }