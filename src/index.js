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
        new Question("What is the term for a group of flamingos?", ["A flock", "A flamboyance", "A colony", "A parade"], "A flamboyance", 2),
        new Question("What is the only fruit that has its seeds on the outside?", ["Strawberry", "Apple", "Banana", "Cherry"], "Strawberry", 1),
        new Question("What color is the Black Panther?", ["Black", "White", "Pink", "Blue"], "Black", 1),
        new Question("What’s heavier: 1 kilogram of feathers or 1 kilogram of bricks?", ["Feathers", "Bricks", "They weigh the same", "Depends on the size"], "They weigh the same", 1),
        new Question("I’m so fragile that if you say my name, you’ll break me. What am I?", ["Glass", "Silence", "Me", "A word"], "Silence", 1),
        new Question("What two words, when combined, hold the most letters?", ["Post Office", "Post pre", "My Office", "Nothing"], "Post Office", 1),
        new Question("What word is spelled incorrectly in every single dictionary?", ["Incorrectly", "None", "Almost none", "Every word"], "Incorrectly", 1),
        new Question("What's the meaning of the word 'Guarrito' in Málaga?", ["Small person that doesn't shower", "Normal person that doesn't shower", "A bird", "An electric drill"], "A electric drill", 3),
        new Question("In binary what is 2 + 2?", ["4", "22", "010", "0100"], "0100", 2),
        new Question("Which Doctor's companion was the first in saying 'It's smaller on the outside', instead of the classical 'It's bigger on the inside'?", ["Clara Oswald", "Rose Tyler", "That seems sexual, and I don't watch porn?¿?", "Donna Noble"], "Clara Oswald", 2),
    ];
    const quizDuration = 20; // 120 seconds (2 minutes)

    /************  QUIZ INSTANCE  ************/

    // Create a new Quiz instance object
    const quiz = new Quiz(questions, quizDuration, quizDuration);
    // Shuffle the quiz questions
    quiz.shuffleQuestions();

    /************  SHOW INITIAL CONTENT  ************/
    function secondsToStrings(timeInseconds) {
        const minutes = Math.floor(timeInseconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (timeInseconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
    // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = secondsToStrings(quiz.timeRemaining);

    // Show first question
    showQuestion();

    /************  TIMER  ************/

    let timer = setInterval(() => {
        quiz.timeRemaining--;
        timeRemainingContainer.innerText = secondsToStrings(quiz.timeRemaining);
        if (quiz.timeRemaining === 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);

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

        // 2. Update the green progress bar
        // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
        let progressPercentage = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`; // This value is hardcoded as a placeholder

        // 3. Update the question count text
        // Update the question count (div#questionCount) show the current question out of total questions

        questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

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

        // choiceContainer.innerHTML = `
        // <input type="radio" name="choice" value="ABC">
        // <label>ABC</label>
        // <br>
        // <input type="radio" name="choice" value="123">
        // <label>123</label>
        // `;

        question.choices.forEach((eachChoice) => {
            let inputNode = document.createElement("input");
            inputNode.type = "radio";
            inputNode.name = "choice";
            inputNode.value = eachChoice;
            let labelNode = document.createElement("label");
            labelNode.innerText = eachChoice;
            let brNode = document.createElement("br");

            choiceContainer.append(inputNode, labelNode, brNode);
        });
    }

    function nextButtonHandler() {
        let selectedAnswer; // A variable to store the selected answer value

        // YOUR CODE HERE:
        //
        // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

        let choiceElementsNodeList = document.querySelectorAll("#choices input");
        // 2. Loop through all the choice elements and check which one is selected
        choiceElementsNodeList.forEach((eachChoice) => {
            if (eachChoice.checked) {
                selectedAnswer = eachChoice.value;
            }
        });

        if (selectedAnswer) {
            quiz.checkAnswer(selectedAnswer);
            quiz.moveToNextQuestion();
            showQuestion();
        }

        // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
        //  When a radio input gets selected the `.checked` property will be set to true.
        //  You can use check which choice was selected by checking if the `.checked` property is true.

        // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
        // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
        // Move to the next question by calling the quiz method `moveToNextQuestion()`.
        // Show the next question by calling the function `showQuestion()`.
    }
    function showEndView() {
        // 1. Hide the quiz view (div#quizView)
        quizView.style.display = "none";

        // 2. Show the end view (div#endView)
        endView.style.display = "flex";
    }
    function showQuizView() {
        endView.style.display = "none";
        quizView.style.display = "flex";
    }

    function showResults() {
        // YOUR CODE HERE:
        //
        showEndView();

        clearInterval(timer);

        // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
        resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
    }

    const restartBtn = document.querySelector("#restartButton");
    restartBtn.addEventListener("click", () => {
        showQuizView();
        quiz.currentQuestionIndex = 0;
        quiz.correctAnswers = 0;

        quiz.shuffleQuestions();

        showQuestion();

        quiz.timeRemaining = quiz.timeLimit;
        timeRemainingContainer.innerText = secondsToStrings(quiz.timeRemaining);

        timer = setInterval(() => {
            quiz.timeRemaining--;
            timeRemainingContainer.innerText = secondsToStrings(quiz.timeRemaining);
            if (quiz.timeRemaining === 0) {
                clearInterval(timer);
                showResults();
            }
        }, 1000);
    });
});
