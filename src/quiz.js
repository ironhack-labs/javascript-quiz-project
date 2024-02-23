// YOUR CODE HERE:
// 1. constructor (questions, timeLimit, timeRemaining)
class Quiz {
	constructor(questions, timeLimit, timeRemaining) {
		this.questions = questions;
		this.timeLimit = timeLimit;
		this.timeRemaining = timeRemaining;
		this.correctAnswers = 0;
		this.currentQuestionIndex = 0;
	}
	// 2. getQuestion()
	getQuestion() {
		return this.questions[this.currentQuestionIndex];
	}

	// 3. moveToNextQuestion()
	moveToNextQuestion() {
		return this.currentQuestionIndex++;
	}

	// 4. shuffleQuestions()
	shuffleQuestions() {
		let currentIndex = this.questions.length;
		let randomIndex = 0;

		while (currentIndex > 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[this.questions[currentIndex], this.questions[randomIndex]] = [
				this.questions[randomIndex],
				this.questions[currentIndex],
			];
		}

		return this.choices;
	}

	// 5. checkAnswer(answer)
	checkAnswer(answer) {
		if (answer === this.questions[this.currentQuestionIndex].answer) {
			return this.correctAnswers++;
		}
	}
	// 6. hasEnded()

	hasEnded() {
		if (this.currentQuestionIndex < this.questions.length) {
			return false;
		}
		return true;
	}

	filterQuestionsByDifficulty(difficulty) {
		let filterQuestion = this.questions.filter(
			(question) => question.difficulty === difficulty
		);
		return filterQuestion;
	}

	averageDifficulty() {
		let totalDifficulty = this.questions.reduce((acc, curr) => {
			return (acc += curr.difficulty);
		}, 0);
		return totalDifficulty / 2;
	}
}
