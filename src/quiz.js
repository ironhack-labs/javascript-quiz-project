class Quiz {
	// YOUR CODE HERE:
	//
	// 1. constructor (questions, timeLimit, timeRemaining)
	constructor(questions, timeLimit, timeRemaining) {
		this.questions = questions;
		this.questionsForRendering = questions;
		this.timeLimit = timeLimit;
		this.timeRemaining = timeRemaining;
		this.correctAnswers = 0;
		this.currentQuestionIndex = 0;
	}

	// 2. getQuestion()
	getQuestion() {
		return this.questionsForRendering[this.currentQuestionIndex];
	}

	// 3. moveToNextQuestion()
	moveToNextQuestion() {
		this.currentQuestionIndex++;
	}

	// 4. shuffleQuestions()
	shuffleQuestions() {
		this.questionsForRendering.sort(() => Math.random() - 0.5);
	}

	// 5. checkAnswer(answer)
	checkAnswer(answer) {
		const answerIsCorrect =
			this.questionsForRendering[this.currentQuestionIndex].answer === answer;

		if (answerIsCorrect) this.correctAnswers++;
	}

	// 6. hasEnded()
	hasEnded() {
		const reachedLastQuestion =
			this.questionsForRendering.length === this.currentQuestionIndex;

		if (reachedLastQuestion) return true;
		return false;
	}

	filterQuestionsByDifficulty(difficulty) {
		const difficultyIsInvalid =
			difficulty < 1 || difficulty > 3 || isNaN(difficulty);

		if (difficultyIsInvalid) return this.questions;

		this.questionsForRendering = this.questions.filter(
			question => question.difficulty === difficulty
		);
	}

	averageDifficulty() {
		return (
			this.questions.reduce((sum, { difficulty }) => sum + difficulty, 0) /
			this.questions.length
		);
	}

	setDifficulty(setting) {
		this.questionsForRendering = this.questions.filter(
			question => question.difficulty === setting
		);
	}

	getFormattedRemainingTime() {
		const minutes = Math.floor(this.timeRemaining / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (this.timeRemaining % 60).toString().padStart(2, '0');

		return `${minutes}:${seconds}`;
	}
}
