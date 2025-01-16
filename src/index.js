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

  let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/
  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function toMinutesFunc(miliseconds) {
    return Math.floor(miliseconds / (60 * 1000))
      .toString()
      .padStart(2, "0");
  }

  function toSecondsFunc(miliseconds) {
    return Math.floor((miliseconds % 60000) / 1000)
      .toString()
      .padStart(2, "0");
  }

  function startTimer(timeInSeconds) {
    let timeRemained = timeInSeconds * 1000;
    let minutesRemained = toMinutesFunc(timeInSeconds);
    let secondsRemained = toSecondsFunc(timeInSeconds);

    const interval = setInterval(() => {
      timeRemained -= 1000;
      minutesRemained = toMinutesFunc(timeRemained);
      secondsRemained = toSecondsFunc(timeRemained);

      timeRemainingContainer.innerText = `${minutesRemained}:${secondsRemained}`;

      if (timeRemained === 0 || quiz.hasEnded()) {
        clearInterval(interval);
        showResults();
      }
    }, 1000);
  }

  const interval = startTimer(quiz.timeRemaining);

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
    questionContainer.textContent = question.text;
    // console.log(question);

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    let progress =
      Math.floor((1 / questions.length) * 100) * quiz.currentQuestionIndex;

    progressBar.style.width = `${progress}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // console.log(quiz);
    // Update the question count (div#questionCount) show the current question out of total questions
    questionCount.innerText = `Question ${quiz.currentQuestionIndex} of ${quiz.questions.length}`;

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    quiz.questions[quiz.currentQuestionIndex].choices.forEach((element) => {
      const qusChoice = document.createElement("input");
      qusChoice.type = "radio";
      qusChoice.name = "choice";
      qusChoice.value = element;
      choiceContainer.appendChild(qusChoice);
      const lbl = document.createElement("label");
      lbl.innerText = element;
      choiceContainer.appendChild(lbl);
      choiceContainer.appendChild(document.createElement("br"));
    });

    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
  }

  // const choiceTest = document.querySelectorAll("input");
  // for (i = 0; i <= choiceTest.length; i++) {
  //   console.log(choiceTest[i].value);
  // }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choiceTest = document.querySelectorAll(
      "input[name='choice']:checked"
    );
    console.log(choiceTest[0]);
    console.log(choiceTest[0].value);
    if (choiceTest.length > 0) {
      selectedAnswer = choiceTest[0].value;
    }

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  function resetQuiz() {
    // Reset quiz instance
    quiz.resetQuiz();

    // Reset views visibility
    quizView.style.display = "block";
    endView.style.display = "none";

    // Reset progress bar
    progressBar.style.width = "0%";
    clearInterval(interval);

    // Reset timer to initial value
    quiz.timeRemaining = quizDuration;

    // Show first question
    showQuestion();
    startTimer(quiz.timeRemaining);
  }

  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", resetQuiz);
});
