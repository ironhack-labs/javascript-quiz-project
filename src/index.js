document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const QUIZ_LENGTH  = 120;
  const INTRO = `Welcome to the JS Quizz!`;

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
  // Question(tex, choices, answer, difficulty)
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = QUIZ_LENGTH; // 120 seconds (2 minutes)


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
  

  /************  show start page  ************/
  startpage()
  
  

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", ()=>{
    // start timer when start button is being clicked 
    if (nextButton.textContent === "Start"){
      console.log("game started")
      nextButton.textContent = "Answer";
      showQuestion();
      // start counter for the game
      const intrvl = setInterval(()=>{
        const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;
        if (seconds === "00" && minutes === "00"){
          // end game when time reaches
          clearInterval(intrvl);
          quiz.timeRemaining = 120;
          showResults();
        }
        quiz.timeRemaining--;
      },1000);
    }
    
    // call next question when answer button is being clicked
    else if(nextButton.textContent === "Answer"){
      nextButtonHandler();
    }
  });



  /************  FUNCTIONS  ************/



  // Displays the current question and its choices
  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();
    // 1. Show the question
    questionContainer.innerText = question.text;
    // 2. Update the green progress bar
    const progress = (quiz.currentQuestionIndex/quiz.questions.length).toFixed(2)*100
    progressBar.style.width = progress + "%"; // This value is hardcoded as a placeholder
    // 3. Update the question count text 
    const currentq = quiz.currentQuestionIndex+1;
    const totalq = quiz.questions.length;
    questionCount.innerText = `Question ${currentq} of ${totalq}`; //  This value is hardcoded as a placeholder
    
    // 4. Create and display new radio input element with a label for each choice.
    const choicesDiv = document.createElement("div");
    question.choices.forEach(choice =>{
      choiceContainer.innerHTML +=`
      <input type="radio" name="choice" value="${choice}">
        <label>${choice}</label>
      <br>
      `
    })
    questionContainer.appendChild(choicesDiv)
  }


  // Handles the click on the next button
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const inputChoices = document.querySelectorAll("#choices input[type='radio']");
    console.log(inputChoices);
    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
      inputChoices.forEach((choice) =>{
        if(choice.checked){
          selectedAnswer = choice.value
          console.log(selectedAnswer)
        }
      })
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
      if(!selectedAnswer){
        alert("Answer not chosen, please select an answer");
      }else{
        quiz.checkAnswer(selectedAnswer);
        console.log(quiz.correctAnswers);
        quiz.moveToNextQuestion()
        showQuestion();
      }
  }  

  
  //Displays the end view and the quiz results
  function showResults() {
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";
    // 2. Show the end view (div#endView)
    endView.style.display = "flex";
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
    const result = document.querySelector("#restartButton");
    result.addEventListener("click", restartQuiz);

  }
 
  // Reset everything and redirect to startpage
  function restartQuiz(){
    console.log("quiz restarted")
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.timeRemaining = QUIZ_LENGTH;
    nextButton.textContent = "Start";
    progressBar.style.width = "0%"; 
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";
    startpage();
  }

  function startpage(){
    // reset everything to default
    questionCount.textContent = INTRO
    const intro = document.createElement('p');
    const intro_content = `
    <p style="text-align: center">
    There are total of ${quiz.questions.length} questions 
    <br>total time: ${minutes}:${seconds}
    <br>click 'Start' to start quiz try to finish them 
    </p>`;
    choiceContainer.innerHTML = intro_content
    questionContainer.appendChild(intro);
  }
  
});