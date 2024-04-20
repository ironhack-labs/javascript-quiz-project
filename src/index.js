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
  const restartButton = document.querySelector("#restartButton")
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
    // construct each question with choices, correct answer and difficulty level
    // constructor(text, choices, answer, difficulty

    new Question("Where is the Great Pyramid located in Egypt?", ["Cairo", "Giza", "Alexandria", "Luxor"], "Giza", 1),
    new Question("Which of the following is the largest country in the world?", ["China", "Russia", "India", "Japan"], "Russia", 2),
    new Question("Which of the following animals uses more of their brain?", ["Shark", "Lion", "Eagle", "Dolphins"], "Dolphins", 3),
    new Question("Who is the CEO of TikTok?", ["Shou Zi Chew", "Mark Zuckerberg", "Elon Musk", "Prince of Dubai"], "Shou Zi Chew", 2),
    new Question("What planet is closest to the Earth right now?", ["Venus", "Mars", "Mercury", "Moon"], "Mercury", 3),

  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  // constructor (questions, timeLimit, timeRemaining)
  const quiz = new Quiz(questions, quizDuration, quizDuration);

  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/
  let minutes;
  let seconds;

  function updateTime() {
    // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
    minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }
  updateTime()
  // Show first question
  showQuestion();

  /************  TIMER  ************/
  // Start counting down from the time specified in the timeRemaining property of the Quiz instance.
  // Update the timeRemaining and the timer text every second
  // Stop counting down when the time is up
  // When the time is up, it should display the end view and the score

  let timer;
  let startTimer = function () {
    timer = setInterval(function () {
      if (quiz.timeRemaining > 0) {
        quiz.timeRemaining--;
        updateTime();
      } else {
        showResults();
      }
    }, 1000)
  }
  startTimer();


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartQuiz);

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



    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    let progress = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`; // This value is hardcoded as a placeholder



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder



    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
        <input type="radio" name="choice" value="CHOICE TEXT HERE">
        <label>CHOICE TEXT HERE</label>
      <br>
    */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.

    question.choices.forEach((element, index) => {
      let choiceElement = document.createElement("li");
      choiceElement.innerHTML =
        `
      <input type="radio" name="choice" id="Choice${index}" value="${element}">
      <label for="Choice${index}">${element}</label>
      `
      choiceContainer.appendChild(choiceElement);
    })


  }



  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value



    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    let choiceElements = document.querySelectorAll("input")

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.

    choiceElements.forEach(element => {
      if (element.checked === true) selectedAnswer = element.value;
    })
    quiz.checkAnswer(selectedAnswer);
    quiz.moveToNextQuestion();
    showQuestion();

  }




  function showResults() {


    // stop the quiz timer so we dont waste ressources in the background
    clearInterval(timer);

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder

  }

  function restartQuiz() {

    // Hide the end view
    quizView.style.display = "block";
    // Show the quiz view
    endView.style.display = "none";

    // Reset the currentQuestionIndex to 0
    quiz.currentQuestionIndex = 0;

    // Reset the correctAnswers to 0
    quiz.correctAnswers = 0;

    // Shuffle the questions
    quiz.shuffleQuestions();

    // Show the first question
    showQuestion();

    // restart timer
    quiz.timeRemaining = quiz.timeLimit;
    updateTime();
    startTimer();

  }

});