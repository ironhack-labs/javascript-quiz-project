
describe("Quiz", () => {
  describe("class", () => {
    it("should be defined", () => {
      expect(Quiz).toBeDefined();
    });

    it("should receive 3 arguments", () => {
      expect(Quiz.length).toEqual(3);
    });

    it("should receive 'questions' array as its 1st argument and store it in a 'questions' property", () => {
      const testQuestions = ["question1", "question2", "question3"];
      const quiz = new Quiz(testQuestions, 60, 60);
      expect(quiz.questions).toEqual(testQuestions);
    });

    it("should receive 'timeLimit' integer as its 2nd argument and store it in a 'timeLimit' property", () => {
      const testTime = 120;
      const quiz = new Quiz([], testTime, 60);
      expect(quiz.timeLimit).toEqual(testTime);
    });

    it("should receive 'timeRemaining' integer as its 3rd argument and store it in a 'timeRemaining' property", () => {
      const testTime = 120;
      const quiz = new Quiz([], 60, testTime);
      expect(quiz.timeRemaining).toEqual(testTime);
    });

    it("should have a 'correctAnswers' property initially set to 0", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.correctAnswers).toEqual(0);
    });

    it("should have a 'currentQuestionIndex' property initially set to 0", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.currentQuestionIndex).toEqual(0);
    });
  });

  describe("getQuestion() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.getQuestion).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.getQuestion).toBe("function");
    });

    it("should return the item from the 'questions' array at the position of 'currentQuestionIndex'", () => {
      const testQuestions = ["question1", "question2", "question3"];
      const quiz1 = new Quiz(testQuestions, 60, 60);
      expect(quiz1.getQuestion()).toEqual("question1");
      const quiz2 = new Quiz(testQuestions, 60, 60);
      quiz2.currentQuestionIndex = 2;
      expect(quiz2.getQuestion()).toEqual("question3");
    });
  });

  describe("moveToNextQuestion() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.moveToNextQuestion).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.moveToNextQuestion).toBe("function");
    });

    it("should increment the 'currentQuestionIndex' by 1", () => {
      const quiz = new Quiz(["a", "b", "c"], 60, 60);
      quiz.moveToNextQuestion();
      expect(quiz.currentQuestionIndex).toEqual(1);
    });
  });

  describe("shuffleQuestions() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.shuffleQuestions).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.shuffleQuestions).toBe("function");
    });

    it("should shuffle the items in the 'questions' array", () => {
      const testQuestions = ["question1", "question2", "question3"];
      const quiz = new Quiz(testQuestions, 60, 60);
      quiz.shuffleQuestions();
      expect(quiz.questions).not.toEqual(["question1", "question2", "question3"]);
      expect(quiz.questions.length).toEqual(3);
    });
  });

  describe("checkAnswer() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.checkAnswer).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.checkAnswer).toBe("function");
    });

    it("should receive 1 argument (answer)", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.checkAnswer.length).toEqual(1);
    });

    it("should increase 'correctAnswers' by 1 when a correct answer is passed as an argument", () => {
      const testQuestions = [
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a" },
        { text: "Question 2", choices: ["d", "e", "f"], answer: "e" },
        { text: "Question 3", choices: ["x", "y", "z"], answer: "z" },
      ];

      const quiz = new Quiz(testQuestions, 60, 60);

      quiz.checkAnswer("a");
      expect(quiz.correctAnswers).toEqual(1);

      quiz.moveToNextQuestion();
      quiz.checkAnswer("e");
      expect(quiz.correctAnswers).toEqual(2);

      quiz.moveToNextQuestion();
      quiz.checkAnswer("z");
      expect(quiz.correctAnswers).toEqual(3);
    });
  });

  describe("hasEnded() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.hasEnded).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.hasEnded).toBe("function");
    });

    it("should return 'false' when 'currentQuestionIndex' is less than the 'questions' array length", () => {
      const quiz = new Quiz(["a", "b", "c"], 60, 60);
      quiz.currentQuestionIndex = 2;
      expect(quiz.hasEnded()).toBe(false);
    });

    it("should return 'true' when 'currentQuestionIndex' is equal to the 'questions' array length", () => {
      const quiz = new Quiz(["a", "b", "c"], 60, 60);
      quiz.currentQuestionIndex = 3;
      expect(quiz.hasEnded()).toBe(true);
    });
  });

  // DAY 2
  describe("filterQuestionsByDifficulty() method", () => {
    it("should use the 'filter()' array method on the 'questions' array", () => {
      const quiz = new Quiz([], "test", 60);
      const filterSpy = spyOn(Array.prototype, "filter");

      quiz.filterQuestionsByDifficulty(1);

      expect(filterSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalledTimes(1);
      expect(filterSpy).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.filterQuestionsByDifficulty).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.filterQuestionsByDifficulty).toBe("function");
    });

    it("should receive 1 argument (difficulty)", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.filterQuestionsByDifficulty.length).toEqual(1);
    });

    it("should update the 'questions' array with the questions filtered by difficulty", () => {
      const questions = [
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: 1 },
        { text: "Question 2", choices: ["d", "e", "f"], answer: "d", difficulty: 2 },
        { text: "Question 3", choices: ["g", "h", "i"], answer: "g", difficulty: 2 },
        { text: "Question 4", choices: ["j", "k", "l"], answer: "j", difficulty: 3 },
      ];

      const quiz = new Quiz(questions, 60, 60);

      quiz.filterQuestionsByDifficulty(1);
      quiz.filterQuestionsByDifficulty(2);

      let array1 = quiz.filterQuestionsByDifficulty(1);
      expect(array1).toEqual([{ text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: 1 }]);
    });

    it("should not change the 'questions' array if the 1st argument is not a number between 1 and 3", () => {
      const questions = [
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: 1 },
        { text: "Question 2", choices: ["d", "e", "f"], answer: "d", difficulty: 2 },
        { text: "Question 3", choices: ["g", "h", "i"], answer: "g", difficulty: 3 },
      ];

      const quiz = new Quiz(questions, 60, 60);

      quiz.filterQuestionsByDifficulty("hello");

      expect(quiz.questions).toEqual(questions);
    });
  });

  // DAY 2
  describe("averageDifficulty() method", () => {
    it("should use the 'reduce()' array method on the 'questions' array", () => {
      const questions = [
          { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: 1 },
          { text: "Question 2", choices: ["d", "e", "f"], answer: "d", difficulty: 2 },
          { text: "Question 3", choices: ["g", "h", "i"], answer: "g", difficulty: 2 },
          { text: "Question 4", choices: ["j", "k", "l"], answer: "j", difficulty: 1 },
          { text: "Question 5", choices: ["m", "n", "o"], answer: "m", difficulty: 3 },
      ];

      const quiz = new Quiz(questions, 60, 60);
      const result = quiz.averageDifficulty();
      expect(result).toEqual(1.8)

      const reduceSpy = spyOn(quiz.questions, "reduce");

      quiz.averageDifficulty();

      expect(reduceSpy).toHaveBeenCalled();
      expect(reduceSpy).toHaveBeenCalledTimes(1);
      expect(reduceSpy.calls.allArgs()[0][0]).toEqual(jasmine.any(Function));
  });
    it("should be defined", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.averageDifficulty).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], 60, 60);
      expect(typeof quiz.averageDifficulty).toBe("function");
    });

    it("should receive no arguments", () => {
      const quiz = new Quiz([], 60, 60);
      expect(quiz.averageDifficulty.length).toEqual(0);
    });

    it("should return the average difficulty of the questions in the quiz", () => {
      const questions = [
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: 1 },
        { text: "Question 2", choices: ["d", "e", "f"], answer: "d", difficulty: 2 },
        { text: "Question 3", choices: ["g", "h", "i"], answer: "g", difficulty: 2 },
        { text: "Question 4", choices: ["j", "k", "l"], answer: "j", difficulty: 1 },
        { text: "Question 5", choices: ["m", "n", "o"], answer: "m", difficulty: 3 },
      ];

      const quiz = new Quiz(questions, 60, 60);

      let array1 = quiz.filterQuestionsByDifficulty(1);
      let sum = array1.reduce((total, question) => total + question.difficulty, 0);
      let average = sum / array1.length;
      expect(average).toEqual(1.5);
    });
  });
});