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
      "What's the Portugal's capital?",
      ["Lisboa", "Porto", "Lagos", "Castelo Branco"],
      "Lisboa",
      1
    ),
    new Question(
      "What's the best portuguese football club?",
      ["Sporting", "Porto", "Benfica", "My Street F.C."],
      "My Street F.C.",
      3
    ),
    new Question(
      "What's the best anime?",
      ["DBZ", "J.J Kaisen", "One Piece", "Naruto", "Mars of Destruction"],
      "Mars of Destruction",
      1
    ),
    new Question(
      "Who's the best?",
      ["Ronaldo SIIIIIIU", "Little Messi", "Turttle Mbapé", "Haaland"],
      "Ronaldo SIIIIIIU",
      3
    ),
    new Question(
      "What's the best neighborhood?",
      ["Cova da Moura", "Chelas", "Bairro Alto", "Amadora"],
      "Cova da Moura",
      2
    ),
    new Question(
      "What's the most famous portuguese food?",
      [
        "Pastel de Nata",
        "Francesinha",
        "Bacalhau",
        "Bife à Portuguesa",
        "Schinitzel",
      ],
      "Schinitzel",
      3
    ),
    new Question(
      "Who's the taller?",
      ["Michael Jordan", "Shaquille O'Neal", "Kevin Hart", "The Rock"],
      "Kevin Hart",
      2
    ),
    new Question(
      "Who has the best hair?",
      ["Hair Styles", "Emma Stone", "Tayllor Swift", "Andrew Tate"],
      "Andrew Tate",
      1
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
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    progressBar.style.width = `${((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:

    const inputChoices = document.querySelector("#choices");

    quiz.questions[quiz.currentQuestionIndex].choices.forEach((choice) => {
      const label = document.createElement("label");
      label.innerText = choice;
      const choicesRow = document.createElement("input")
      choicesRow.type = "radio";
      choicesRow.name = "choice";
      choicesRow.value = choice;

      const blankSpace = document.createElement("br")
      inputChoices.appendChild(choicesRow)
      inputChoices.appendChild(label)
      inputChoices.appendChild(blankSpace)

    })

  }


  // Hint 1: You can use the `document.createElement()` method to create a new element.
  // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
  // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
  // Hint 4: You can use the `element.innerText` property to set the inner text of an element.


  function nextButtonHandler() {
    let selectedAnswer;
    let correctAnswer // A variable to store the selected answer value

    // YOUR CODE HERE:
    const collectAnswer = document.querySelectorAll(`input[name = "choice"]`)

    for (let i = 0; i < collectAnswer.length; i++) {
      if (collectAnswer[i].checked) {
        selectedAnswer = collectAnswer[i].defaultValue;
        break
      }
    }

    if (selectedAnswer !== undefined) {
      correctAnswer = quiz.checkAnswer(selectedAnswer)
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }
  // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

  // 2. Loop through all the choice elements and check which one is selected
  // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
  //  When a radio input gets selected the `.checked` property will be set to true.
  //  You can use check which choice was selected by checking if the `.checked` property is true.

  // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
  // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
  // Move to the next question by calling the quiz method `moveToNextQuestion()`.
  // Show the next question by calling the function `showQuestion()`.

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
  quiz.timeRemaining = 120;
  let timeRem = document.getElementById("timeRemaining");

  const countDown = setInterval(() => {
    timeRem.innerHTML = `${quiz.timeRemaining}`
    if (quiz.timeRemaining === 0) {
      clearInterval(countDown)
      showResults()
    }
    quiz.timeRemaining--;
    let minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    let seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;


  }, 1000)

  let restarButton = document.getElementById('restartButton');
  restarButton.addEventListener('click', () => {
    window.location.reload();
  });

});
