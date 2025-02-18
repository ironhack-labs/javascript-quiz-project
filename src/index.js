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
  const restartButton = document.querySelector("#restartButton");
  const error = document.querySelector("#error");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";
  error.style.display = "none";

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
    new Question(
      "Which planet is known as the Red Planet?",
      ["Earth", "Mars", "Jupiter", "Venus"],
      "Mars",
      1
    ),
    new Question(
      "What is the boiling point of water at sea level?",
      ["90°C", "100°C", "110°C", "120°C"],
      "100°C",
      2
    ),
    new Question(
      "What does HTML stand for?",
      [
        "Hyper Text Markup Language",
        "High Tech Machine Learning",
        "Home Tool Management Language",
        "Hyperlink and Text Markup Language",
      ],
      "Hyper Text Markup Language",
      2
    ),
    new Question(
      "Which gas do plants primarily use for photosynthesis?",
      ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      "Carbon Dioxide",
      3
    ),
    new Question(
      "Who painted the Mona Lisa?",
      ["Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Rembrandt"],
      "Leonardo da Vinci",
      2
    ),
    new Question(
      "What is the largest mammal in the world?",
      ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
      "Blue Whale",
      1
    ),
    new Question(
      "Which element has the chemical symbol 'O'?",
      ["Oxygen", "Gold", "Osmium", "Iron"],
      "Oxygen",
      2
    ),
    new Question(
      "How many continents are there on Earth?",
      ["5", "6", "7", "8"],
      "7",
      1
    ),
    new Question(
      "What is the speed of light in vacuum?",
      ["300,000 km/s", "150,000 km/s", "3,000 km/s", "1,000 km/s"],
      "300,000 km/s",
      3
    ),
    new Question(
      "Who wrote 'To Kill a Mockingbird'?",
      ["Harper Lee", "J.K. Rowling", "Mark Twain", "F. Scott Fitzgerald"],
      "Harper Lee",
      2
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  function updateTimer() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  function setTimer() {
    let timer = setInterval(() => {
      quiz.timeRemaining--;
      updateTimer();
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        quiz.hasEnded();
        showResults();
        return;
      }
    }, 1000);
  }
  setTimer();

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
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // 2. Update the green progress bar
    // 3. Update the question count text
    // 4. Create and display new radio input element with a label for each choice.

    questionContainer.innerText = question.text;

    const totalQuestions = questions.length;
    const currentQuestionIndex = quiz.currentQuestionIndex;
    const percentQuestion = (currentQuestionIndex / totalQuestions) * 100;

    progressBar.style.width = `${percentQuestion}%`;

    function updateQuestionCount(currentQuestionIndex) {
      questionCount.innerText = `Question ${
        currentQuestionIndex + 1
      } of ${totalQuestions}`;
      currentQuestionIndex + 1;
    }
    updateQuestionCount(currentQuestionIndex);

    // Loop through the current question `choices`.
    question.choices.forEach((answer, index) => {
      const choice = document.createElement("input");
      choice.type = "radio";
      choice.name = "choice";
      choice.id = `choice${index}`;
      choice.value = answer;

      const label = document.createElement("label");
      label.htmlFor = answer.id;
      label.innerText = answer;

      const choicesDiv = document.createElement("div");
      choicesDiv.appendChild(choice);
      choicesDiv.appendChild(label);

      choiceContainer.appendChild(choicesDiv);
    });

    // For each choice create a new radio input with a label, and append it to the choice container.

    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input id = "choice1" type="radio" name="choice" value="CHOICE TEXT HERE">
          <label for="choice1">CHOICE TEXT HERE </label>
        <br>
      */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const allChoices = document.querySelectorAll("input[name='choice']");
    allChoices.forEach((choice) => {
      // 2. Loop through all the choice elements and check which one is selected
      if (choice.checked) {
        selectedAnswer = choice.value;
        error.style.display = "none";
      }
    });

    if (!selectedAnswer) {
      error.style.display = "flex";
      error.innerText =
        "Please select an answer before moving to the next question!";
      return;
    }
    //3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    if (selectedAnswer) {
      if (quiz.checkAnswer(selectedAnswer)) {
        console.log("Correct");
      } else {
        console.log("Wrong");
      }
    }
    quiz.moveToNextQuestion();
    showQuestion();
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true
    //  You can use check which choice was selected by checking if the `.checked` property is true.

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
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder

    // Dispalying the message
    const message = document.getElementById("message");
    const resultPercentage = (quiz.correctAnswers * 100) / questions.length;
    if (resultPercentage > 90) {
      message.innerText =
        "Very Good. You have answered almost all the questions!";
    } else if (resultPercentage < 40) {
      message.innerText = "What a pity :(  You can try one more time";
      message.style.color = "#d9534f";
      message.style.backgroundColor = "#ffe6e6";
      message.style.border = "1px solid #d9534f";
    } else if (resultPercentage > 60) {
      message.innerText = "Good Job! If you want you can try again";
    } else {
      message.innerText = "It's on your side, you can try again or not ;)";
      message.style.color = "#856404";
      message.style.backgroundColor = "#fff3cd";
      message.style.border = "1px solid #ffc107";
    }
    if (quiz.timeRemaining === 0) {
      message.innerText = "Time Out! Dzin dzin dzin";
      message.style.color = "#721c24";
      message.style.backgroundColor = "#f8d7da";
      message.style.border = "1px solid #dc3545";
    }
  }

  //LAST ONE: Implement a “Restart Quiz” button:
  function restartButtonHandler() {
    quizView.style.display = "block";
    endView.style.display = "none";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    quiz.timeRemaining = 120;
    updateTimer();
    setTimer();
    showQuestion();
  }
});
