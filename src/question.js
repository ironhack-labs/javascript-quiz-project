class Question {
	// YOUR CODE HERE:
	//
	// 1. constructor (text, choices, answer, difficulty)

	constructor(text, choices, answer, difficulty) {
		this.text = text;
		this.choices = choices;
		this.answer = answer;
		this.difficulty = difficulty;
	}

	shuffleChoices() {
		let currentIndex = this.choices.length;
		let randomIndex = 0;

		while (currentIndex > 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[this.choices[currentIndex], this.choices[randomIndex]] = [
				this.choices[randomIndex],
				this.choices[currentIndex],
			];
		}

		return this.choices;
	}
}
