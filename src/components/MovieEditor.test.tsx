import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieEditor } from "./MovieEditor";
import { Movie } from "../interfaces/movie";

/**
 * Example Jest Test Suite demonstrating modern testing-library approaches
 *
 * This test suite showcases:
 * - userEvent for simulating user interactions (modern approach vs fireEvent)
 * - Different query methods: getBy*, queryBy*, findBy*
 * - Different query suffixes: ByRole, ByText, ByLabelText, ByDisplayValue, ByTestId
 * - Various assertions: toBeInTheDocument, toHaveValue, toBeChecked, toHaveTextContent
 * - Interacting with multiple elements in sequence
 * - Form interactions: text inputs, number inputs, select dropdowns, textareas, buttons
 */

describe("MovieEditor Component - Jest Feature Examples", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01"
        }
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Example 1: Using getByRole and getByLabelText
     * - getByRole finds elements by their ARIA role
     * - getByLabelText finds inputs by their associated label
     */
    test("should render form with correct initial values using getByRole and getByLabelText", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // Example: Using getByRole to find inputs
        const titleInput = screen.getByRole("textbox", { name: /title/i });
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveValue("The Test Movie");

        // Example: Using getByLabelText to find inputs by label
        const descriptionInput = screen.getByLabelText(/description/i);
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toHaveValue("A movie for testing");
    });

    /**
     * Example 2: Using userEvent for text input
     * - userEvent.type() simulates typing (more realistic than fireEvent)
     * - Demonstrates clearing and entering new text
     */
    test("should update title using userEvent.type()", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        const titleInput = screen.getByRole("textbox", { name: /title/i });

        // Clear existing text and type new text
        await user.clear(titleInput);
        await user.type(titleInput, "New Movie Title");

        expect(titleInput).toHaveValue("New Movie Title");
    });

    /**
     * Example 3: Using userEvent for select dropdown
     * - Demonstrates selecting options from a dropdown
     */
    test("should change rating using userEvent.selectOptions()", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // Find the select element using getByRole
        const ratingSelect = screen.getByRole("combobox");

        // Initially should have rating 8
        expect(ratingSelect).toHaveValue("8");

        // Change to 10 stars
        await user.selectOptions(ratingSelect, "10");

        expect(ratingSelect).toHaveValue("10");
    });

    /**
     * Example 4: Using getByDisplayValue to find inputs by their current value
     */
    test("should find inputs using getByDisplayValue", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // Find input by its current display value
        const movieTitleInput = screen.getByDisplayValue("The Test Movie");
        expect(movieTitleInput).toBeInTheDocument();

        const yearInput = screen.getByDisplayValue("2020");
        expect(yearInput).toBeInTheDocument();
    });

    /**
     * Example 5: Interacting with multiple elements in sequence
     * - Demonstrates a realistic user workflow
     * - Shows userEvent interactions with various form elements
     */
    test("should handle complete edit workflow with multiple interactions", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // Step 1: Update title
        const titleInput = screen.getByRole("textbox", { name: /title/i });
        await user.clear(titleInput);
        await user.type(titleInput, "Updated Title");
        expect(titleInput).toHaveValue("Updated Title");

        // Step 2: Update release year (using getByDisplayValue since label appears twice)
        const yearInput = screen.getByDisplayValue("2020") as HTMLInputElement;
        await user.clear(yearInput);
        await user.type(yearInput, "2024");
        // Number inputs may return numeric values
        expect(yearInput.value).toBe("2024");

        // Step 3: Update rating
        const ratingSelect = screen.getByRole("combobox");
        await user.selectOptions(ratingSelect, "10");
        expect(ratingSelect).toHaveValue("10");

        // Step 4: Update description
        const descriptionInput = screen.getByLabelText(/description/i);
        await user.clear(descriptionInput);
        await user.type(descriptionInput, "Brand new description for testing");
        expect(descriptionInput).toHaveValue(
            "Brand new description for testing"
        );

        // Step 5: Click save button
        const saveButton = screen.getByRole("button", { name: /save/i });
        await user.click(saveButton);

        // Verify callbacks were called
        expect(mockEditMovie).toHaveBeenCalledTimes(1);
        expect(mockEditMovie).toHaveBeenCalledWith("test-movie-123", {
            ...mockMovie,
            title: "Updated Title",
            released: 2024,
            rating: 10,
            description: "Brand new description for testing",
            soundtrack: mockMovie.soundtrack
        });
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    /**
     * Example 6: Using userEvent.click() for button interactions
     */
    test("should handle cancel button click", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        await user.click(cancelButton);

        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
        expect(mockEditMovie).not.toHaveBeenCalled();
    });

    /**
     * Example 7: Using userEvent.click() with delete button
     */
    test("should handle delete button click", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        await user.click(deleteButton);

        expect(mockDeleteMovie).toHaveBeenCalledTimes(1);
        expect(mockDeleteMovie).toHaveBeenCalledWith("test-movie-123");
    });

    /**
     * Example 8: Using queryBy* (returns null if not found, doesn't throw)
     * vs getBy* (throws error if not found)
     */
    test("should demonstrate difference between getBy and queryBy", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // queryBy returns null if element doesn't exist (no error thrown)
        const nonExistentElement = screen.queryByText(
            "This text does not exist"
        );
        expect(nonExistentElement).not.toBeInTheDocument();
        // Demonstrating toBeNull as an alternative check
        // eslint-disable-next-line jest-dom/prefer-in-document
        expect(nonExistentElement).toBeNull();

        // getBy would throw an error if element doesn't exist
        // This is useful when you expect the element to be there
        const saveButton = screen.getByRole("button", { name: /save/i });
        expect(saveButton).toBeInTheDocument();
    });

    /**
     * Example 9: Using within() to scope queries to a specific container
     * - Demonstrates scoping queries to avoid global searches
     */
    test("should use within() to scope queries", () => {
        const { container } = render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // Use the container from render
        const buttons = within(container).getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    /**
     * Example 10: Testing textarea with userEvent
     */
    test("should handle textarea input with userEvent", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        const descriptionTextarea = screen.getByLabelText(/description/i);

        await user.clear(descriptionTextarea);
        await user.type(
            descriptionTextarea,
            "This is a multi-line{Enter}description with{Enter}line breaks"
        );

        expect(descriptionTextarea).toHaveValue(
            "This is a multi-line\ndescription with\nline breaks"
        );
    });

    /**
     * Example 11: Using toHaveTextContent assertion
     */
    test("should verify button text content", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        const saveButton = screen.getByRole("button", { name: /save/i });
        expect(saveButton).toHaveTextContent("Save");

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        expect(cancelButton).toHaveTextContent("Cancel");

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        expect(deleteButton).toHaveTextContent("Delete");
    });

    /**
     * Example 12: Testing number input specifically
     * - Number inputs return numeric values in React
     */
    test("should handle number input for release year", async () => {
        const user = userEvent.setup();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />
        );

        // Find the number input specifically by using getByDisplayValue
        const yearInput = screen.getByDisplayValue("2020") as HTMLInputElement;

        // Clear and type new value
        await user.clear(yearInput);
        await user.type(yearInput, "1999");

        // Check using the value property directly
        expect(yearInput.value).toBe("1999");
    });
});
