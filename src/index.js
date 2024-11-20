document.addEventListener("DOMContentLoaded", () => {
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const resultContainer = document.querySelector("#result");
  const timeRemainingContainer = document.getElementById("timeRemaining");
  const restartButton = document.querySelector("#restartButton");

  quizView.style.display = "block";
  endView.style.display = "none";

  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    new Question("What is the largest planet in our solar system?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter", 2),
  ];
  const quizDuration = 120;

  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  let timer;
  let firstQuestionAnswered = false;  

  showQuestion();
  startTimer();

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartQuiz);

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      quiz.timeRemaining--;
      updateTimerDisplay();
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  function restartQuiz() {
    endView.style.display = "none";
    quizView.style.display = "block";
    
    
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;
    quiz.shuffleQuestions();
  
    
    progressBar.style.width = '0%'; 
    updateTimerDisplay(); 
    
    
startTimer();
    
showQuestion();
    
   
    firstQuestionAnswered = false;
  }
  

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return ;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerText = question.text;

    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.totalQuestions}`;

    question.choices.forEach(choice => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = "choice";
      choiceInput.value = choice;

      choiceLabel.innerText = choice;
      choiceContainer.appendChild(choiceInput);
      choiceContainer.appendChild(choiceLabel);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;
    const choices = document.querySelectorAll('input[name="choice"]');
    choices.forEach(choice => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();

      
      if (!firstQuestionAnswered) {
        firstQuestionAnswered = true;  
      }

      updateProgressBar();
      showQuestion();
    } else {
      alert("Please select an answer before proceeding.");
    }
  }

  function updateProgressBar() {
    
    const percentage = ((quiz.currentQuestionIndex) / quiz.totalQuestions) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  function showResults() {
    console.log("Showing results...");
  
    clearInterval(timer); 
  
    quizView.style.display = "none";
    endView.style.display = "flex";  
  
    const correctAnswers = quiz.getCorrectAnswersCount();
  
    console.log('Correct Answers: ', correctAnswers);
  
    const resultMessage = `You answered ${correctAnswers} out of ${quiz.totalQuestions} questions correctly!`;
  
    resultContainer.innerText = resultMessage;
  
    console.log("Result displayed: ", resultMessage);
  }
  
  
  
});