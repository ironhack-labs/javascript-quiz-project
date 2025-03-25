document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");
  const restartButton = document.getElementById("restartButton");

  /************  SET VISIBILITY OF VIEWS  ************/
  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
  const timeRemainingContainer = document.getElementById("timeRemaining");
  updateTimerDisplay();

  // Show first question
  showQuestion();

  /************  TIMER  ************/
  let timer = setInterval(runTimer, 1000);

  function runTimer() {
    quiz.timeRemaining--;
    updateTimerDisplay();

    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `Remaining Time: ${minutes}:${seconds}`;
  }

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  restartButton.addEventListener("click", () => {
    quiz.correctAnswers = 0;
    quiz.currentQuestionIndex = 0;
    quiz.timeRemaining = quiz.timeLimit;
    quiz.shuffleQuestions();

    endView.style.display = "none";
    quizView.style.display = "block";

    clearInterval(timer);
    updateTimerDisplay();
    timer = setInterval(runTimer, 1000);

    showQuestion();
  });

  /************  FUNCTIONS  ************/
  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // 1. Show the question
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    const progressPercent =
      (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 3. Update the question count text
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    // 4. Create and display new radio input element with a label for each choice.
    question.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = choice;

      const label = document.createElement("label");
      label.innerText = choice;

      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;

    const choices = document.querySelectorAll("input[name='choice']");
    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    clearInterval(timer);
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }
});
