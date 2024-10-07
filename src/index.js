document.addEventListener("DOMContentLoaded", () => {
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionText = document.querySelector("#question-text");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const resultContainer = document.querySelector("#result");
  const timerDisplay = document.querySelector("#Timer");
  const restartButton = document.querySelector("#restartButton");
  const quizDuration = 120; // Total time in seconds for the quiz

  // Define questions for the quiz
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", "easy"),
    new Question(
      "What is the capital of France?",
      ["Berlin", "Madrid", "Paris", "Lisbon"],
      "Paris",
      "easy"
    ),
    new Question(
      "What color do you get when you mix blue and yellow?",
      ["Green", "Purple", "Orange", "Brown"],
      "Green",
      "medium"
    ),
    new Question(
      "Which planet is known as the Red Planet?",
      ["Earth", "Mars", "Venus", "Jupiter"],
      "Mars",
      "easy"
    ),
    new Question(
      "Who wrote 'To Kill a Mockingbird'?",
      ["Harper Lee", "Mark Twain", "F. Scott Fitzgerald", "Jane Austen"],
      "Harper Lee",
      "medium"
    ),
    new Question(
      "What is the largest mammal in the world?",
      ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
      "Blue Whale",
      "easy"
    ),
    new Question(
      "How many continents are there on Earth?",
      ["5", "6", "7", "8"],
      "7",
      "easy"
    ),
    new Question(
      "Which element has the chemical symbol 'O'?",
      ["Oxygen", "Osmium", "Gold", "Zinc"],
      "Oxygen",
      "easy"
    ),
    new Question(
      "What is the capital of Japan?",
      ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      "Tokyo",
      "medium"
    ),
    new Question(
      "Who painted the Mona Lisa?",
      [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      "Leonardo da Vinci",
      "medium"
    ),
    new Question(
      "What is the powerhouse of the cell?",
      ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      "Mitochondria",
      "medium"
    ),
    new Question(
      "Which gas is most abundant in Earth's atmosphere?",
      ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
      "Nitrogen",
      "medium"
    ),
    new Question(
      "Which year did World War II end?",
      ["1942", "1945", "1948", "1950"],
      "1945",
      "hard"
    ),
    new Question(
      "What is the square root of 64?",
      ["6", "7", "8", "9"],
      "8",
      "easy"
    ),
    new Question(
      "Which planet has the most moons?",
      ["Earth", "Mars", "Jupiter", "Saturn"],
      "Saturn",
      "hard"
    ),
    new Question(
      "What is the chemical symbol for water?",
      ["H", "O2", "H2O", "HO"],
      "H2O",
      "easy"
    ),
    new Question(
      "Who developed the theory of relativity?",
      ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
      "Albert Einstein",
      "hard"
    ),
    new Question(
      "What is the longest river in the world?",
      ["Nile", "Amazon", "Yangtze", "Mississippi"],
      "Nile",
      "medium"
    ),
    new Question(
      "Which planet is closest to the sun?",
      ["Venus", "Earth", "Mercury", "Mars"],
      "Mercury",
      "easy"
    ),
    new Question(
      "Who is the author of the Harry Potter series?",
      ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "George R.R. Martin"],
      "J.K. Rowling",
      "medium"
    ),
  ];

  const quiz = new Quiz(questions, quizDuration);

  quiz.shuffleQuestions();
  updateTimer();
  showQuestion();

  // Timer update function
  function updateTimer() {
    const minutes = String(Math.floor(quiz.timeRemaining / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(quiz.timeRemaining % 60).padStart(2, "0");
    timerDisplay.innerText = `${minutes}:${seconds}`;
  }

  // Timer countdown
  let timer = setInterval(() => {
    quiz.timeRemaining--;
    updateTimer();
    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  // Display the current question
  function showQuestion() {
    const currentQuestion = quiz.getCurrentQuestion();
    questionText.innerText = currentQuestion.text;
    choiceContainer.innerHTML = "";

    // Shuffle and display choices
    currentQuestion.shuffleChoices();
    currentQuestion.choices.forEach((choice) => {
      const choiceElement = document.createElement("li");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = choice;
      input.id = choice;

      const label = document.createElement("label");
      label.setAttribute("for", choice);
      label.innerText = choice;

      choiceElement.appendChild(input);
      choiceElement.appendChild(label);
      choiceContainer.appendChild(choiceElement);
    });

    // Update progress bar and question count
    const progressPercentage =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
  }

  // Handle next button click
  nextButton.addEventListener("click", () => {
    const selectedChoice = document.querySelector(
      'input[name="choice"]:checked'
    );
    if (selectedChoice) {
      quiz.checkAnswer(selectedChoice.value);
      if (!quiz.hasEnded()) {
        quiz.moveToNextQuestion();
        showQuestion();
      } else {
        endQuiz();
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  });

  // End the quiz and show results
  function endQuiz() {
    clearInterval(timer);
    quizView.style.display = "none";
    endView.style.display = "block";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  // Restart the quiz
  restartButton.addEventListener("click", () => {
    location.reload();
  });
});
