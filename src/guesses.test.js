import React from "react";
import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../Utils/tetsUtils";

import successContext from "./contexts/successContext";
import guessWordsContext from "./contexts/guessWordsContext";

import Input from "./component/Input/Input";
import GuessedWords from "./component/GuessedWords/GuessedWords";

function setUp(guessedWordsStrings = [], secretWord = "party") {
  const wrapper = mount(
    <guessWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");

  guessedWordsStrings.map((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });

  return [wrapper, inputBox, submitButton];
}

describe("test word guesses", () => {
  let wrapper;
  let inputBox;
  let submitButton;
  describe("non-empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setUp(["agile"], "party");
    });
    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      it("Input component contains on children", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });
      it("GuessedWords table row count reflects updates guess", () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      it("Input box remains", () => {
        expect(inputBox.exists()).toBe(true);
      });
      it("GuessedWords table row count reflects updates guess", () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });

  describe("empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setUp([], "party");
    });
    it("guessedWords shows correct guesses after incorrect guess ", () => {
      const mockEvent = { target: { value: "train" } };
      inputBox.simulate("change", mockEvent);
      submitButton.simulate("click");
      const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
