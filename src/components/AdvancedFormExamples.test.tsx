import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Advanced Jest Test Examples focusing on:
 * - Checkbox interactions with toBeChecked assertion
 * - Radio button interactions
 * - Using getByTestId for custom test identifiers
 * - Complex form element combinations
 * - Accessibility-focused queries
 */

// Mock component for demonstrating checkbox and radio button testing
const MockFormComponent = ({
    onSubmit
}: {
    onSubmit?: (data: {
        subscribe: boolean;
        plan: string;
        name: string;
    }) => void;
}) => {
    const [subscribe, setSubscribe] = React.useState(false);
    const [plan, setPlan] = React.useState("basic");
    const [name, setName] = React.useState("");

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({ subscribe, plan, name });
        }
    };

    return (
        <form data-testid="mock-form">
            <div>
                <label htmlFor="name-input">Full Name</label>
                <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="name-input"
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={subscribe}
                        onChange={(e) => setSubscribe(e.target.checked)}
                        data-testid="subscribe-checkbox"
                    />
                    Subscribe to newsletter
                </label>
            </div>

            <fieldset>
                <legend>Choose a plan</legend>
                <label>
                    <input
                        type="radio"
                        name="plan"
                        value="basic"
                        checked={plan === "basic"}
                        onChange={(e) => setPlan(e.target.value)}
                    />
                    Basic Plan
                </label>
                <label>
                    <input
                        type="radio"
                        name="plan"
                        value="premium"
                        checked={plan === "premium"}
                        onChange={(e) => setPlan(e.target.value)}
                    />
                    Premium Plan
                </label>
                <label>
                    <input
                        type="radio"
                        name="plan"
                        value="enterprise"
                        checked={plan === "enterprise"}
                        onChange={(e) => setPlan(e.target.value)}
                    />
                    Enterprise Plan
                </label>
            </fieldset>

            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
};

