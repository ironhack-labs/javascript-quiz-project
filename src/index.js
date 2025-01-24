document.addEventListener("DOMContentLoaded", () => {
  
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  const resultContainer = document.querySelector("#result");

  quizView.style.display = "block";
  endView.style.display = "none";

  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
  ];
  const quizDuration = 120; 

  const quiz = new Quiz(questions, quizDuration, quizDuration);
  
  quiz.shuffleQuestions();

  function refactor() {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  const timeRemainingContainer = document.getElementById("timeRemaining");
  refactor();

  showQuestion();

  let timer;

  nextButton.addEventListener("click", nextButtonHandler);

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
  
    question.shuffleChoices();


    questionContainer.innerText = question.text;
   
    const progressPercentage = (quiz.currentQuestionIndex / quiz.questions.length) * 100
    progressBar.style.width = `${progressPercentage}%`; 


    questionCount.innerText = `Question ${quiz.currentQuestionIndex} of ${quiz.questions.length}`; 
    
    question.choices.forEach((choice) => {
      const input = document.createElement("input")
      const label = document.createElement("label")
      const br = document.createElement("br")
      label.innerText = choice
      input.type = "radio"
      input.name = "choice"
      input.value = choice
      choiceContainer.appendChild(br)
      choiceContainer.appendChild(input)
      choiceContainer.appendChild(label)
    });
    
  }

  startTimer();

  function nextButtonHandler() {
    let selectedAnswer; 
    
    const allChoices = document.querySelectorAll(`input[name = "choice"]`)
    allChoices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    })
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer)
      quiz.moveToNextQuestion()
      showQuestion()
    }

  }

  function showResults() {

    clearInterval(timer);

    quizView.style.display = "none";

    endView.style.display = "block";

    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; 
  };


  const restartButton = document.getElementById("restartButton")
  restartButton.addEventListener(`click`, restartQuiz)

  function restartQuiz() {
    endView.style.display = `none`
    quizView.style.display = `block`

    quiz.currentQuestionIndex = 0
    quiz.correctAnswers = 0
    quiz.timeRemaining = quizDuration

    quiz.shuffleQuestions();
    clearInterval(timer)
    startTimer()
    showQuestion();
  }
  function startTimer() {

    clearInterval(timer)

    timer = setInterval(() => {
      quiz.timeRemaining--;

      refactor();

      if (quiz.timeRemaining <= 0) {
        clearInterval(timer)
        showResults();
      }
    }, 1000)
  }
})



