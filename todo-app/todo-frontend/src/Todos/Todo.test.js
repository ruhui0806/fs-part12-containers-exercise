import React from "react";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("render Todo", async () => {
  const fakeOnClickDelete = () => {
    console.log("fake onClickDelete");
  };
  const fakeOnClickComplete = () => {
    console.log("fake onClickDelete");
  };

  const todo = { text: "Test Todo rendering", done: true };
  render(
    <Todo
      todo={todo}
      onClickDelete={fakeOnClickDelete}
      onClickComplete={fakeOnClickComplete}
    />
  );

  const element = screen.getByText("Test Todo rendering");

  expect(element).toBeDefined();
});
