import React from "react";
import { shallow, mount } from "enzyme";

import successContext from "./successContext";

// a functioan component that calls useSuccess for our tests
const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

it("useSuccess throws error when not wrapper is SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

it("useSuccess throws error when not wrapper is SuccessProvider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
