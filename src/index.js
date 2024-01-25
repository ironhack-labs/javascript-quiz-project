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

  const restartQuizButton = document.querySelector("#restartButton");


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
  // const quizDuration = 120; // 120 seconds (2 minutes)
  const quizDuration = 15; // modify for the test


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
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  const timerElm = document.getElementById("timeRemaining");

  /*let timer = setInterval(() => {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timerElm.innerHTML = `${minutes}:${seconds}`;
    if (quiz.timeRemaining === 0) {
      showResults()
    }
    quiz.timeRemaining -= 1;
  }, 1000)*/

  /*
  Implemented recursive timer() function to replace setInterval(), as it isn't started automatically.
  This way we can reuse the function when calling restartQuiz() without having to rewrite the setInterval() code block.
  */

  let timerRunning = true;
  const timer = (time) => {
    

    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    timerElm.innerHTML = `${minutes}:${seconds}`;
    time--;

      setTimeout(() => {
        
        if (time === 0 || !timerRunning) {
          timerRunning = false;
          showResults()
          time = null;
        }
  
        if (timerRunning) {timer(time)};

      }, 1000);
    


  }

  // Manually starting timer()
  timer(quiz.timeRemaining);




  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartQuizButton.addEventListener("click", restartQuiz);



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

    progressBar.style.width = `${(quiz.currentQuestionIndex + 1) * 100 / quiz.questions.length}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    //questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

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

    quiz.questions[quiz.currentQuestionIndex].choices.forEach(element => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = element;
      const label = document.createElement("label");
      label.innerHTML = element;
      const br = document.createElement("br");
      li.appendChild(input);
      li.appendChild(label);
      li.appendChild(br);
      choiceContainer.appendChild(li);
    })
  }



  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    // const choiceElements = choices.querySelector('> *');
    const choiceElements = choiceContainer.getElementsByTagName("input");

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    selectedAnswer = [...choiceElements];

    selectedAnswer.forEach(choice => {

      if (choice.checked) {

        // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
        // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
        // Move to the next question by calling the quiz method `moveToNextQuestion()`.
        // Show the next question by calling the function `showQuestion()`.

        quiz.checkAnswer(choice.value)
        quiz.moveToNextQuestion();
        showQuestion();
      }
    })
  }




  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    timerRunning = false;
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  function restartQuiz() {
    endView.style.display = "none";
    quizView.style.display = "flex";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    quiz.getQuestion();
    showQuestion();

    // Resetting timer upon quiz restart
    timerRunning = true;
    timer(quiz.timeRemaining)
  }

});