document.addEventListener("DOMContentLoaded", () => {
  let selectedAnswer;
  let progress = 25;

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

  // Show first question
  showQuestion();

  /************  TIMER  ************/
  let timer;
 
  const timeRemainingContainer = document.getElementById("timeRemaining");

  startCountdown();

  function startCountdown() {
    quiz.timeRemaining = 120
    console.log("timer start");
    let minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    let seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    timer = setInterval(() => {
      console.log(quiz.timeRemaining);
       minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
       seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  

      quiz.timeRemaining--;
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (quiz.timeRemaining <= 0) {
        showResults();
      }
    }, 1000);

  }

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);

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
    questionContainer.innerText = question.text;
    question.choices.forEach((choice) => {
      choiceContainer.innerHTML += `
      <input type="radio" name="choice" value=\'${choice}\'>
      <label>${choice}</label>
    <br>
`;
    });
    let choices = document.getElementsByTagName("input");
    let choicesArray = [...choices];
    choicesArray.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        selectedAnswer = e.target.value;
      });
    });

    progressBar.style.width = `${progress}%`; // This value is hardcoded as a placeholder

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of 4`; //  This value is hardcoded as a placeholder

  }

  function restartButtonHandler() {
    startCountdown();
    endView.style.display = "none";
    quizView.style.display = "flex";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
  }

  function nextButtonHandler() {
    quiz.checkAnswer(selectedAnswer);
    if (quiz.currentQuestionIndex === 3) {
      showResults();
      return;
    }
    quiz.currentQuestionIndex++;
    progress += 25;
    console.log("Selected ===>", selectedAnswer);
    showQuestion();
    
  }

  function showResults() {
 
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of 4 correct answers!`; // This value is hardcoded as a placeholder

    // 4. Update the timer to clear interval when quiz ends.
    console.log("time is up!");
    clearInterval(timer);
  }
});
