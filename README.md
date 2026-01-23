# Project: JavaScript Quiz

# Quiz App Mini-Project Requirements

## General
- Build a browser-based Quiz app using JavaScript, OOP, and DOM
- Work in teams of 2 using Live Share for collaboration
- Commit changes regularly and push to GitHub
- Submit the final GitHub repository link

## Code Structure & Quality
- Use classes to organize data and functionality
- Keep code clean, readable, and well-organized
- Use descriptive variable names and proper file structure
- Remove unused code and maintain correct indentation

## Question Class (src/Question.js)
- Constructor with: text, choices, answer, difficulty
- Properties: text, choices, answer, difficulty
- Implement shuffleChoices() method
- Pass all Jasmine unit tests

## Quiz Class (src/Quiz.js)
- Constructor with: questions, timeLimit, timeRemaining
- Properties: questions, timeLimit, timeRemaining, correctAnswers, currentQuestionIndex
- Implement methods:
  - getQuestion()
  - moveToNextQuestion()
  - shuffleQuestions()
  - checkAnswer(answer)
  - hasEnded()
  - filterQuestionsByDifficulty(difficulty)
  - averageDifficulty()
- Pass all Jasmine unit tests

## DOM & Interaction (index.js)
- Display current question and choices
- Update progress bar and question count
- Handle answer selection and next button
- Show final results view
- Implement restart quiz functionality

## Timer
- Implement countdown timer with setInterval / clearInterval
- Display remaining time during quiz
- Stop timer when quiz ends
- Restart timer when quiz restarts

## Completion
- All features implemented and working
- All tests passing
- Repository ready for submission


# Detailed Quiz App Requirements

## Question Class

### Class Definition
- Question class must be defined
- Constructor must receive 4 arguments:
  1. text (string)
  2. choices (array of strings)
  3. answer (string)
  4. difficulty (number)

### Properties
- text → assigned from 1st argument
- choices → assigned from 2nd argument
- answer → assigned from 3rd argument
- difficulty → assigned from 4th argument

### shuffleChoices() Method
- Must be defined
- Must be a function
- Must receive no arguments
- Must shuffle the items in the choices array

---

## Quiz Class

### Class Definition
- Quiz class must be defined
- Constructor must receive 3 arguments:
  1. questions (array of Question objects)
  2. timeLimit (integer)
  3. timeRemaining (integer)

### Properties
- questions → assigned from 1st argument
- timeLimit → assigned from 2nd argument
- timeRemaining → assigned from 3rd argument
- correctAnswers → initially 0
- currentQuestionIndex → initially 0

### getQuestion() Method
- Must be defined
- Must be a function
- Must return questions[currentQuestionIndex]

### moveToNextQuestion() Method
- Must be defined
- Must be a function
- Must increment currentQuestionIndex by 1

### shuffleQuestions() Method
- Must be defined
- Must be a function
- Must shuffle the questions array

### checkAnswer(answer) Method
- Must be defined
- Must be a function
- Must receive 1 argument (answer)
- Must compare answer with current question’s answer
- Must increment correctAnswers if answer is correct

### hasEnded() Method
- Must be defined
- Must be a function
- Must return false if currentQuestionIndex < questions.length
- Must return true if currentQuestionIndex === questions.length

### filterQuestionsByDifficulty(difficulty) Method
- Must be defined
- Must be a function
- Must receive 1 argument (number 1–3)
- Must filter questions by difficulty
- Must not modify questions if difficulty is invalid

### averageDifficulty() Method
- Must be defined
- Must be a function
- Must receive no arguments
- Must return the average difficulty of all questions
