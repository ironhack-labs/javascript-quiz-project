# JavaScript Quiz Project Requirements

## Overview
This application is a small quiz game with a countdown timer. The quiz should display multiple-choice questions one at a time, track the correct answers, and show an end screen after the quiz completes or the timer reaches zero.

## App Structure
- Single-page quiz experience with two main views:
  - `quizView`: visible during the quiz questions
  - `endView`: visible after the quiz ends
- A timer display should appear in the top-right corner of the quiz view.
- The quiz should be implemented with JavaScript and should not require page reloads to move between questions or show results.

## UI Layout and Elements
### Quiz View
- Progress bar at the top that updates to reflect current question progress.
- Question count text such as `Question 1 of 5`.
- Question text displayed clearly.
- A list of radio button choices for the current question.
- A visible timer section showing the remaining time in `MM:SS` format.
- A button labeled `Answer` to submit the current answer and move to the next question.

### End View
- Hidden by default until the quiz ends.
- Displays final score text like `You scored X out of Y correct answers!`.
- Displays a horizontal progress bar representing score percentage.
- A `Restart Quiz` button that resets the quiz and timer.

## Functional Behavior
### Quiz Data and Initialization
- The quiz should contain an array of `Question` objects.
- Each question includes:
  - question text
  - an array of choices
  - the correct answer value
  - a difficulty level (optional)
- Quiz state includes:
  - `questions`
  - `currentQuestionIndex`
  - `correctAnswers`
  - `timeLimit`
  - `timeRemaining`
- When the app loads:
  - shuffle the question order
  - show the first question
  - initialize the timer display to the quiz duration
  - start the countdown

### Question Display and Answering
- Each question must display current text and choices.
- Choices should be radio inputs sharing the same `name` so only one can be selected.
- When `Answer` is clicked:
  - read the selected radio choice
  - if an answer is selected, validate it against the current question's answer
  - increment `correctAnswers` only for correct answers
  - move to the next question
  - display the next question or show results if the quiz has ended
- If no answer is selected, the app may do nothing or simply not advance.

### Progress Tracking
- The progress bar width should reflect the portion of answered questions, e.g. `((currentQuestionIndex + 1) / totalQuestions) * 100%`.
- The question count text should always use the current question number and total questions.

## Timer Requirements
- The timer starts when the quiz begins.
- It counts down from `timeRemaining` once per second using `setInterval()`.
- Timer text must update every second in `MM:SS` format.
- If the timer reaches zero:
  - stop the timer interval
  - set `timeRemaining` to 0
  - automatically end the quiz and show the result view
- If the quiz ends before time runs out:
  - clear the timer interval immediately to prevent background execution

## End-of-Quiz Behavior
- The quiz ends when:
  - the last question has been answered, or
  - the timer reaches zero.
- When the quiz ends:
  - hide the quiz view
  - show the end view
  - clear the timer interval
  - show the user score text
  - update the result progress bar based on score percentage

## Restart Behavior
- When `Restart Quiz` is clicked:
  - hide the end view
  - show the quiz view
  - reset `currentQuestionIndex` to 0
  - reset `correctAnswers` to 0
  - reset `timeRemaining` to `timeLimit`
  - shuffle questions again
  - show the first question
  - update the timer display to the full duration
  - start the countdown timer again

## Additional Notes
- Keep all application logic inside `src/index.js`.
- `src/quiz.js` should define the `Quiz` class and state methods like `getQuestion()`, `moveToNextQuestion()`, `checkAnswer()`, and `hasEnded()`.
- `src/question.js` should define the `Question` class, including any helper methods such as `shuffleChoices()` if needed.
- Ensure the timer display is accurate and responsive when restarting the quiz.
- Avoid unnecessary timers or memory leaks by always clearing intervals when they are no longer needed.
