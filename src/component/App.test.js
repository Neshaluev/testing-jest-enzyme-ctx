import React from "react";
import { shallow, mount } from "enzyme";

import App from "./App";
import { findByTestAttr } from "../../Utils/tetsUtils";
import hookAction from "../hookAction/hookActions";

const mockGetSecretWord = jest.fn();

let setUp = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookAction.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([
    { secretWord, language: "en" },
    jest.fn, 
  ]);

  React.useReducer = mockUseReducer;

  const wrapper = mount(<App />);
  return wrapper;
};

describe("Render App Component", () => {
  it("App renders without error ", () => {
    const wrapper = setUp();
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.length).toBe(1);
  });
});

describe("getSecretWord calls", () => {
  it("getSecretWord gets called on App mount ", () => {
    setUp();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  it("secretWord does not update on App update", () => {
    const wrapper = setUp();
    mockGetSecretWord.mockClear();

    wrapper.update();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord id not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp("party");
  });
  it("renders app when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.exists()).toBe(true);
  });
  it("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(null);
  });
  it("does not render app when secretWord is null", () => {
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.exists()).toBe(false);
  });
  it("renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(true);
  });
});
