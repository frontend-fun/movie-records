import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieEditor } from "../src/components/MovieEditor";
import type { Movie } from "../src/interfaces/movie";
import { Container } from "react-bootstrap";

describe("MovieEditor Component", () => {
    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    const mockMovie: Movie = {
        id: "1",
        title: "The Shawshank Redemption",
        released: 1994,
        rating: 10,
        description: "Two imprisoned men bond over a number of years.",
        soundtrack: [{ id: "s1", name: "Song 1", by: "Artist 1" }],
        watched: {
            seen: true,
            liked: true,
            when: "2017",
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Test 1: Render Form from Initial Values", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const titleInput = screen.getByRole("textbox", { name: /title/i });

        const descriptionInput = screen.getByLabelText(/description/i);

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();

        expect(titleInput).toHaveValue("The Shawshank Redemption");
        expect(descriptionInput).toHaveValue(
            "Two imprisoned men bond over a number of years.",
        );
    });

    test("Test 2: Update Title with userEvent", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const titleInput = screen.getByRole("textbox", { name: /title/i });
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "New Movie Title");
        expect(titleInput).toHaveValue("New Movie Title");
    });

    test("Test 3: Change Rating with Select Dropdown", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const ratingInput = screen.getByRole("combobox");
        expect(ratingInput).toHaveValue("10");
        userEvent.selectOptions(ratingInput, "8");
        expect(ratingInput).toHaveValue("8");
    });

    test("Test 4: Find Inputs by Display Value", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const titleInput = screen.getByDisplayValue("The Shawshank Redemption");
        const yearInput = screen.getByDisplayValue(1994);

        expect(titleInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
    });

    test("Test 5: Complete Edit Workflow", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const titleInput = screen.getByRole("textbox", { name: /title/i });
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "New Movie Title");

        const yearInput = screen.getByDisplayValue(1994);
        userEvent.clear(yearInput);
        userEvent.type(yearInput, "2003");

        const ratingInput = screen.getByRole("combobox");
        userEvent.selectOptions(ratingInput, "0");

        const descriptionInput = screen.getByLabelText(/description/i);
        userEvent.clear(descriptionInput);
        userEvent.type(descriptionInput, "Test description");

        expect(titleInput).toHaveValue("New Movie Title");
        expect(yearInput).toHaveValue(2003);
        expect(ratingInput).toHaveValue("0");
        expect(descriptionInput).toHaveValue("Test description");

        const saveButton = screen.getByRole("button", { name: /save/i });
        userEvent.click(saveButton);

        expect(mockEditMovie).toHaveBeenCalledWith("1", {
            id: mockMovie.id,
            title: "New Movie Title",
            released: 2003,
            rating: 0,
            description: "Test description",
            soundtrack: mockMovie.soundtrack,
            watched: mockMovie.watched,
        });

        expect(mockEditMovie).toHaveBeenCalledTimes(1);
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("Test 6: Cancel Button Click", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const cancelButton = screen.getByRole("button", { name: /Cancel/i });
        userEvent.click(cancelButton);

        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
        expect(mockEditMovie).not.toHaveBeenCalled();
    });

    test("Test 7: Delete Button Click", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        userEvent.click(deleteButton);

        expect(mockDeleteMovie).toHaveBeenCalledWith("1");
        expect(mockDeleteMovie).toHaveBeenCalledTimes(1);
    });

    test("Test 8: Difference between getBy and queryBy", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const nonExistentElement = screen.queryByText(
            /this text does not exist/i,
        );
        const existingButton = screen.getByRole("button", { name: /save/i });

        expect(nonExistentElement).not.toBeInTheDocument();
        expect(nonExistentElement).toBeNull();

        expect(existingButton).toBeInTheDocument();
    });

    test("Test 9: Using within() to Scope Queries", () => {
        const { container } = render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const withinContainer = within(container);
        const buttons = withinContainer.getAllByRole("button");

        expect(buttons.length).toBeGreaterThan(0);
        expect(buttons).toHaveLength(3);
    });

    test("Test 10: Textarea with Multi-line Input", async () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const descriptionTextArea = screen.getByLabelText(/description/i);

        userEvent.clear(descriptionTextArea);
        userEvent.type(
            descriptionTextArea,
            "First Line{Enter}Second Line{Enter}Third Line",
        );

        expect(descriptionTextArea).toHaveValue(
            "First Line\nSecond Line\nThird Line",
        );
    });

    test("Test 11: Button Text Content Verification", () => {
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        const saveButton = screen.getByRole("button", {name: /save/i});
        const cancelButton = screen.getByRole("button", {name: /Cancel/i})

        expect(deleteButton).toHaveTextContent("Delete");
        expect(saveButton).toHaveContext("Save");
        expect(cancelButton).toHaveContext("Cancel");
    });
});
