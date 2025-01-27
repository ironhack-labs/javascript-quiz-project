document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");
  const resultContainer = document.querySelector("#result");
  const timeRemainingContainer = document.getElementById("timeRemaining");

  /************  CLASS DEFINITIONS  ************/
  class Question {
    constructor(text, choices, correctAnswer, id) {
      this.text = text;
      this.choices = choices;
      this.correctAnswer = correctAnswer;
      this.id = id;
    }

    shuffleChoices() {
      this.choices.sort(() => Math.random() - 0.5);
    }

    isCorrect(answer) {
      return answer === this.correctAnswer;
    }
  }

  class Quiz {
    constructor(questions, totalDuration) {
      this.questions = questions;
      this.totalDuration = totalDuration; // in seconds
      this.timeRemaining = totalDuration;
      this.currentIndex = 0;
      this.correctAnswers = 0;
    }

    getQuestion() {
      return this.questions[this.currentIndex];
    }

    checkAnswer(answer) {
      if (this.getQuestion().isCorrect(answer)) {
        this.correctAnswers++;
        return true;
      }
      return false;
    }

    moveToNextQuestion() {
      this.currentIndex++;
    }

    hasEnded() {
      return this.currentIndex >= this.questions.length;
    }

    getCorrectAnswersCount() {
      return this.correctAnswers;
    }

    shuffleQuestions() {
      this.questions.sort(() => Math.random() - 0.5);
    }

    reset() {
      this.currentIndex = 0;
      this.correctAnswers = 0;
      this.timeRemaining = this.totalDuration;
      this.shuffleQuestions();
    }
  }

  /************  QUIZ SETUP  ************/
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
  const quiz = new Quiz(questions, 120); // 2-minute quiz duration
  quiz.shuffleQuestions();
  let timer;

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartQuizHandler);

  /************  FUNCTIONS  ************/
  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--;
      updateTimeDisplay();
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }

  function updateTimeDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  function restartQuizHandler() {
    clearInterval(timer);
    quiz.reset();
    quizView.style.display = "block";
    endView.style.display = "none";
    updateTimeDisplay();
    startTimer();
    showQuestion();
  }

  function showQuestion() {
    if (quiz.hasEnded()) {
      clearInterval(timer);
      showResults();
      return;
    }

    const question = quiz.getQuestion();
    question.shuffleChoices();
    questionContainer.innerText = question.text;
    progressBar.style.width = `${
      ((quiz.currentIndex + 1) / quiz.questions.length) * 100
    }%`;
    questionCount.innerText = `Question ${quiz.currentIndex + 1} of ${
      quiz.questions.length
    }`;
    choiceContainer.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.name = "choice";
      inputElement.value = choice;
      inputElement.id = `choice${index}`;

      const labelElement = document.createElement("label");
      labelElement.htmlFor = `choice${index}`;
      labelElement.innerText = choice;

      choiceContainer.appendChild(inputElement);
      choiceContainer.appendChild(labelElement);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    const choices = document.querySelectorAll("input[name='choice']");
    let selectedAnswer = null;

    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    } else {
      alert("Please select an answer before proceeding.");
    }
  }

  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.getCorrectAnswersCount()} out of ${
      quiz.questions.length
    } correct answers!`;
  }

  /************  INITIAL SETUP  ************/
  restartQuizHandler(); // Start the quiz on page load
});
