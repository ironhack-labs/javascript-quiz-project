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
  const restartButton = document.querySelector('#restartButton');


  



  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  // text , choices : array , answer , diff
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
  ];

  /************  QUIZ INSTANCE  ************/
  const quizDuration = 120;
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
  const timer = {
    id : null,
    startTimer() {
          this.id = setInterval(() => {
          quiz.timeRemaining--;
          updateTimerDisplay();
          if(quiz.timeRemaining <= 0) {
            this.stopTimer();
            showResults();
            return;
          }
      
        },1000) ;
      },
      stopTimer(){
        clearInterval(this.id);
      }
  };

  timer.startTimer();

  function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  



  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener('click', restartButtonHandler);



  /************  FUNCTIONS  ************/
  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      clearInterval(timer);
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerHTML = question.text;

    /* we used the join methode to get ride of the comma that inserted 
    by default to the items in an array */
    choiceContainer.innerHTML = 
    question.choices.map (
      choice => `<li>${choice}</li>`).join('');
    

    
    progressBar.style.width =
     `${((quiz.currentQuestionIndex + 1) / questions.length) * 100}%`; // This value is hardcoded as a placeholder
    


    questionCount.innerText = 
    `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

      
      choiceContainer.querySelectorAll('li').forEach((li) => {
        const radioInput = document.createElement('input');
        const label = document.createElement('label');
        const br = document.createElement('br');
        
        radioInput.type = 'radio';
        radioInput.name = 'choice';
        radioInput.value = `${li.innerText}`;
        
        label.innerHTML = `${li.innerText}`;

        li.innerText = "";
        li.appendChild(radioInput);
        li.appendChild(label);
      });
  }


  
  function nextButtonHandler () {
    const choices = choiceContainer.querySelectorAll('li');

      const checked = [...choices].find((choice) => {  
        const input = choice.querySelector('input');
        return input.checked === true;
    });

    if(checked) {
      const selectedAnswer = checked.querySelector('label').innerHTML;
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
      }
    }





  function showResults() {
    timer.stopTimer();
    quizView.style.display = "none";
    endView.style.display = "flex";
    
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;

  }
  
  function restartButtonHandler() {
    quiz.timeRemaining = quizDuration;
    updateTimerDisplay();
    timer.startTimer();
  
      quizView.style.display = "block";
      endView.style.display = "none";
  
      quiz.currentQuestionIndex = 0;
      quiz.correctAnswers = 0;
      quiz.shuffleQuestions();
      showQuestion();
  }
}

);


