class Question  {
    constructor (text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices(){
        this.choices.sort(()=> Math.random() -0.5);
    }
    // Uses sort() to shuffle the choices array.
    // The sort() method compares two choices at a time (a and b).
    // a represents the first choice being compared, and b represents the second.
    // Math.random() - 0.5 generates a random positive or negative number.
    // sort() uses this result to decide which choice (a or b) should come first.
    // This changes the order of the questions randomly instead of sorting them by a specific value.

  
}