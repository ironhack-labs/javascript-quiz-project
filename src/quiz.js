class Quiz {
    // DAY 1 YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    // 2. getQuestion()
    getQuestion() {

        return this.questions(this.currentQuestionIndex);
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion(){

        this.currentQuestionIndex++;
    }
// 4. shuffleQuestion()
    shuffleQuestions(){ 
    for (let i = this.questions.length - 1; i > 0; i--) {
        const randomize = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[randomize]] = [this.questions[randomize], this.questions[i]];
    };
        this.questions = this.questions.filter(function(question) {
};


    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        this.answer = answer;
        if (this.answer){
            this.correctAnswers++
        }
    }


    // 6. hasEnded()
}

hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) { return false }
    else { return true }

  // DAY 2 YOUR CODE HERE
  // 1. filterQuestionsByDifficulty()
  filterQuestionsByDifficulty(questionDifficulty) {
    if (
      typeof questionDifficulty != "number" ||
      questionDifficulty >= 3 ||
      questionDifficulty <= 0
    ) {
      const filteredQuestions = this.questions.filter((el) => {
        return el;
        //return this.questions;
      });
      return filteredQuestions;
    } else {
      const filteredQuestions = this.questions.filter((el) => {
        if (el.difficulty === questionDifficulty) {
          return el;
        }
      });
      return filteredQuestions;

  // DAY 2 AverageDifficulty
  averageDifficulty() {
    const sumDifficulties = this.questions.reduce((acc, elm) => acc + elm.difficulty, 0)
    const totalQuestions = this.questions.length
    const average = sumDifficulties / totalQuestions
    return average
}





