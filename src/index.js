// document.addEventListener("DOMContentLoaded", () => {
//   // HTML elements
//   const quizView = document.querySelector("#quizView");
//   const endView = document.querySelector("#endView");
//   const progressBar = document.querySelector("#progressBar");
//   const questionCount = document.querySelector("#questionCount");
//   const questionContainer = document.querySelector("#question");
//   const choiceContainer = document.querySelector("#choices");
//   const nextButton = document.querySelector("#nextButton");
//   const resultContainer = document.querySelector("#result");

//   // Quiz data
//   const questions = [
//     new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
//     new Question(
//       "What is the capital of France?",
//       ["Miami", "Paris", "Oslo", "Rome"],
//       "Paris",
//       1
//     ),
//     new Question(
//       "Who created JavaScript?",
//       ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
//       "Brendan Eich",
//       2
//     ),
//     new Question(
//       "What is the mass–energy equivalence equation?",
//       ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
//       "E = mc^2",
//       3
//     ),
//     // Add more questions here
//   ];
//   const quizDuration = 120; // 120 seconds (2 minutes)

//   // Quiz instance
//   const quiz = new Quiz(questions, quizDuration, quizDuration);
//   quiz.shuffleQuestions();

//   // Show initial content
//   showQuestion();

//   // Event listeners
//   nextButton.addEventListener("click", nextButtonHandler);
//   const restartButton = document.querySelector("#restartButton");
//   restartButton.addEventListener("click", restartQuiz);

//   // Functions
//   function showQuestion() {
//     if (quiz.hasEnded()) {
//       showResults();
//       return;
//     }

//     // Clear previous question text and choices
//     questionContainer.innerText = "";
//     choiceContainer.innerHTML = "";

//     // Get current question
//     const currentQuestion = quiz.getQuestion();
//     currentQuestion.shuffleChoices();

//     // Update quiz content
//     updateQuizContent(currentQuestion);
//   }

//   function updateQuizContent(currentQuestion) {
//     // Update question text
//     questionContainer.innerText = currentQuestion.text;

//     // Update progress bar
//     const percentProgress =
//       ((quiz.currentIndex + 1) / quiz.questions.length) * 100;
//     progressBar.style.width = `${percentProgress}%`;

//     // Update question count
//     questionCount.innerText = `Question ${quiz.currentIndex + 1} of ${
//       quiz.questions.length
//     }`;

//     // Update choices
//     currentQuestion.choices.forEach((choice, index) => {
//       const choiceElement = document.createElement("li");
//       const input = document.createElement("input");
//       input.type = "radio";
//       input.name = "choice";
//       input.value = choice;

//       const label = document.createElement("label");
//       label.innerText = choice;

//       choiceElement.appendChild(input);
//       choiceElement.appendChild(label);

//       choiceContainer.appendChild(choiceElement);
//     });
//   }

//   function nextButtonHandler() {
//     const selectedAnswer = choiceContainer.querySelector(
//       'input[name="choice"]:checked'
//     );
//     if (!selectedAnswer) {
//       return; // If no answer is selected, do nothing
//     }

//     const answer = selectedAnswer.value;
//     const isCorrect = quiz.checkAnswer(answer);

//     quiz.moveToNextQuestion();
//     showQuestion();

//     if (quiz.hasEnded()) {
//       showResults();
//     }
//   }

//   function showResults() {
//     quizView.style.display = "none";
//     endView.style.display = "flex";

//     const numCorrect = quiz.numCorrectAnswers();
//     resultContainer.innerText = `You scored ${numCorrect} out of ${quiz.questions.length} correct answers!`;
//   }

//   function restartQuiz() {
//     endView.style.display = "none";
//     quizView.style.display = "block";

//     quiz.currentIndex = 0;
//     quiz.correctAnswers = 0;
//     quiz.shuffleQuestions();

//     showQuestion();
//   }
// });

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
  /************  SET VISIBILITY OF VIEWS  ************/
  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";
  /************  QUIZ DATA  ************/
  // Define the Question class
  class Question {
    constructor(text, choices, answer, difficulty) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.difficulty = difficulty;
    }
    shuffleChoices() {
      for (let i = this.choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
      }
    }
  }
  // Define the Quiz class
  class Quiz {
    constructor(questions, timeRemaining, totalTime) {
      this.questions = questions;
      this.timeRemaining = timeRemaining;
      this.totalTime = totalTime;
      this.currentQuestionIndex = 0;
      this.correctAnswers = 0;
    }
    shuffleQuestions() {
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [
          this.questions[j],
          this.questions[i],
        ];
      }
    }
    getQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    hasEnded() {
      return (
        this.currentQuestionIndex >= this.questions.length ||
        this.timeRemaining <= 0
      );
    }
    checkAnswer(answer) {
      if (answer === this.getQuestion().answer) {
        this.correctAnswers++;
      }
    }
    moveToNextQuestion() {
      this.currentQuestionIndex++;
    }
    getCorrectAnswersCount() {
      return this.correctAnswers;
    }
  }
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
  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  // Show first question
  showQuestion();
  /************  TIMER  ************/
  let timer = setInterval(() => {
    quiz.timeRemaining--;
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
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
    // Show the question
    questionContainer.innerText = question.text;
    // Update the green progress bar
    const percentageComplete =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${percentageComplete}%`;
    // Update the question count text
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
    // Create and display new radio input element with a label for each choice.
    question.choices.forEach((choice) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = choice;
      const label = document.createElement("label");
      label.innerText = choice;
      const br = document.createElement("br");
      choiceContainer.appendChild(radioInput);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(br);
    });
  }
  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value
    // Get all the choice elements
    const choices = document.querySelectorAll('input[name="choice"]');
    // Loop through all the choice elements and check which one is selected
    for (const choice of choices) {
      if (choice.checked) {
        selectedAnswer = choice.value;
        break;
      }
    }
    // If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }
  function showResults() {
    // Hide the quiz view (div#quizView)
    quizView.style.display = "none";
    // Show the end view (div#endView)
    endView.style.display = "flex";
    // Update the result container (div#result) inner text to show the number of correct answers out of total questions
    const correctAnswers = quiz.getCorrectAnswersCount();
    const totalQuestions = quiz.questions.length;
    resultContainer.innerText = `You scored ${correctAnswers} out of ${totalQuestions} correct answers!`;
  }
});
