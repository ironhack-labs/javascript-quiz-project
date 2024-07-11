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
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  const quiz = new Quiz(questions, quizDuration, quizDuration);
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

  let timer;


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



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


    // 1. Show the question
    questionContainer.innerHTML = question.text

    // 2. Update the green progress bar
    const progress = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100
    progressBar.style.width = `${progress}%`

    // 3. Update the question count text 
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`

    // 4. Create and display new radio input element with a label for each choice.
    question.choices.forEach((elm => {

      const inputElement = document.createElement('input')
      inputElement.setAttribute('type', 'radio')
      inputElement.setAttribute('name', 'choice')
      inputElement.setAttribute('class', 'input-choice')
      inputElement.setAttribute('value', elm)
      choiceContainer.appendChild(inputElement)

      const labelElement = document.createElement('label')
      labelElement.textContent = elm
      choiceContainer.appendChild(labelElement)

      const brElement = document.createElement('br')
      choiceContainer.appendChild(brElement)
    }))
  }



  function nextButtonHandler() {

    let selectedAnswer

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choices = document.querySelectorAll('.input-choice')

    // 2. Loop through all the choice elements and check which one is selected
    choices.forEach(elm => {
      if (elm.checked) {
        selectedAnswer = elm.value
      }
    })

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    quiz.checkAnswer(selectedAnswer)
    quiz.moveToNextQuestion()
    showQuestion()
  }


  function showResults() {

    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }




  const intervalId = setInterval(() => {

    quiz.timeRemaining--

    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    if (quiz.timeRemaining === 0) clearInterval(intervalId)
    if (quiz.timeRemaining === 0) return showResults();
    if (quiz.hasEnded()) clearInterval(intervalId);
  }, 1000)
  console.log(`resultado intervalId`)
});
