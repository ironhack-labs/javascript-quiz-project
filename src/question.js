//class Question {
// YOUR CODE HERE:
//
// 1. constructor (text, choices, answer, difficulty)

// 2. shuffleChoices()
class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(text, choices, answer, difficulty) {
    this.text = text; // string
    this.choices = choices;
    this.answer = answer; //string
    this.difficulty = difficulty; //number between 1 (easiest) - 3 (hardest)
  }

  //methods

  shuffleChoices() {
    const questionChoices = this.choices;

    for (let i = questionChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      // swap elements
      let temp = questionChoices[i];
      questionChoices[i] = questionChoices[j];
      questionChoices[j] = temp;
    }

    return questionChoices;
  }

  // Quiz {
  //constructor(questions, timeLimite,timeRemaining,)
  //this.questions = questions
  //this.timeLimit = timeLimit
  //.timeRemaining = timeRemaining
  //this.correctAnswers = 0
  //this.currentQuestionIndex = 0

  //getQuestion () {
  //method :Returns the question from the questions array at the position of currentQuestionIndex.
  //project = this.currentQuestionIndex.push(Question)
  //return project

  //}

  //moveToNextQuestion() {
  //for (let i= 0 ; i < project.lenght; i++)
  //   let project1 = project[i]return project1 += 1

  //}

  //shuffleQuestions() {
  //questions.forEach(eachQuestion) => {

  //}
  //checkAnswer (checkWord) {
  //for (j = 0; j = questions.length ; j++) {
  //Let project2 = questions[i]
  //if(
  //correct answer === "project2"
  //return correctAnswer += 1
  //}
  //hasEnded () {
  //if (this.currentQuestionIndex === questions.length ) {
  //return truee }
  //else {
  //    false
  //}
  //}
  //return}

  //}

  //}
  // 2. getQuestion()
  // 3. moveToNextQuestion()
  // 4. shuffleQuestions()
  // 5. checkAnswer(answer)
  // 6. hasEnded()
}
