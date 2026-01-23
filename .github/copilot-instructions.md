# Copilot Instructions for JavaScript Quiz Project

## Project Overview
This project is a browser-based Quiz application built using JavaScript, Object-Oriented Programming (OOP), and the Document Object Model (DOM). The application is structured to facilitate collaboration and maintain high code quality.

## Architecture
- **Main Components**:
  - **Question Class** (`src/Question.js`): Manages individual quiz questions, including properties like text, choices, answer, and difficulty. Implements a method to shuffle answer choices.
  - **Quiz Class** (`src/Quiz.js`): Handles the overall quiz logic, including tracking questions, managing time limits, and checking answers.
  - **DOM Interaction** (`src/index.js`): Responsible for rendering the quiz interface, updating the UI based on user interactions, and displaying results.

- **Data Flow**:
  - The `Quiz` class orchestrates the flow of questions and user interactions, while the `Question` class encapsulates the details of each question.

## Developer Workflows
- **Building and Testing**:
  - Use Jasmine for unit testing. Ensure all tests pass before committing changes.
  - Run tests using the command: `npm test` (if applicable, adjust based on your setup).

- **Debugging**:
  - Utilize browser developer tools to inspect elements and debug JavaScript code.
  - Console logging is encouraged for tracking variable states and flow.

## Project Conventions
- **Code Structure**:
  - Organize code into classes for clarity and reusability.
  - Maintain a clean and readable code style with proper indentation and descriptive variable names.

- **File Naming**:
  - Use camelCase for JavaScript files and classes (e.g., `Question.js`, `Quiz.js`).

## Integration Points
- **External Dependencies**:
  - Ensure to include Jasmine for testing. Follow the setup instructions in the `README.md` for proper integration.

- **Cross-Component Communication**:
  - The `Quiz` class communicates with multiple `Question` instances, managing their lifecycle and interactions.

## Examples of Patterns
- **Shuffling Choices**:
  - The `shuffleChoices()` method in the `Question` class demonstrates how to manipulate arrays effectively.

- **Timer Implementation**:
  - Use `setInterval` and `clearInterval` for managing the quiz timer, as outlined in the `README.md`.

## Conclusion
This document serves as a foundational guide for AI agents to navigate and contribute effectively to the JavaScript Quiz project. For any unclear sections or additional details needed, please provide feedback for further refinement.