import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../Utils/tetsUtils";
import guessWordsContext from "../../contexts/guessWordsContext";

import GuessedWords from "./GuessedWords";

const setUp = (guessedWords = []) => {
  const mockUseGuessedWord = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessWordsContext.useGuessedWords = mockUseGuessedWord;
  return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp([]);
  });
  it("renders wihout errors", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  it("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are word guessed", () => {
  let guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(guessedWords);
  });
  it("renders without errors", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  it('redners "guessed word" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  it("current number of guessed words", () => {
    const guessedWordsNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

describe("languagePicker", () => {
  it("correctly renders guess instructions string in English by Default", () => {
    const wrapper = setUp([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");

    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });
  it("correctly redners guess instructions string in in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const wrapper = setUp([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🔤");
  });
});
