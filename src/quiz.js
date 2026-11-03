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

  // 5. checkAnswer(answer)

  // 6. hasEnded()
}
