class Quiz {
	// 1. constructor (questions, timeLimit, timeRemaining)

	constructor(questions, timeLimit, timeRemaining) {
		this.questions = questions
		this.timeLimit = timeLimit
		this.timeRemaining = timeRemaining
		this.correctAnswers = 0
		this.currentQuestionIndex = 0
	}

	getQuestion() {
		return this.questions[this.currentQuestionIndex]
	}

	moveToNextQuestion() {
		return this.currentQuestionIndex++
	}

	shuffleQuestions() {
		let { questions } = this

		for (let i = questions.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[questions[i], questions[j]] = [questions[j], questions[i]]
		}
	}

	checkAnswer(answer) {
		if (this.questions[this.currentQuestionIndex].answer === answer) {
			this.correctAnswers++
		}
	}

	//this.question[] is an array of objects which includes text, choices, *answer*, difficulty

	hasEnded() {
		if (this.currentQuestionIndex < this.questions.length) {
			return false
		} else {
			return true
		}
	}

	filterQuestionsByDifficulty(difficulty) {
		const questDif = this.questions.filter((question) => {
			if (difficulty >= 1 && difficulty <= 3) {
				if (question.difficulty === difficulty) {
					return true
				}
			} else {
				return this.questions
			}
		})
		this.questions = questDif
	}

	averageDifficulty() {
		const avrgDif = this.questions.reduce((accumulator, questions) => {
			return accumulator + questions.difficulty
		}, 0)
		return avrgDif / this.questions.length
	}
}
