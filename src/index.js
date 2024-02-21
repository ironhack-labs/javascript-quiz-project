document.addEventListener('DOMContentLoaded',() => {
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
  const restartButton = document.querySelector("#restartButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  // something else
  let timeRanOut = false


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
    new Question('who dis?',['keanu','mr potato head','the goodyear blimp','brendan eich'],'keanu',1,'picture','/img/50.jpeg'),
    new Question('what dis?',['a horse','mr potato head','keanu','brendan eich'],'a horse',1,'sound','/sound/horse.ogg'),
    new Question('nevva gonna what?',['give you up','keanu','learn javascript','eat broccolli'],'give you up',1,'video','/video/never.mp4')
    // Add more questions here
  ];
  


  /************  QUIZ INSTANCE  ************/
  
  const quizDuration = 120
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

 
    let timerDuration = quiz.timeLimit; // 120 seconds (2 minutes)
    //quiz.timeRemaining = timeRemaining;
    let endTimer = false
  
    const toMinutesAndSeconds = number => {
      const minutes = Math.floor(number / 60).toString().padStart(2, "0");
      const seconds = (number % 60).toString().padStart(2, "0");
      return ({minutes,seconds})
    }
  
    function timer(){
      document.getElementById('timeRemaining').innerHTML = toMinutesAndSeconds(timerDuration).minutes + ':' + toMinutesAndSeconds(timerDuration).seconds;
      timerDuration--;
      var timer = setInterval(function(){
          document.getElementById('timeRemaining').innerHTML = toMinutesAndSeconds(timerDuration).minutes + ':' + toMinutesAndSeconds(timerDuration).seconds;
          timerDuration--;
          quiz.timeRemaining--;
          if (timerDuration < 0) {
              timeRanOut = true
              clearInterval(timer);
              showResults()
          }
          if (endTimer) {
            clearInterval(timer);
          }
      }, 1000);
  }
  
  // ****

  // Show first question
  showQuestion();
  timer()




//******** */

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);



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
    questionContainer.innerText = quiz.currentQuestionIndex;
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    const imageElement = document.getElementById('image-question-image')
    
    //console.log('question',question)
    if (question.type === 'picture') {
      imageElement.setAttribute('src',question.media)
      imageElement.style.display = 'block'
    }
    else {
      imageElement.setAttribute('src','')
      imageElement.style.display = 'none'
    }

    

    


    // else {
    //   soundElement.setAttribute('src','')
    //   soundContainer.style.display = 'none'
    // }
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();
    
    

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    document.querySelector('#question').innerHTML = question.text

    if (question.type === 'sound') {
      const soundContainer = document.createElement('audio')
      const soundElement = document.createElement('source')
      soundElement.setAttribute('src',question.media)
      soundElement.setAttribute('type','audio/mp3')
      soundElement.setAttribute('id', 'sound-question-sound')
      soundContainer.classList.add('sound-question-container')
      soundContainer.setAttribute('controls',true)
      soundContainer.setAttribute('autoplay',true)
      soundContainer.appendChild(soundElement)
      document.querySelector('#question').insertAdjacentElement('afterend',soundContainer)
    }
    else {
      if (document.querySelector('.sound-question-container')){
        document.querySelector('.sound-question-container').remove()
      }
    }

    if (question.type === 'video') {
      const videoContainer = document.createElement('video')
      const videoElement = document.createElement('source')
      videoElement.setAttribute('src',question.media)
      videoElement.setAttribute('type','video/mp4')
      videoElement.setAttribute('id', 'video-question-video')
      videoContainer.classList.add('video-question-video')
      videoContainer.setAttribute('controls',true)
      videoContainer.setAttribute('autoplay',true)
      videoContainer.appendChild(videoElement)
      document.querySelector('#choices').insertAdjacentElement('beforebegin',videoContainer)
    }
    else {
      if (document.getElementsByClassName('video-question-video')[0]){
        document.getElementsByClassName('video-question-video')[0].remove()
      }
    }


    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    
    progressBar.style.width = (quiz.currentQuestionIndex / quiz.questions.length) * 100 + "%"; // This value is hardcoded as a placeholder

  


    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    let currentQuestion = 1;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${questions.length}`; //  This value is hardcoded as a placeholder


    
    // 4. Create and display new radio input element with a label for each choice.
    // { text: "Question 1", choices: ["a", "b", "c"], answer: "b" }...
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

      question.choices.forEach(element => {
        choiceContainer.innerHTML += `<li><input type="radio" name="answer" value="${element}"> ${element}</li>`;
      });
      
      const choiceInputs = document.querySelectorAll('input')
      choiceInputs.forEach(element => element.addEventListener("input", () => {
        //console.log('selected',element)
        if (nextButton.disabled = true) {
          nextButton.disabled = false

        }
      }))


  }


  
  
  function nextButtonHandler () {
    let selectedAnswer = null; // A variable to store the selected answer value



    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.

      document.querySelectorAll('input').forEach(element => {if (element.checked) selectedAnswer = element})
      //console.log('answer', selectedAnswer.value())
      //console.log('check', quiz.checkAnswer(selectedAnswer.value))
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
      //console.log(selectedAnswer);
      if (selectedAnswer !== null) {
         
          
          quiz.checkAnswer(selectedAnswer.value);
          quiz.moveToNextQuestion();
          showQuestion();
          selectedAnswer = null;
          
          nextButton.disabled = true;
        }

      
  }  




  function showResults() {

    endTimer = true
    if (document.getElementsByClassName('video-question-video')[0]){
      document.getElementsByClassName('video-question-video')[0].remove()
    }
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    const returnImage = (correctAnswers, questions) => {
      const percentage = (correctAnswers / questions) * 100
      //console.log(percentage)
      const images = {
        great: '/img/75.webp',
        good: '/img/50.jpeg',
        promising: '/img/25.jpeg',
        sad: '/img/default.webp'
      }

      if (percentage > 75) return images.great
      if (percentage > 49) return images.good
      if (percentage > 24) return images.promising
      return images.sad
    }

    const returnSuccessText = (correctAnswers, questions) => {
      const percentage = (correctAnswers / questions) * 100
      //console.log(percentage)
      const text = {
        great: 'You are the one',
        good: 'You\'re breathtaking',
        promising: 'You\'re going\nto military school ',
        sad: 'You made Keanu sad'
      }

      if (percentage > 75) return text.great
      if (percentage > 49) return text.good
      if (percentage > 24) return text.promising
      return text.sad
    }

    const minutesRemaining = Number(toMinutesAndSeconds(quiz.timeLimit - quiz.timeRemaining).minutes)
    const secondsRemaining = Number(toMinutesAndSeconds(quiz.timeLimit - quiz.timeRemaining).seconds)

    const minutesRemainingMessage = minutesRemaining > 0 
                                      ? minutesRemaining === 1 
                                        ? ' 1 minute ' 
                                        : minutesRemaining + ' minutes ' + secondsRemaining > 0 ? 'and' : ''
                                      : '';
    const secondsRemainingMessage = secondsRemaining  > 0 
                                      ? secondsRemaining === 1 
                                        ? ' 1 second ' 
                                        : secondsRemaining + ' seconds ' 
                                      : '';
    
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!
    
    You ${timeRanOut ? 'ran out of time' : 'took ' + minutesRemainingMessage + ' ' + secondsRemainingMessage + ' to finish the quiz!'}`; // This value is hardcoded as a placeholder

    //console.log('image:', returnImage(quiz.correctAnswers,quiz.questions.length))
    document.getElementById('results-image').setAttribute('src',returnImage(quiz.correctAnswers,quiz.questions.length))
    document.getElementById('results-image').setAttribute('src',returnImage(quiz.correctAnswers,quiz.questions.length))
    document.getElementById('success-text').innerText = returnSuccessText(quiz.correctAnswers,quiz.questions.length)
    setTimeout(() => document.getElementById('results-image').style.opacity = 1,250)
    
  }

  function restartButtonHandler() {
        // YOUR CODE HERE:
        timerDuration = quiz.timeLimit;
        quiz.shuffleQuestions();
        quiz.currentQuestionIndex = 0;
        quiz.correctAnswers = 0;
        showQuestion();
        document.getElementById('results-image').style.opacity = 0
        document.getElementById('results-image').setAttribute('src','/img/blank.png')
        endTimer = false
        timeRanOut = false
        timer();
    
    //
    // 1. Show the quiz view (div#quizView)
    quizView.style.display = "flex";

    // 2. Hide the end view (div#endView)
    endView.style.display = "none";


  }
  
}
)

