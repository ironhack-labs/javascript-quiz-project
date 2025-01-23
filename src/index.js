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
  const quiz = new Quiz(questions, quizDuration,quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();
  startTimer();

  /************  TIMER  ************/

  let timer;


  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartQuiz);
  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results
  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.textContent = question.text;

    const progressB = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = progressB + `%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    question.choices.forEach((choice, index) => {
      const listItem = document.createElement("li");
      const inputRadio = document.createElement("answer");
      inputRadio.type = "radio";
      inputRadio.name = "choice";
      inputRadio.id = `choice${index}`;
      inputRadio.value = choice;

      const label = document.createElement("label");
      label.htmlFor = `choice${index}`;
      label.textContent = choice;

      listItem.appendChild(inputRadio);
      listItem.appendChild(label);
      //choiceContainer.appendChild(inputRadio);
      //choiceContainer.appendChild(label);
      //choiceContainer.appendChild(document.createElement("br"));
      choiceContainer.appendChild(listItem);
    });

    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      quiz.timeRemaining--;
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = minutes + ":" + seconds;
      

      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        quiz.showResults();
      }
    }, 1000);
  }




  function nextButtonHandler() {
    let selectedAnswer;

    const choices = document.querySelectorAll("input[name='choice']");

    choices.forEach(choice => {
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
    endView.style.display = "none";
    quizView.style.display = "block";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;
    quiz.shuffleQuestions();
    clearInterval(timer);
    startTimer();
    showQuestion();
  }
});
