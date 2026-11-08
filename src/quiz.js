class Quiz 
{
	// hallo!! dani here to do my part!! :D
	constructor (questions, timeLimit, timeRemaining) {
			
		this.questions = questions;
		this.timeLimit = timeLimit;
		this.timeRemaining = timeRemaining;
			
		this.correctAnswers = 0;
		this.currentQuestionIndex = 0;
	}
		
	getQuestion
	()
	{
		return this.questions[this.currentQuestionIndex];
	}

	moveToNextQuestion
	()
	{
		this.currentQuestionIndex += 1;
	}

	shuffleQuestions
	()
	{
		this.questions.sort(() => Math.random() - 0.5);		
	}

	// now you continue Dixon!! :D (btw, again, no need to mimic my style, you do it however you want ^^)

	checkAnswer (answer){
	const currentQuestion = this.getQuestion();

	if (currentQuestion.answer === answer) {
		this.correctAnswers += 1;
	}
}

  hasEnded() {
	return this.currentQuestionIndex >= this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
	if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
		this.questions = this.questions.filter((question) => question.difficulty === difficulty)
	}
  }

  averageDifficulty() {
	return this.questions.reduce((sum, question) => sum + question.difficulty, 0) / this.questions.length;
  }
}
