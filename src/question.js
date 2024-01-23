<<<<<<< HEAD
class Question{
    constructor(text, choices,answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    shuffleChoices(){
         return this.choices.sort(() => Math.random() - 0.5)
}
}
=======
class Question {
    constructor(text,choices,answer,difficulty){
        this.text=text;
        this.choices=choices;
        this.answer=answer;
        this.difficulty=difficulty;
    }
    shuffleChoices(){
        return this.choices.sort(()=>Math.random() - 0.5)
}
}
>>>>>>> 5c85410e98ec84ee90b04b1ebaf3031fe2ae9d6c
