class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }



    shuffleChoices() {
        for (let i = this.choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.choices[i];
            this.choices[i] = this.choices[j];
            this.choices[j] = temp;
        }

    }




filterQuestionsByDifficulty(difficulty) {
 if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number"){
    return;
 }  

    const filteredQuestions = this.questions.filter((selectedDifficulty) => { 
    return selectedDifficulty.difficulty === difficulty;
})

this.questions = filteredQuestions;
return this.questions;
}


averageDifficulty() {

    const sumDifficulty = this.questions.reduce((sum, question) => {
        const totalDifficulty = sum + question.difficulty
        return totalDifficulty;
    }, 0);
return sumDifficulty / this.questions.length;

}

}
