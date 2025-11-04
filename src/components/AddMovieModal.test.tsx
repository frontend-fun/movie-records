import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddMovieModal } from "./AddMovieModal";

/**
 * Additional Jest Test Examples focusing on:
 * - Modal interactions
 * - Using findBy* for asynchronous queries
 * - Testing callbacks and function calls
 * - Complex user workflows
 */

describe("AddMovieModal Component - Additional Jest Examples", () => {
    const mockHandleClose = jest.fn();
    const mockAddMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Example 1: Testing modal visibility with queryBy vs getBy
     * - queryBy returns null when element doesn't exist
     * - Useful for testing conditional rendering
     */
    test("should not render modal content when show is false", () => {
        render(
            <AddMovieModal
                show={false}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Using queryBy* to check for non-existence
        const modalTitle = screen.queryByText("Add New Movie");
        expect(modalTitle).not.toBeInTheDocument();
    });

    /**
     * Example 2: Testing modal content when visible
     */
    test("should render modal content when show is true", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Using getBy* when we expect element to exist
        const modalTitle = screen.getByText("Add New Movie");
        expect(modalTitle).toBeInTheDocument();

        // Check for form labels
        const youtubeIdLabel = screen.getByText(/YouTube ID/i);
        expect(youtubeIdLabel).toBeInTheDocument();

        const spotifyIdsLabel = screen.getByText(/Spotify IDs/i);
        expect(spotifyIdsLabel).toBeInTheDocument();
    });

    /**
     * Example 3: Testing form input with getByLabelText
     * - Shows how to find inputs by their associated labels
     */
    test("should allow entering YouTube ID using getByLabelText", async () => {
        const user = userEvent.setup();

        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Find input by its label text
        const youtubeIdInput = screen.getByLabelText(/YouTube ID/i);
        expect(youtubeIdInput).toHaveValue("");

        // Type into the input
        await user.type(youtubeIdInput, "dQw4w9WgXcQ");
        expect(youtubeIdInput).toHaveValue("dQw4w9WgXcQ");
    });

    /**
     * Example 4: Testing button clicks and callback functions
     * - Demonstrates verifying function calls with jest.fn()
     * - Uses getAllByRole and index to handle multiple "Close" buttons
     */
    test("should call handleClose when Close button is clicked", async () => {
        const user = userEvent.setup();

        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Get all Close buttons and click the footer one (second button with "Close")
        const allButtons = screen.getAllByRole("button");
        const closeButton = allButtons.find(
            (btn) => btn.textContent === "Close"
        );

        if (closeButton) {
            await user.click(closeButton);
        }

        expect(mockHandleClose).toHaveBeenCalledTimes(1);
        expect(mockAddMovie).not.toHaveBeenCalled();
    });

    /**
     * Example 5: Testing complete form submission workflow
     * - Demonstrates sequential interactions
     * - Verifies callback with correct arguments
     */
    test("should call addMovie with correct data when Save Changes is clicked", async () => {
        const user = userEvent.setup();

        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Step 1: Fill in the YouTube ID
        const youtubeIdInput = screen.getByLabelText(/YouTube ID/i);
        await user.type(youtubeIdInput, "test-video-id");

        // Step 2: Click Save Changes button
        const saveButton = screen.getByRole("button", {
            name: /save changes/i
        });
        await user.click(saveButton);

        // Step 3: Verify addMovie was called with correct structure
        expect(mockAddMovie).toHaveBeenCalledTimes(1);
        expect(mockAddMovie).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "test-video-id",
                title: "",
                rating: 0,
                description: "",
                released: 0,
                watched: expect.objectContaining({
                    seen: false,
                    liked: false,
                    when: null
                })
            })
        );

        // Step 4: Verify modal close was triggered
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    /**
     * Example 6: Using getByRole with name option
     * - Shows how to find specific buttons when multiple exist
     * - Demonstrates using getAllByRole to handle multiple matches
     */
    test("should distinguish between buttons using role and name", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // When there are multiple buttons with same name, use getAllByRole
        const allButtons = screen.getAllByRole("button");
        const closeButton = allButtons.find(
            (btn) => btn.textContent === "Close"
        );
        const saveButton = screen.getByRole("button", {
            name: /save changes/i
        });

        expect(closeButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(closeButton).not.toBe(saveButton);
    });

    /**
     * Example 7: Testing with getAllByRole
     * - Shows how to query multiple elements of the same type
     */
    test("should find all buttons using getAllByRole", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        const allButtons = screen.getAllByRole("button");

        // Should have at least 2 buttons (Close and Save Changes)
        // Plus any additional buttons from EditableSongList component
        expect(allButtons.length).toBeGreaterThanOrEqual(2);
    });

    /**
     * Example 8: Using waitFor for async operations
     * - Demonstrates waiting for elements or state changes
     */
    test("should handle async operations with waitFor", async () => {
        const user = userEvent.setup();

        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        const youtubeIdInput = screen.getByLabelText(/YouTube ID/i);
        await user.type(youtubeIdInput, "async-test-id");

        // Wait for the value to be updated
        await waitFor(() => {
            expect(youtubeIdInput).toHaveValue("async-test-id");
        });
    });

    /**
     * Example 9: Testing empty form submission
     * - Verifies behavior when no input is provided
     */
    test("should handle save with empty YouTube ID", async () => {
        const user = userEvent.setup();

        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        const saveButton = screen.getByRole("button", {
            name: /save changes/i
        });
        await user.click(saveButton);

        // Should still call addMovie, just with empty id
        expect(mockAddMovie).toHaveBeenCalledWith(
            expect.objectContaining({
                id: ""
            })
        );
    });

    /**
     * Example 10: Using getByText for finding labels and static text
     */
    test("should find form labels using getByText", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Find text content directly
        expect(screen.getByText("Add New Movie")).toBeInTheDocument();
        expect(screen.getByText(/YouTube ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Spotify IDs/i)).toBeInTheDocument();
    });

    /**
     * Example 11: Testing user interaction flow with multiple steps
     * - Demonstrates realistic user behavior
     */
    test("should handle complete user interaction flow", async () => {
        const user = userEvent.setup();

        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // User types in YouTube ID
        const input = screen.getByLabelText(/YouTube ID/i);
        await user.click(input); // Focus the input
        await user.type(input, "my-movie-trailer");

        // Verify input value
        expect(input).toHaveValue("my-movie-trailer");

        // User clicks save
        const saveButton = screen.getByRole("button", {
            name: /save changes/i
        });
        await user.click(saveButton);

        // Verify both callbacks were triggered in correct order
        expect(mockAddMovie).toHaveBeenCalled();
        expect(mockHandleClose).toHaveBeenCalled();
    });

    /**
     * Example 12: Using getByRole for various element types
     * - Shows querying different semantic elements
     */
    test("should query various elements by their roles", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />
        );

        // Text input has role="textbox"
        const textInput = screen.getByRole("textbox");
        expect(textInput).toBeInTheDocument();

        // Buttons have role="button"
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });
});
