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

  const restartBtn = document.querySelector("#restartButton")

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("¿Cuántas veces ha dicho Jorge la palabra PATATA en el bootcamp?", ["10", "100", "incontables", "2"], "incontables", 1),
    new Question(
      "¿Dónde esta Iñigo?",
      ["Bilbao", "Marbella", "Oslo", "Marsella"],
      "Marsella",
      1
    ),
    new Question(
      "¿Cuánto vale un juego de Pong?",
      ["gratis", "7.500", "10", "5"],
      "7.500",
      2
    ),
    new Question(
      "¿Qué capacidad se pierde cuando inicias el bootcamp de Ironhack?",
      ["el habla", "descansar", "dormir sin soñar en codigo", "crear bucles"],
      "el habla",
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
  
  let timer = setInterval(() =>{
    
    quiz.timeRemaining--
    const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    if(quiz.timeRemaining === 0){
      clearInterval(timer)
      showResults()
    }

  }, 1000)
 

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartBtn.addEventListener("click", () => {
      quiz.timeRemaining = 120;
      quiz.correctAnswers = 0;
      quiz.currentQuestionIndex = 0;
    // queremos que el timeremaining pase de 0 a 120 
    //cambiar el current question index a 0 
    // empezar el juego de nuevo, mostrar la pagina de preguntas 
   // cambia el correctAnswer a 0 
    //  esconder la pagina de resultados end view
    quizView.style.display = "flex";
    endView.style.display = "none";
    showQuestion()



  })


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

    console.log(question);

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    // progressBar.style.width = `65%`; // This value is hardcoded as a placeholder
    console.log(quiz);

    let currentQuestion = quiz.currentQuestionIndex + 1;

    let totalQuestions = quiz.questions.length;

    let progressBarActiva = (currentQuestion / totalQuestions) * 100;
    console.log(progressBarActiva);
    let porcentaje = `${progressBarActiva}%`;
    progressBar.style.width = porcentaje;

    // si es la primera un 10% incrementando en 10 con cada pregunta

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${currentQuestion} of ${totalQuestions}`;
    //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    const opicionesParaPreguntas = question.choices;

    opicionesParaPreguntas.forEach((eachChoices) => {
      const eleccionRadio = document.createElement("div");
      eleccionRadio.innerHTML =`<input type="radio" name="choice" value="${eachChoices}">
      <label>${eachChoices}</label>
    <br>` ;
   choiceContainer.append(eleccionRadio)
      
    });
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
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
     let allChoices = document.querySelectorAll("#choices input")
     console.log(allChoices);

     allChoices.forEach((elem) =>{
       if(elem.checked === true ){
        selectedAnswer = elem.value 
      }


     })

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
     quiz.checkAnswer(selectedAnswer)
     quiz.moveToNextQuestion()
     showQuestion()

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
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length}correct answers!`; // This value is hardcoded as a placeholder
  }
});
