import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../Utils/tetsUtils";
import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();

const setUp = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

describe("Render LanguagePicer Component", () => {
  it("redenrs without error", () => {
    const wrapper = setUp();
    const component = findByTestAttr(wrapper, "component-language-picker");
    expect(component.exists()).toBe(true);
  });
  it("does not warning with expected props", () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn() });
  });
  it("renders non-zero language icons", () => {
    const wrapper = setUp();
    const languageIcons = findByTestAttr(wrapper, "language-icon");
    expect(languageIcons.length).toBeGreaterThan(0);
  });
  it("calls setLanguage prop upon click", () => {
    const wrapper = setUp();
    const languageIcons = findByTestAttr(wrapper, "language-icon");

    const firstIcon = languageIcons.first();
    firstIcon.simulate("click");

    expect(mockSetLanguage).toHaveBeenCalled();
  });
});
