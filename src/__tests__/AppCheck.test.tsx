import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("test App", () => {
  test("adding todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);
    const btnAdd = screen.getByRole("button", {
      name: "ADD",
    });

    fireEvent.change(input, { target: { value: "test todo" } });
    fireEvent.click(btnAdd);

    expect(screen.getByText("test todo")).toBeInTheDocument();
  });

  test("checking todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);

    const btnAdd = screen.getByRole("button", {
      name: "ADD",
    });

    fireEvent.change(input, { target: { value: "test todo" } });
    fireEvent.click(btnAdd);

    const item = screen.getByText("test todo");
    fireEvent.click(item);

    expect(screen.getByText("test todo")).toHaveClass("done");
  });

  test("filter todoList", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);

    const btnAdd = screen.getByRole("button", {
      name: "ADD",
    });
    const actFilter = screen.getByText("Active");

    fireEvent.change(input, { target: { value: "test todo №1" } });
    fireEvent.click(btnAdd);

    fireEvent.change(input, { target: { value: "test todo №222" } });
    fireEvent.click(btnAdd);

    const item = screen.getByText("test todo №1");
    fireEvent.click(item);

    fireEvent.click(actFilter);

    expect(screen.queryByText("test todo №1")).not.toBeInTheDocument();
    expect(screen.getByText("test todo №222")).toBeInTheDocument();
  });

  test("clear todoList", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);

    const btnAdd = screen.getByRole("button", {
      name: "ADD",
    });

    const btnClear = screen.getByText("Clear Completed");

    fireEvent.change(input, { target: { value: "test todo for clear" } });
    fireEvent.click(btnAdd);

    const item = screen.getByText("test todo for clear");
    fireEvent.click(item);

    fireEvent.click(btnClear);

    expect(screen.queryByText("test todo for clear")).not.toBeInTheDocument();
  });
});
