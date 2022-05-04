import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/Movie Records/i);
    expect(linkElement).toBeInTheDocument();
});

test("the add movie modal works", () => {
    render(<App />);

    const originalHeaders = screen.getAllByRole("heading").length;

    const addButton = screen.getByRole("button", { name: /Add New Movie/i });
    addButton.click();
    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();

    const movieIdBox = screen.getByLabelText(/YouTube ID:/i);
    userEvent.type(movieIdBox, "1234");

    const saveButton = screen.getByRole("button", { name: /Save Changes/i });
    saveButton.click();

    const newHeaders = screen.getAllByRole("heading").length;

    expect(originalHeaders + 1).toEqual(newHeaders);
});
