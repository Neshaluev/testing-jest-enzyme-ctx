import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr, checkProps } from "../../../Utils/tetsUtils";
import Congrats from "./Congrats";
import languageContext from "../../contexts/languageContext";
import successContext from "../../contexts/successContext";

const defaultProps = {
  success: false,
};

export const setUp = ({ success, language }) => {
  language = language || "en";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats success={success} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe("language picker", () => {
  test("correctly renders congrats string in English by default", () => {
    const wrapper = setUp({ success: true });

    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });
  test("correctly renders congrats string in emoji", () => {
    const wrapper = setUp({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  const wrapper = setUp({});
  const componens = findByTestAttr(wrapper, "component-congrats");

  expect(componens.length).toBe(1);
});
test("renders no text when `success`  is false ", () => {
  const wrapper = setUp({ success: false });
  const componens = findByTestAttr(wrapper, "component-congrats");

  expect(componens.text()).toBe("");
});
test("renders non-empty congrats message when success is true", () => {
  const wrapper = setUp({ success: true });
  const componens = findByTestAttr(wrapper, "congrats-message");

  expect(componens.text().length).not.toBe(0);
});
// test("does not throw warning with expected props", () => {
//   const expectedProps = { success: true };
//   checkProps(Congrats, expectedProps);
// });
