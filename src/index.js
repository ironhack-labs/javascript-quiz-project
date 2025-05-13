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
  const choicesElements = document.getElementsByName("choice");
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
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  // Show first question
  showQuestion();
  /************  TIMER  ************/
  let timer;
  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
  /************  FUNCTIONS  ************/
  showQuestion(); //Displays the current question and its choices
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
    // 1. Show the question
    // Update the inner text of the question contaier element and show the question text
    questionContainer.textContent = question.text;
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    //const progress = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    //progressBar.style.width = `${progress}%`; // This value is hardcoded as a placeholder
    const progressPercentage =
      ((quiz.questionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions
    const current = quiz.currentQuestionIndex + 1;
    const total = quiz.questions.length;
    questionCount.innerText = `Question ${current} of ${total}`; //  This value is hardcoded as a placeholder
    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /*
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    question.choices.forEach((choice) => {
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = "choice";
      choiceInput.value = choice;
      choiceContainer.appendChild(choiceInput);
      const choiceLabel = document.createElement("label");
      choiceLabel.innerText = choice;
      choiceContainer.appendChild(choiceLabel);
    });
  }
  function nextButtonHandler() {
    // A variable to store the selected answer value
    // YOUR CODE HERE:
    let selectedAnswer = "";
    for (let i = 0; i < choicesElements.length; i++) {
      if (choicesElements[i].checked) {
        selectedAnswer = choicesElements[i].value;
      }
    }
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
    }
    quiz.currentQuestionIndex++;
    showQuestion();
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
    resultContainer.innerText = `You scored 1 out of 1 correct answers!`; // This value is hardcoded as a placeholder
  }
  //TIMER
  function startTimer() {
    console.log("quiz time remaining", quiz.timeRemaining);
    timer = setInterval(() => {
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
  }
  startTimer();
});
