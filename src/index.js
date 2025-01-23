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
  const timeRemainingContainer = document.getElementById("timeRemaining");
  const btnRestart = document.getElementById("restartButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
  updateTimerDisplay();
  showQuestion();

  /************  TIMER  ************/
  let timer;
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
    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerText = question.text;
    progressBar.style.width = `${(quiz.currentQuestionIndex / questions.length) * 100}%`;
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${questions.length}`;

    question.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.id = `choice${index}`;
      input.value = choice;
      const label = document.createElement("label");
      label.htmlFor = `choice${index}`;
      label.innerText = choice;
      li.appendChild(input);
      li.appendChild(label);
      choiceContainer.appendChild(li);
    });
  }

  function nextButtonHandler() {
    const selectedAnswer = document.querySelector('input[name="choice"]:checked');
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer.value);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    clearInterval(timer);
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;
  }

  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--;
      updateTimerDisplay();
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `Remaining Time: ${minutes}:${seconds}`;
  }

  btnRestart.onclick=()=>{
    window.location.reload();
  }
});
