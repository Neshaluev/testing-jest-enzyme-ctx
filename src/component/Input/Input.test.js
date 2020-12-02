import React from "react";
import { mount } from "enzyme";

import Input from "./Input";
import languageContext from "../../contexts/languageContext";
import successContext from "../../contexts/successContext";
import guessWordsContext from "../../contexts/guessWordsContext";
import { findByTestAttr, checkProps } from "../../../Utils/tetsUtils";

let setUp = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe("Render Input Component", () => {
  it("App renders without error ", () => {
    const wrapper = setUp({});
    const component = findByTestAttr(wrapper, "component-input");
    expect(component.length).toBe(1);
  });
  it("does not throw warnig with expented props", () => {
    checkProps(Input, { secretWord: "party" });
  });
});

describe("state controller input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();

    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    wrapper = setUp({});
  });
  it("state update with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  it("field is cleared upon submit button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  it("correctly renders submit string in english", () => {
    const wrapper = setUp({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  it("correctly renders submit string in english", () => {
    const wrapper = setUp({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

test("input component does not show when success is true", () => {
  const wrapper = setUp({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
