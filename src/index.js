document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

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
  const quizDuration = 120;

  /************  QUIZ INSTANCE  ************/

  const quiz = new Quiz(questions, quizDuration, quizDuration);
  console.log(quiz);
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  showQuestion();

  /************  TIMER  ************/

  let timer;

  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--;

      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }

  startTimer();

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    questionContainer.innerText =
      quiz.questions[quiz.currentQuestionIndex].text;

    choiceContainer.innerHTML = "";

    quiz.questions[quiz.currentQuestionIndex].choices.forEach((answer) => {
      const li = document.createElement("li");
      li.innerHTML = `<input type="radio" name="choice" value="${answer}">
      <label>${answer}</label>
      <br>`;
      choiceContainer.appendChild(li);
    });

    const currentQuestion = quiz.getQuestion();

    questionContainer.innerText = currentQuestion.text;

    progressBar.style.width = `${
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100
    }%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
  }

  function nextButtonHandler() {
    let selectedAnswer;
    const choices = document.querySelectorAll('input[name="choice"]');

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

  function restartQuiz() {
    quiz.reset();
    quiz.shuffleQuestions();

    clearInterval(timer);
    quiz.timeRemaining = quizDuration;
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    startTimer();

    showQuestion();

    quizView.style.display = "block";
    endView.style.display = "none";
  }

  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    restartButton.addEventListener("click", restartQuiz);
  }
});
