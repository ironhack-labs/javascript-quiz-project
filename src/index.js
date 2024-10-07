document.addEventListener("DOMContentLoaded", () => {
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const timeRemainingContainer = document.getElementById("timeRemaining");
  const nextButton = document.querySelector("#nextButton");
  const resultContainer = document.querySelector("#result");

  quizView.style.display = "block";
  endView.style.display = "none";

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
  ];

  const quizDuration = 10;
  let timer = 10;

  const quiz = new Quiz(questions, quizDuration, timer);
  quiz.shuffleQuestions();

  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  const nextButtonHandler = () => {
    let selectedAnswer;
    const currentChoice = document
      .querySelectorAll('input[name="choice"]')
      .forEach((input) => {
        input.checked ? (selectedAnswer = input.value) : null;
      });
    currentChoice ? quiz.checkAnswer(selectedAnswer) : null;
    quiz.moveToNextQuestion();
    showQuestion();
  };

  const showQuestion = () => {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();

    question.shuffleChoices();

    questionContainer.innerText = question.text;

    progressBar.style.width = `${
      (quiz.currentQuestionIndex / questions.length) * 100
    }%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} / ${
      questions.length
    }`;

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
  };

  const showResults = () => {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;
  };

  showQuestion();

  nextButton.addEventListener("click", nextButtonHandler);

  document.querySelector("#restartButton").addEventListener("click", () => {
    endView.style.display = "none";
    quizView.style.display = "block";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;
    quiz.shuffleQuestions();
    showQuestion();
  });
});

quiz.startTimer();