describe("Advanced Form Testing - Checkboxes, Radio Buttons, and More", () => {
    /**
     * Example 1: Testing checkbox with toBeChecked assertion
     * - Shows how to verify checkbox state
     * - Uses userEvent.click() for checkbox interaction
     */
    test("should toggle checkbox using userEvent.click()", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        // Find checkbox by label text
        const checkbox = screen.getByRole("checkbox", {
            name: /subscribe to newsletter/i
        });

        // Initially unchecked
        expect(checkbox).not.toBeChecked();

        // Click to check
        await user.click(checkbox);
        expect(checkbox).toBeChecked();

        // Click again to uncheck
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    /**
     * Example 2: Using getByTestId for elements with data-testid
     * - Shows how to use test IDs when other queries aren't ideal
     * - Note: getByRole and getByLabelText are preferred when possible
     */
    test("should find elements using getByTestId", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        // Find by test ID (useful when role/label aren't sufficient)
        const checkbox = screen.getByTestId("subscribe-checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        await user.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    /**
     * Example 3: Testing radio buttons
     * - Shows how to select different radio options
     * - Uses toBeChecked for radio button verification
     */
    test("should select radio buttons using userEvent.click()", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        // Find all radio buttons
        const basicRadio = screen.getByRole("radio", { name: /basic plan/i });
        const premiumRadio = screen.getByRole("radio", {
            name: /premium plan/i
        });
        const enterpriseRadio = screen.getByRole("radio", {
            name: /enterprise plan/i
        });

        // Initially, basic should be checked
        expect(basicRadio).toBeChecked();
        expect(premiumRadio).not.toBeChecked();
        expect(enterpriseRadio).not.toBeChecked();

        // Click premium radio
        await user.click(premiumRadio);
        expect(basicRadio).not.toBeChecked();
        expect(premiumRadio).toBeChecked();
        expect(enterpriseRadio).not.toBeChecked();

        // Click enterprise radio
        await user.click(enterpriseRadio);
        expect(basicRadio).not.toBeChecked();
        expect(premiumRadio).not.toBeChecked();
        expect(enterpriseRadio).toBeChecked();
    });

    /**
     * Example 4: Testing text input with getByLabelText
     * - Shows finding input by associated label
     * - Uses toHaveValue assertion
     */
    test("should type in text input found by label", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        const nameInput = screen.getByLabelText(/full name/i);
        expect(nameInput).toHaveValue("");

        await user.type(nameInput, "John Doe");
        expect(nameInput).toHaveValue("John Doe");
    });

    /**
     * Example 5: Complex interaction sequence with multiple form elements
     * - Demonstrates a complete form workflow
     * - Tests all form elements in sequence
     */
    test("should handle complete form interaction sequence", async () => {
        const user = userEvent.setup();
        const mockSubmit = jest.fn();

        render(<MockFormComponent onSubmit={mockSubmit} />);

        // Step 1: Enter name
        const nameInput = screen.getByLabelText(/full name/i);
        await user.type(nameInput, "Jane Smith");
        expect(nameInput).toHaveValue("Jane Smith");

        // Step 2: Check subscribe checkbox
        const checkbox = screen.getByRole("checkbox", {
            name: /subscribe to newsletter/i
        });
        await user.click(checkbox);
        expect(checkbox).toBeChecked();

        // Step 3: Select premium plan radio
        const premiumRadio = screen.getByRole("radio", {
            name: /premium plan/i
        });
        await user.click(premiumRadio);
        expect(premiumRadio).toBeChecked();

        // Step 4: Submit form
        const submitButton = screen.getByRole("button", { name: /submit/i });
        await user.click(submitButton);

        // Verify callback was called with correct data
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            name: "Jane Smith",
            subscribe: true,
            plan: "premium"
        });
    });

    /**
     * Example 6: Testing fieldset and legend for grouping
     * - Shows how to query within specific form sections
     */
    test("should find radio buttons within fieldset", () => {
        render(<MockFormComponent />);

        // Find by legend text
        const planSection = screen.getByRole("group", {
            name: /choose a plan/i
        });
        expect(planSection).toBeInTheDocument();
    });

    /**
     * Example 7: Using getAllByRole to find multiple elements
     * - Shows querying all radio buttons at once
     */
    test("should find all radio buttons using getAllByRole", () => {
        render(<MockFormComponent />);

        const radioButtons = screen.getAllByRole("radio");
        expect(radioButtons).toHaveLength(3);

        // For demonstration: checking value attributes on radio buttons
        // eslint-disable-next-line jest-dom/prefer-to-have-value
        expect(radioButtons[0]).toHaveAttribute("value", "basic");
        // eslint-disable-next-line jest-dom/prefer-to-have-value
        expect(radioButtons[1]).toHaveAttribute("value", "premium");
        // eslint-disable-next-line jest-dom/prefer-to-have-value
        expect(radioButtons[2]).toHaveAttribute("value", "enterprise");
    });

    /**
     * Example 8: Checkbox interaction with keyboard
     * - Shows using userEvent.tab() for navigation
     * - Demonstrates Space key for checkbox toggle
     */
    test("should interact with checkbox using keyboard", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        const checkbox = screen.getByRole("checkbox", {
            name: /subscribe to newsletter/i
        });

        // Focus using tab
        await user.tab();
        await user.tab(); // Tab to checkbox (after name input)

        // Toggle with space key
        await user.keyboard(" ");
        expect(checkbox).toBeChecked();

        await user.keyboard(" ");
        expect(checkbox).not.toBeChecked();
    });

    /**
     * Example 9: Testing with toHaveAttribute
     * - Shows verifying element attributes
     */
    test("should verify input attributes", () => {
        render(<MockFormComponent />);

        const nameInput = screen.getByLabelText(/full name/i);
        expect(nameInput).toHaveAttribute("type", "text");
        expect(nameInput).toHaveAttribute("id", "name-input");

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    /**
     * Example 10: Testing form with initial checked state
     */
    test("should verify initial radio button selection", () => {
        render(<MockFormComponent />);

        const basicRadio = screen.getByRole("radio", { name: /basic plan/i });

        // Basic plan should be selected by default
        expect(basicRadio).toBeChecked();

        // Demonstrating toHaveAttribute for checking value attribute
        // eslint-disable-next-line jest-dom/prefer-to-have-value
        expect(basicRadio).toHaveAttribute("value", "basic");
    });

    /**
     * Example 11: Using userEvent.clear() and type()
     * - Shows clearing input before typing
     */
    test("should clear and re-type in input field", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        const nameInput = screen.getByLabelText(/full name/i);

        // Type initial value
        await user.type(nameInput, "First Name");
        expect(nameInput).toHaveValue("First Name");

        // Clear and type new value
        await user.clear(nameInput);
        expect(nameInput).toHaveValue("");

        await user.type(nameInput, "New Name");
        expect(nameInput).toHaveValue("New Name");
    });

    /**
     * Example 12: Testing multiple checkboxes would be checked independently
     * (This example uses the single checkbox but demonstrates the pattern)
     */
    test("should handle checkbox state independently", async () => {
        const user = userEvent.setup();

        render(<MockFormComponent />);

        const checkbox = screen.getByRole("checkbox", {
            name: /subscribe to newsletter/i
        });

        // Check it
        await user.click(checkbox);
        expect(checkbox).toBeChecked();

        // The state should persist even after other interactions
        const nameInput = screen.getByLabelText(/full name/i);
        await user.type(nameInput, "Test");

        // Checkbox should still be checked
        expect(checkbox).toBeChecked();
    });
});
