describe("Question", () => {
  describe("class", () => {
    it("should be defined", () => {
      expect(Question).toBeDefined();
    });

    it("should receive 4 arguments", () => {
      expect(Question.length).toEqual(4);
    });

    it("should receive 'text' string as its 1st argument and assign it to 'text' property", () => {
      const testText = "What is 2 + 2?";
      const question = new Question(testText, [], "test");
      expect(question.text).toEqual(testText);
    });

    it("should receive 'choices' array as its 2nd argument and assign it to 'choices' property", () => {
      const testChoices = ["choice1", "choice2", "choice3"];
      const question = new Question("test", testChoices, "test");
      expect(question.choices).toEqual(testChoices);
    });

    it("should receive 'answer' string as its 3rd argument and assign it to 'answer' property", () => {
      const testAnswer = "This is a test answer";
      const question = new Question("test", [], testAnswer);
      expect(question.answer).toEqual(testAnswer);
    });

    it("should receive 'difficulty' string as its 4th argument and assign it to 'difficulty' property", () => {
      const question = new Question("question", [], "test", 2);
      expect(question.difficulty).toEqual(2);
    });
  });

  describe("shuffleChoices() method", () => {
    it("should be defined", () => {
      const question = new Question("test", [], "test");
      expect(question.shuffleChoices).toBeDefined();
    });

    it("should be a function", () => {
      const question = new Question("test", [], "test");
      expect(typeof question.shuffleChoices).toBe("function");
    });

    it("should receive no arguments", () => {
      const question = new Question("test", [], "test");
      expect(question.shuffleChoices.length).toEqual(0);
    });

    it("should shuffle the items in the 'choices' array", () => {
      const testChoices = ["choice1", "choice2", "choice3"];
      const question = new Question("test", testChoices, "test");
      question.shuffleChoices();
      expect(question.choices).not.toEqual(testChoices);
    });
  });
});
