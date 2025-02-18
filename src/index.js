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
  const reloadButton = document.querySelector("#restartButton");

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


  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let time = quizDuration; // your time in seconds here
  const timeRemainingContainer = document.getElementById("timeRemaining");
  startTimer(time, timeRemainingContainer);

  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.innerText = `Remaining time: ${minutes}:${seconds}`;

      if (--timer < 0) {
        timer = 0;
        showResults();
        myStopFunction();
        // timer = duration; // uncomment this line to reset timer automatically after reaching 0
      }
    }, 1000);
  }

  function myStopFunction() {
    clearInterval(myInterval);
  }
  /************  EVENT LISTENERS  ************/

  document.querySelector("#nextButton").addEventListener("click", nextButtonHandler);
  document.querySelector("#restartButton").addEventListener("click", reloadButtonHandler);


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

    let questionElement = document.querySelector("#question");
    questionElement.innerHTML = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    let progressBar = document.querySelector("#progressBar");
    let progressPercentage = 0;
    progressPercentage += ((quiz.currentQuestionIndex) * (100/quiz.questions.length));
    progressBar.style.width = `${progressPercentage}%`;

    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    questionCount.innerText = `Question ${quiz.currentQuestionIndex+1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder
    
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
    let choicesContainer = document.getElementById("choices");

    for(let i=0; i<question.choices.length; i++){
      //let radioGroupItem = `<div class="answer">
      //  <input type="radio" id="answer-${i}" name="answer" value="${question.choices[i]}" />
      //  <label for="answer-${i}">${question.choices[i]}</label></div>`;
      let value = question.choices[i];

      let radioDiv = document.createElement("div");
      radioDiv.setAttribute("class", "answer")

      let radioInput = document.createElement('input');
      radioInput.setAttribute("type", "radio");
      radioInput.setAttribute("name", "answer");
      radioInput.setAttribute("id", "answer"+i);
      radioInput.setAttribute("value", value);
      radioInput.addEventListener("click", e =>
            e.target.setAttribute("checked", "checked")
      );

      let radioLabel = document.createElement("label");
      radioLabel.setAttribute("for", "answer"+i)
      radioLabel.innerText = value;

      radioDiv.append(radioInput, radioLabel);
      choicesContainer.append(radioDiv);
    }
  }

  function reloadButtonHandler () {
    window.location.reload();
  }

  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value
    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    let choiceElements = document.getElementsByName("answer");
    let message = document.getElementById("message");
    message.style.display = "none";
    message.innerHTML ="* Please select an answer";
    message.style.color = "red";
    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
    for(let i=0; i<choiceElements.length; i++){
      if(choiceElements[i].checked === true){
        //console.log(choiceElements[i].value);
        selectedAnswer = choiceElements[i].value;
        break;
      }
    }
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
    if (selectedAnswer !== "" && selectedAnswer !== undefined) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    } else {
      message.style.display = "block";
    }
  }




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
  
});
