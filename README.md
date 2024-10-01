# Project: JavaScript Quiz
Project Requirements
Upon completing the project, you should submit the link to your project’s GitHub repository with the finished project.

To make sure you are on track, here is a checklist of requirements for the project that you can refer to throughout the project:

Use JavaScript, OOP, and DOM to create a Quiz app that runs in the browser.
Organize data and functionality using classes defined with the class keyword.
Define and implement class methods that use this to access and manipulate object properties.
Use DOM and Event Listeners to make the quiz interactive, capture user answers, and change quiz views.
Implement a countdown timer for the quiz using setInterval/clearInterval.
Keep your code clean and organized by using descriptive variable names, correct indentation, removing all unused code, and maintaining proper file structure and naming.


Topics by Day
Every day, you will work on different topics and their corresponding features. Instructions for each day are provided below. Keep in mind that this is a suggested path and schedule to ensure that you are on track to complete the project on time. However, you can manage your time as you see fit, advance faster, and add extra features to your project if you wish to do so.

Day 1
Development Tasks:
Fork and clone the project repository from GitHub and add teammates as collaborators:

See Instructions

Project repository (starter code): Link

One team member should fork and clone the starter code repository to their GitHub account and add the other team member as a collaborator (instructions).

All team members should then clone the forked GitHub repository locally.



Review the starter code and the project structure:

See Instructions

The starter code contains the following folders and files:

index.html - the main HTML file containing all the HTML structure you need. You won’t need to make any changes to this file. All the required JavaScript and CSS files are already linked in the file, so you can focus on other tasks.
To see how the page looks, you can open the index.html file in the browser using the Live Server extension.

SpecRunner.html - the HTML file that runs the unit tests. You won’t need to make any changes to this file.
To run the tests, you should open the SpecRunner.html file in the browser using the Live Server extension.

styles/style.css - the CSS file containing all the styles you need. You won’t need to make any changes to this file. All the styles you will need are already written in the file.

jasmine/ folder - contains the Jasmine testing library files. You won’t need to make any changes to these files.

tests/ folder - contains the unit test files. All the test files are already linked in the SpecRunner.html.

src/ folder - contains the JavaScript files for the project. All the JavaScript files you will need are already created and linked in the index.html.
You will be writing your code and doing most of your work in these files in the src/ folder.



Organize data and functionality using classes: Question class

See Instructions

Question class

In the src/Question.js file, implement a class Question with the properties and methods listed in the sections below.



Unit Tests

The unit tests for the Question class are located in the tests/question.spec.js file.

To run the tests and check your progress, open the SpecRunner.html file in the browser using the Live Server extension.



class Question

should receive 4 arguments in the constructor (text, choices, answer, difficulty).
should have 4 properties: text, choices, answer, difficulty.
should receive text (string) as its 1st argument and assign it to text property.
should receive choices (array of strings) as its 2nd argument and assign it to choices property.
should receive answer (string) as its 3rd argument and assign it to answer property.
should receive difficulty (number) as its 3rd argument and assign it to difficulty property.

Note: The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.



shuffleChoices() method

Shuffles the elements stored in the choices array of the Question.

should be defined.

should be a function.

should receive no arguments.

should shuffle the elements stored in the choices array property.



Organize data and functionality using classes: Quiz class

See Instructions

Quiz class

In the src/Quiz.js file, implement a class Quiz with the properties and methods listed in the sections below.



Unit Tests

The unit tests for the Quiz class are located in the tests/quiz.spec.js file.

To run the tests and check your progress, open the SpecRunner.html file in the browser using the Live Server extension.



class Quiz

should receive 3 arguments in the constructor (questions, timeLimit, timeRemaining)
should have 5 properties: questions, timeLimit, timeRemaining, correctAnswers, currentQuestionIndex
should receive questions (array) as its 1st argument and assign it to questions property. The array is meant to contain Question objects
should receive timeLimit (number) as its 2nd argument and assign it to timeLimit property.
should receive timeRemaining (number) as its 3rd argument and assign it to timeRemaining property.
should have a correctAnswers property initially set to 0.
should have a currentQuestionIndex property initially set to 0.

getQuestion() method

Returns the question from the questions array at the position of currentQuestionIndex.

should be defined.
should be a function.
should receive no arguments.
should return the item from the questions array at the position of currentQuestionIndex.

moveToNextQuestion() method

When called, increments the currentQuestionIndex by 1.

should be defined.
should be a function.
should receive no arguments.
should increment the currentQuestionIndex by 1.

shuffleQuestions() method

Shuffles the elements stored in the questions array of the Quiz.

should be defined.
should be a function.
should receive no arguments.
should shuffle the items in the questions array.

checkAnswer(answer) method

Checks if the passed answer is correct for the current question and increments correctAnswers by 1 if the answer is correct.

should be defined.
should be a function.
should receive 1 argument (answer - string).
should increase correctAnswers by 1 when called with a correct answer for the current question

hasEnded() method

Returns true if the quiz has ended (the last question has been answered), and false otherwise.

should be defined.

should be a function.

should receive no arguments.

should return false when currentQuestionIndex is less than the questions array length

should return true when currentQuestionIndex is equal to the questions array length



Remember to commit your changes often and push them to the GitHub repo.


Research Tasks:
Watch the video “What is THIS in JavaScript? in 100 seconds” (est. time ~7 min).
Read the lesson “JS | Special keyword - this” on the Student Portal (est. time ~45 min).


