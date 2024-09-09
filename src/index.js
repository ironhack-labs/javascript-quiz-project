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
  const resetQuizButton = document.querySelector("#restartButton");
  const resultContainer = document.querySelector("#result");


  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";



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
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)



  const quiz = new Quiz(questions, quizDuration, quizDuration);

  quiz.shuffleQuestions();

  const timeRemainingContainer = document.getElementById("timeRemaining");
  
  showQuestion();

  let timer;
  startTimer(timer)

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  resetQuizButton.addEventListener("click", resetQuiz);


  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerText = questions[quiz.currentQuestionIndex].text;


    let progress = (quiz.currentQuestionIndex / questions.length) * 100;

    progressBar.style.width = `${progress}%`;


    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      questions.length
    }`; 
    question.choices.forEach((element, index) => {
      const radioButtonLabel = document.createElement("label");
      const radioButton = document.createElement("input");
      const br = document.createElement("br");
      radioButtonLabel.textContent = `${element}`;
      radioButton.type = "radio";
      radioButton.name = "choice";
      radioButton.value = element;
      radioButton.id = `choice-${index}`;
      radioButtonLabel.htmlFor = `choice-${index}`;
      choiceContainer.appendChild(radioButton);
      choiceContainer.appendChild(radioButtonLabel);
      choiceContainer.appendChild(br);
    });
  }
  console.log(quiz.timeRemaining)
  function nextButtonHandler() {
    let selectedAnswer;
    const choices = document.querySelectorAll("input");
    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });
    if(selectedAnswer !== undefined) {
      const currentQuestion = questions[quiz.currentQuestionIndex];

      if(currentQuestion && currentQuestion.answer !== undefined) {
        const isCorrect = selectedAnswer === currentQuestion.answer;
        if (isCorrect) {
          quiz.correctAnswers += 1;
        }
        quiz.currentQuestionIndex++;
        showQuestion();
      } else {
        console.error('Current question undefined')
      }
    } else {
      console.error('Please select an answer before proceeding.')
    }
  }
  document.getElementById("nextButton").addEventListener("click", () => {
    nextButtonHandler();
  });

  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;
  }

  function resetQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    quiz.timeRemaining = 120;
    quizView.style.display = "flex";
    endView.style.display = "none";
    showQuestion()
    startTimer(timer)
  }
  function startTimer (timer) {
    timer = setInterval(() => {
      const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      quiz.timeRemaining -= 1;
      timeRemainingContainer.innerText = `Remaining Time: ${minutes}:${seconds}`
      if(quiz.timeRemaining < 0 || quiz.hasEnded()) {
        showResults()
        clearInterval(timer)
      }
    },1000)
  }

});

