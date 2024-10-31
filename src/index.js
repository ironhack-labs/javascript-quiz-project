document.addEventListener('DOMContentLoaded', () => {
	/************  HTML ELEMENTS  ************/
	// View divs
	const quizView = document.querySelector('#quizView');
	const endView = document.querySelector('#endView');
	const settingsView = document.querySelector('#settingsView');

	// Quiz view elements
	const progressBar = document.querySelector('#progressBar');
	const questionCount = document.querySelector('#questionCount');
	const questionContainer = document.querySelector('#question');
	const choiceContainer = document.querySelector('#choices');
	const nextButton = document.querySelector('#nextButton');
	const restartButton = document.querySelector('#restartButton');
	const easySettingButton = document.querySelector('#easy-setting');
	const mediumSettingButton = document.querySelector('#medium-setting');
	const hardSettingButton = document.querySelector('#hard-setting');

	// End view elements
	const resultContainer = document.querySelector('#result');

	/************  SET VISIBILITY OF VIEWS  ************/

	// Show the quiz view (div#quizView) and hide the end view (div#endView)
	settingsView.style.display = 'flex';
	quizView.style.display = 'none';
	endView.style.display = 'none';

	/************  QUIZ DATA  ************/

	// Array with the quiz questions
	const questions = [
		new Question('What is 2 + 2?', ['3', '4', '5', '6'], '4', 1),
		new Question(
			'What is the capital of France?',
			['Miami', 'Paris', 'Oslo', 'Rome'],
			'Paris',
			1
		),
		new Question(
			'What color are bananas when they are ripe?',
			['Blue', 'Red', 'Yellow', 'Purple'],
			'Yellow',
			1
		),
		new Question(
			'Who created JavaScript?',
			['Plato', 'Brendan Eich', 'Lea Verou', 'Bill Gates'],
			'Brendan Eich',
			2
		),
		new Question(
			'Which planet is known as the "Red Planet"?',
			['Venus', 'Mars', 'Jupiter', 'Saturn'],
			'Mars',
			2
		),
		new Question(
			'Which element\'s chemical symbol is "O"?',
			['Gold', 'Oxygen', 'Silver', 'Hydrogen'],
			'Oxygen',
			2
		),
		new Question(
			'What is the mass–energy equivalence equation?',
			['E = mc^2', 'E = m*c^2', 'E = m*c^3', 'E = m*c'],
			'E = mc^2',
			3
		),
		new Question(
			'Which philosopher is known for the statement "I think, therefore I am"?',
			['Friedrich Nietzsche', 'Immanuel Kant', 'René Descartes', 'John Locke'],
			'René Descartes',
			3
		),
		new Question(
			'Which of the following scientists is known for developing the uncertainty principle in quantum mechanics?',
			['Albert Einstein', 'Niels Bohr', 'Werner Heisenberg', 'Max Planck'],
			'Werner Heisenberg',
			3
		),
		// Add more questions here
	];
	const quizDuration = 120; // 120 seconds (2 minutes)

	/************  QUIZ INSTANCE  ************/

	// make difficulty selection

	// Create a new Quiz instance object
	const quiz = new Quiz(questions, quizDuration, quizDuration);
	// Shuffle the quiz questions
	quiz.shuffleQuestions();

	/************  SHOW INITIAL CONTENT  ************/

	// Display the time remaining in the time remaining container
	const timeRemainingContainer = document.querySelector('#timeRemaining span');
	timeRemainingContainer.innerText = quiz.getFormattedRemainingTime();

	/************  TIMER  ************/

	let timer;

	const ctx = document.getElementById('piechart').getContext('2d');
	const piechart = new Chart(ctx, {
		type: 'pie',
		data: {
			hoverOffset: 100,
			datasets: [
				{
					data: [0, 1],
					backgroundColor: ['transparent', 'lightgreen'],
					borderWidth: 0,
				},
			],
		},
		options: {
			// without this, the piechart wouldn't render on first game round
			animations: 'none',
		},
	});

	function startTimer() {
		clearInterval(timer);

		timer = setInterval(() => {
			quiz.timeRemaining--;
			timeRemainingContainer.innerText = quiz.getFormattedRemainingTime();

			// Animate pie chart over the countdown duration
			const timeRemainingRelative = quiz.timeRemaining / quizDuration;
			updatePieChart(timeRemainingRelative);

			if (quiz.timeRemaining === 0) showResults();
		}, 1000);
	}

	function updatePieChart(value) {
		const redArea = 0.2;
		const orangeArea = 0.5;

		if (value === redArea)
			piechart.data.datasets[0].backgroundColor = ['transparent', 'red'];

		if (value === orangeArea)
			piechart.data.datasets[0].backgroundColor = ['transparent', 'orange'];

		if (value === 1)
			piechart.data.datasets[0].backgroundColor = ['transparent', 'lightgreen'];

		piechart.data.datasets[0].data = [1 - value, value];
		piechart.update();
	}

	/************  EVENT LISTENERS  ************/

	//startButton.addEventListener('click', startButtonHandler);
	nextButton.addEventListener('click', nextButtonHandler);
	restartButton.addEventListener('click', restartButtonHandler);
	easySettingButton.addEventListener('click', () => startButtonHandler(1));
	mediumSettingButton.addEventListener('click', () => startButtonHandler(2));
	hardSettingButton.addEventListener('click', () => startButtonHandler(3));

	/************  FUNCTIONS  ************/

	function showQuestion() {
		// If the quiz has ended, show the results
		if (quiz.hasEnded()) {
			showResults();
			return;
		}

		// Clear the previous question text and question choices
		questionContainer.innerText = '';
		choiceContainer.innerHTML = '';

		// Get the current question from the quiz by calling the Quiz class method `getQuestion()`
		const question = quiz.getQuestion();
		// Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
		question.shuffleChoices();

		// YOUR CODE HERE:
		//
		// 1. Show the question
		// Update the inner text of the question container element and show the question text
		questionContainer.innerText = `${question.text}`;

		// 2. Update the green progress bar
		// Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

		progressBar.style.width = `${
			(quiz.currentQuestionIndex / quiz.questionsForRendering.length) * 100
		}%`; // This value is hardcoded as a placeholder

		// 3. Update the question count text
		// Update the question count (div#questionCount) show the current question out of total questions

		questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
			quiz.questionsForRendering.length
		}`; //  This value is hardcoded as a placeholder

		// 4. Create and display new radio input element with a label for each choice.

		const currentQuestion =
			quiz.questionsForRendering[quiz.currentQuestionIndex];

		currentQuestion.choices.forEach((choice, i) => {
			const liElement = document.createElement('li');

			liElement.innerHTML = /*html*/ `
			<input
			type="radio"
			name="question-${quiz.currentQuestionIndex}"
			value="${choice}"
			id="answer-${i}"
			/>
			<label for="answer-${i}">${choice}</label>
			<br />
			`;

			choiceContainer.appendChild(liElement);
		});
	}

	function startButtonHandler(difficulty) {
		// reset quiz data
		quiz.correctAnswers = 0;
		quiz.currentQuestionIndex = 0;
		quiz.timeRemaining = quizDuration;
		quiz.setDifficulty(difficulty);

		// let the DOm render
		settingsView.style.display = 'none';
		quizView.style.display = 'block';
		timeRemainingContainer.innerText = quiz.getFormattedRemainingTime();

		showQuestion();
		startTimer();
		updatePieChart(1);
	}

	function nextButtonHandler() {
		const choiceElements = document.querySelectorAll('#choices li input');

		choiceElements.forEach(inputElement =>
			quiz.checkAnswer(inputElement.value)
		);

		quiz.moveToNextQuestion();
		showQuestion();
	}

	function showResults() {
		quizView.style.display = 'none';
		endView.style.display = 'flex';

		resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questionsForRendering.length} correct answers!`; // This value is hardcoded as a placeholder

		clearInterval(timer);
	}

	function restartButtonHandler() {
		settingsView.style.display = 'flex';
		endView.style.display = 'none';
	}
});
