class Question {
	constructor(text, choices, answer, difficulty) {
		this.text = text
		this.choices = choices
		this.answer = answer
		this.difficulty = difficulty
	}
	shuffleChoices() {
		let { choices } = this

		for (let i = choices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[choices[i], choices[j]] = [choices[j], choices[i]]
		}
	}
}
