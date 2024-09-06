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

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
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
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.querySelector("#timeRemaining span");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;






  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;






  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/
  startQuizTimer(quiz);

  /* showQuestion()
  nextButtonHandler()
  showResults()
  restartQuiz() */

  // YOUR CODE HERE:

  // 1. Show the question
  // Update the inner text of the question container element and show the question text
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

    const progress = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    question.choices.forEach(choice => {
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
    let selectedAnswer = null;

    const choices = document.querySelectorAll('input[name="choice"]');

    choices.forEach(choice => {
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

    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }


  const restartButton = document.querySelector("#restartButton");  // Assuming the button has this ID
  restartButton.addEventListener("click", restartQuiz);





  function restartQuiz() {
    endView.style.display = "none";

    quizView.style.display = "block";

    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
  }









  function startQuizTimer(quizInstance) {
    const timerElement = document.querySelector('#timeRemaining span');
    timerElement.textContent = formatTime(quizInstance.timeRemaining);

    timer = setInterval(function () {
      quizInstance.timeRemaining--;
      timerElement.textContent = formatTime(quizInstance.timeRemaining);

      if (quizInstance.timeRemaining <= 0) {
        clearInterval(timer);
        endQuiz(quizInstance);
      }
    }, 1000);
  }


  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  function endQuiz(quizInstance) {
    alert("Time's up! Ending the quiz.");
    showResults();
  }





});