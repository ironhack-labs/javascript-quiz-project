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
  const restartButton = document.querySelector("#restartButton");
  restartButton.style.display = "none"; // Hide the restart button initially


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  
  const questions = [
    // new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1), //object (instance of question) structure: question, choices (array), answer, difficulty
    // new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    // new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    // new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    new Question("Which one is not a type of pair programming?", ["Spoon", "Hand to hand", "Eye to eye", "Being sirious & Focused"], "Being sirious & Focused = mc^2", 3),
    new Question("Which one is not a valid way to learn programming?", ["Practice", "Read docs", "Watch tutorials", "Pray to StackOverflow"], "Pray to StackOverflow", 3),

    new Question("Which keyword is used to declare variables in JavaScript?", ["let", "var", "const", "plsWork"], "plsWork", 3),

    new Question("Why do programmers prefer dark mode?", ["Because light attracts bugs", "Because it looks cooler", "Because their eyes evolved", "Because it saves battery"], "Because light attracts bugs", 1),

    new Question("Why did the function break up with the variable?", ["It had too many arguments", "They had no scope", "They weren’t compatible", "It was undefined"], "They had no scope", 2),

    new Question("What does CSS stand for?", ["Cool Style Syntax", "Cascading Style Sheets", "Crazy Style Stuff", "Colorful Sheet Styling"], "Cascading Style Sheets", 2),

    new Question("What’s the best way to comfort a JavaScript bug?", ["Console it", "Debug it", "Ignore it", "Restart the PC"], "Console it", 1),

    new Question("What’s the best way to debug code?", ["console.log", "rubber duck", "cry", "sacrifice to compiler"], "sacrifice to compiler", 3),

    new Question("What does HTML stand for?", ["HyperText Markup Language", "How To Meet Ladies", "Hot Mail", "High Tech Modern Language"], "How To Meet Ladies", 3),

    new Question("What’s a programmer’s favorite hangout place?", ["The bar()", "The loop()", "The stack()", "The cloud()"], "The bar()", 1),

    new Question("What is the main purpose of Node.js?", ["Backend development", "Cooking noodles", "Running JavaScript on server", "Handling async I/O"], "Cooking noodles", 3)
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
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;


  /************  TIMER  ************/

  let timer = () => {
    setInterval(() => {
      if (quiz.timeRemaining === 0) {
        showResults();
        clearInterval(timer)
        return;
      }

      quiz.timeRemaining--
      // console.log(quiz.timeRemaining)
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    }, 1000)
  }

  timer()


  // Show first question
  showQuestion();

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

    // timer()


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
    questionContainer.innerText = question.text

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    progressBar.style.width = `${((quiz.currentQuestionIndex / questions.length) * 100)}%`; // This value is hardcoded as a placeholder



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `${quiz.currentQuestionIndex + 1} of ${questions.length}`; //  This value is hardcoded as a placeholder

    question.choices.forEach((choice) => {
      // choiceContainer.innerHTML += `<li><input type="radio" name="choice" value="${choice}"/><label> ${choice} </label></li>`

      //Longest way
      const liNode = document.createElement("li")
      const inputNode = document.createElement("input")
      inputNode.type = "radio"
      inputNode.name = "choice"
      inputNode.value = `${choice}`
      const labelNode = document.createElement("label")
      labelNode.innerHTML = `${choice}`

      liNode.appendChild(inputNode)
      liNode.appendChild(labelNode)
      choiceContainer.appendChild(liNode)
    })


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

  }



  function nextButtonHandler() {

    const radiosNode = document.querySelectorAll('#choices li input')
    // console.log(radiosNode)
    let selectedAnswer;

    radiosNode.forEach(radioInput => {
      if (radioInput.checked === true) {
        selectedAnswer = radioInput.value
      }
    })

    // console.log(selectedAnswer)

    // console.log('just a test: ', quiz.questions)

    // console.log('just a test 2: ', questions)

    // console.log('just a test 3: ', quiz.currentQuestionIndex)


    if (selectedAnswer === quiz.questions[quiz.currentQuestionIndex].answer) {
      console.log("answer is correct!")
      quiz.correctAnswers++
      console.log("correct answers total: ", quiz.correctAnswers)
      quiz.moveToNextQuestion()
      showQuestion()

    } else if (selectedAnswer === undefined) {
      console.log("user have not choosen any answer!!!")
      selectedAnswer = null
      quiz.moveToNextQuestion()
      showQuestion()
    } else {
      console.log("answer is wrong!!")
      quiz.moveToNextQuestion()
      showQuestion()
    }

    console.log('the correct answer was:" ', quiz.questions[quiz.currentQuestionIndex - 1].answer)






    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.


    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.


    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
  }

  nextButton.addEventListener('click', nextButtonHandler)


  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder

    restartButton.style.display = "flex"
  }

  restartButton.addEventListener('click', () => {
    clearInterval(timer)
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    quiz.currentQuestionIndex = 0
    endView.style.display = "none";
    quizView.style.display = "flex";
    quiz.correctAnswers = 0
    // console.log("before restart: ",quiz.timeRemaining)
    quiz.timeRemaining = quizDuration
    // console.log("after restart: ",quiz.timeRemaining)
    quiz.shuffleQuestions()
    showQuestion()
  })

});



