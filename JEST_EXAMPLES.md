# Jest Test Examples Documentation

This document provides detailed explanations of all Jest test examples in this project, organized using the **Arrange-Act-Assert** (AAA) pattern. Each test demonstrates specific Jest and testing-library features.

## Table of Contents

1. [MovieEditor Component Tests](#movieeditor-component-tests)
2. [AddMovieModal Component Tests](#addmoviemmodal-component-tests)
3. [Advanced Form Examples Tests](#advanced-form-examples-tests)

---

## MovieEditor Component Tests

File: `src/components/MovieEditor.test.tsx`

### Test 1: Render Form with Initial Values

**Purpose**: Demonstrates using `getByRole` and `getByLabelText` query methods with `toBeInTheDocument` and `toHaveValue` assertions.

**Features Demonstrated**:
- Query Method: `getByRole` with options
- Query Method: `getByLabelText` with regex
- Assertion: `toBeInTheDocument()`
- Assertion: `toHaveValue()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MovieEditor component with mock props and movie data
✓ ACT: Query for title input using getByRole with name option
        Query for description input using getByLabelText
✓ ASSERT: Verify both inputs exist in document
          Verify inputs contain correct initial values
```

---

### Test 2: Update Title with userEvent

**Purpose**: Demonstrates modern `userEvent.type()` for text input simulation.

**Features Demonstrated**:
- Event Method: `userEvent.setup()`
- Event Method: `userEvent.clear()`
- Event Method: `userEvent.type()`
- Query Method: `getByRole`
- Assertion: `toHaveValue()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent instance
           Render MovieEditor component
✓ ACT: Find title input using getByRole
       Clear existing text
       Type new text "New Movie Title"
✓ ASSERT: Verify input contains the new value
```

---

### Test 3: Change Rating with Select Dropdown

**Purpose**: Demonstrates `userEvent.selectOptions()` for dropdown interaction.

**Features Demonstrated**:
- Event Method: `userEvent.selectOptions()`
- Query Method: `getByRole` for combobox
- Assertion: `toHaveValue()` for select elements

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MovieEditor component
✓ ACT: Find select element using getByRole("combobox")
       Verify initial value is "8"
       Select new value "10"
✓ ASSERT: Verify select contains new value "10"
```

---

### Test 4: Find Inputs by Display Value

**Purpose**: Demonstrates `getByDisplayValue` query method for finding inputs by their current value.

**Features Demonstrated**:
- Query Method: `getByDisplayValue`
- Assertion: `toBeInTheDocument()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MovieEditor component
✓ ACT: Query for title input using getByDisplayValue("The Test Movie")
       Query for year input using getByDisplayValue("2020")
✓ ASSERT: Verify both inputs are in the document
```

---

### Test 5: Complete Edit Workflow (Sequential Interactions)

**Purpose**: Demonstrates interacting with multiple form elements in sequence to simulate a complete user workflow.

**Features Demonstrated**:
- Event Methods: `userEvent.clear()`, `userEvent.type()`, `userEvent.selectOptions()`, `userEvent.click()`
- Query Methods: `getByRole`, `getByDisplayValue`, `getByLabelText`
- Assertions: `toHaveValue()`, callback verification with `toHaveBeenCalledWith()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MovieEditor with mock callbacks
✓ ACT: Step 1 - Update title input
       Step 2 - Update release year input
       Step 3 - Update rating select
       Step 4 - Update description textarea
       Step 5 - Click save button
✓ ASSERT: Verify all inputs have correct values
          Verify editMovie callback called with correct data
          Verify changeEditing callback called once
```

---

### Test 6: Cancel Button Click

**Purpose**: Demonstrates button click handling with callback verification.

**Features Demonstrated**:
- Event Method: `userEvent.click()`
- Query Method: `getByRole` with name option
- Assertion: `toHaveBeenCalledTimes()`, `not.toHaveBeenCalled()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock callbacks
           Render MovieEditor component
✓ ACT: Find cancel button using getByRole
       Click the button
✓ ASSERT: Verify changeEditing was called once
          Verify editMovie was NOT called
```

---

### Test 7: Delete Button Click

**Purpose**: Demonstrates button click with parameter verification.

**Features Demonstrated**:
- Event Method: `userEvent.click()`
- Query Method: `getByRole`
- Assertion: `toHaveBeenCalledWith()` with specific arguments

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock callbacks
           Render MovieEditor component
✓ ACT: Find delete button using getByRole
       Click the button
✓ ASSERT: Verify deleteMovie called once with movie ID
```

---

### Test 8: Difference Between getBy and queryBy

**Purpose**: Demonstrates the difference between `getBy*` (throws error if not found) and `queryBy*` (returns null if not found).

**Features Demonstrated**:
- Query Method: `queryByText` (returns null when not found)
- Query Method: `getByRole` (throws when not found)
- Assertion: `not.toBeInTheDocument()`
- Assertion: `toBeNull()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MovieEditor component
✓ ACT: Query for non-existent text using queryByText
       Query for existing button using getByRole
✓ ASSERT: Verify non-existent element is not in document and is null
          Verify existing element is in document
```

---

### Test 9: Using within() to Scope Queries

**Purpose**: Demonstrates using `within()` to scope queries to a specific container.

**Features Demonstrated**:
- Query Helper: `within(container)`
- Query Method: `getAllByRole`
- Assertion: `toBeGreaterThan()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MovieEditor and capture container
✓ ACT: Use within(container) to scope query
       Find all buttons within container
✓ ASSERT: Verify buttons array has elements
```

---

### Test 10: Textarea with Multi-line Input

**Purpose**: Demonstrates typing in textarea with line breaks using `{Enter}` special key.

**Features Demonstrated**:
- Event Method: `userEvent.type()` with special keys
- Query Method: `getByLabelText`
- Assertion: `toHaveValue()` with newline characters

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MovieEditor component
✓ ACT: Find textarea using getByLabelText
       Clear textarea
       Type text with {Enter} for line breaks
✓ ASSERT: Verify textarea contains text with actual newline characters
```

---

### Test 11: Button Text Content Verification

**Purpose**: Demonstrates `toHaveTextContent` assertion for verifying element text.

**Features Demonstrated**:
- Query Method: `getByRole` with name option
- Assertion: `toHaveTextContent()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MovieEditor component
✓ ACT: Query for Save, Cancel, and Delete buttons
✓ ASSERT: Verify each button has correct text content
```

---

### Test 12: Number Input Handling

**Purpose**: Demonstrates handling number inputs which may return numeric values.

**Features Demonstrated**:
- Event Methods: `userEvent.clear()`, `userEvent.type()`
- Query Method: `getByDisplayValue`
- Assertion: Direct value property check

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MovieEditor component
✓ ACT: Find number input using getByDisplayValue
       Clear and type new year value
✓ ASSERT: Verify input.value property equals typed value
```

---

## AddMovieModal Component Tests

File: `src/components/AddMovieModal.test.tsx`

### Test 1: Modal Not Visible When Hidden

**Purpose**: Demonstrates testing conditional rendering with `queryBy*` which returns null for non-existent elements.

**Features Demonstrated**:
- Query Method: `queryByText` (safe for non-existent elements)
- Assertion: `not.toBeInTheDocument()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render AddMovieModal with show={false}
✓ ACT: Query for modal title using queryByText
✓ ASSERT: Verify modal title is not in document
```

---

### Test 2: Modal Visible When Shown

**Purpose**: Demonstrates using `getBy*` when elements are expected to exist.

**Features Demonstrated**:
- Query Method: `getByText` with string and regex
- Assertion: `toBeInTheDocument()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render AddMovieModal with show={true}
✓ ACT: Query for modal title and labels using getByText
✓ ASSERT: Verify all elements are in document
```

---

### Test 3: Enter Text with getByLabelText

**Purpose**: Demonstrates finding inputs by associated label text.

**Features Demonstrated**:
- Event Method: `userEvent.type()`
- Query Method: `getByLabelText` with regex
- Assertion: `toHaveValue()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render AddMovieModal with show={true}
✓ ACT: Find input using getByLabelText
       Verify initial empty value
       Type YouTube ID
✓ ASSERT: Verify input contains typed value
```

---

### Test 4: Close Button Click with getAllByRole

**Purpose**: Demonstrates handling multiple elements with same role using `getAllByRole`.

**Features Demonstrated**:
- Event Method: `userEvent.click()`
- Query Method: `getAllByRole` with array operations
- Assertion: `toHaveBeenCalledTimes()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock callbacks
           Render AddMovieModal
✓ ACT: Get all buttons using getAllByRole
       Find Close button by text content
       Click the button
✓ ASSERT: Verify handleClose called once
          Verify addMovie NOT called
```

---

### Test 5: Complete Form Submission

**Purpose**: Demonstrates sequential form interaction and callback verification with complex objects.

**Features Demonstrated**:
- Event Methods: `userEvent.type()`, `userEvent.click()`
- Query Methods: `getByLabelText`, `getByRole`
- Assertion: `toHaveBeenCalledWith()` with `expect.objectContaining()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock callbacks
           Render AddMovieModal
✓ ACT: Fill in YouTube ID input
       Click Save Changes button
✓ ASSERT: Verify addMovie called with correct structure
          Verify handleClose called after save
```

---

### Test 6: Distinguish Buttons by Role and Name

**Purpose**: Demonstrates finding specific buttons when multiple exist.

**Features Demonstrated**:
- Query Method: `getAllByRole` for multiple matches
- Query Method: `getByRole` with name option
- Assertion: `not.toBe()` for inequality

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render AddMovieModal
✓ ACT: Get all buttons and filter for Close button
       Get Save Changes button by name
✓ ASSERT: Verify both buttons exist
          Verify they are different elements
```

---

### Test 7: Find All Buttons

**Purpose**: Demonstrates querying multiple elements and checking array length.

**Features Demonstrated**:
- Query Method: `getAllByRole`
- Assertion: `toBeGreaterThanOrEqual()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render AddMovieModal
✓ ACT: Get all buttons using getAllByRole
✓ ASSERT: Verify at least 2 buttons exist
```

---

### Test 8: Async Operations with waitFor

**Purpose**: Demonstrates handling asynchronous operations with `waitFor`.

**Features Demonstrated**:
- Event Method: `userEvent.type()`
- Async Helper: `waitFor()`
- Query Method: `getByLabelText`
- Assertion: `toHaveValue()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render AddMovieModal
✓ ACT: Type in input asynchronously
       Wait for value to be updated
✓ ASSERT: Inside waitFor, verify input has value
```

---

### Test 9: Empty Form Submission

**Purpose**: Demonstrates testing edge case of empty form submission.

**Features Demonstrated**:
- Event Method: `userEvent.click()`
- Query Method: `getByRole`
- Assertion: `toHaveBeenCalledWith()` with partial object

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock callbacks
           Render AddMovieModal
✓ ACT: Click save without entering data
✓ ASSERT: Verify addMovie called with empty id
```

---

### Test 10: Find Labels with getByText

**Purpose**: Demonstrates using `getByText` for static content.

**Features Demonstrated**:
- Query Method: `getByText` with exact string and regex
- Assertion: `toBeInTheDocument()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render AddMovieModal
✓ ACT: Query for modal title and labels using getByText
✓ ASSERT: Verify all text elements are in document
```

---

### Test 11: Complete User Interaction Flow

**Purpose**: Demonstrates realistic multi-step user workflow.

**Features Demonstrated**:
- Event Methods: `userEvent.click()`, `userEvent.type()`
- Query Methods: `getByLabelText`, `getByRole`
- Assertions: `toHaveValue()`, `toHaveBeenCalled()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock callbacks
           Render AddMovieModal
✓ ACT: Focus input with click
       Type YouTube ID
       Click save button
✓ ASSERT: Verify input value
          Verify both callbacks called
```

---

### Test 12: Query Elements by Role

**Purpose**: Demonstrates querying various semantic element types by role.

**Features Demonstrated**:
- Query Method: `getByRole("textbox")`
- Query Method: `getAllByRole("button")`
- Assertion: `toBeInTheDocument()`, `toBeGreaterThan()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render AddMovieModal
✓ ACT: Query for textbox role (text input)
       Query for all button roles
✓ ASSERT: Verify textbox exists
          Verify buttons array has elements
```

---

## Advanced Form Examples Tests

File: `src/components/AdvancedFormExamples.test.tsx`

### Test 1: Toggle Checkbox

**Purpose**: Demonstrates checkbox interaction and `toBeChecked` assertion.

**Features Demonstrated**:
- Event Method: `userEvent.click()`
- Query Method: `getByRole("checkbox")` with name option
- Assertion: `toBeChecked()`, `not.toBeChecked()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Find checkbox using getByRole
       Verify initially unchecked
       Click to check
       Click again to uncheck
✓ ASSERT: Verify checkbox state after each click
```

---

### Test 2: Find Elements with getByTestId

**Purpose**: Demonstrates using `data-testid` attributes for testing.

**Features Demonstrated**:
- Query Method: `getByTestId`
- Event Method: `userEvent.click()`
- Assertion: `toBeInTheDocument()`, `toBeChecked()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Find checkbox using getByTestId
       Click checkbox
✓ ASSERT: Verify checkbox exists and becomes checked
```

---

### Test 3: Select Radio Buttons

**Purpose**: Demonstrates radio button interaction where only one can be selected.

**Features Demonstrated**:
- Event Method: `userEvent.click()`
- Query Method: `getByRole("radio")` with name options
- Assertion: `toBeChecked()`, `not.toBeChecked()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Find all three radio buttons
       Verify basic is initially checked
       Click premium radio
       Click enterprise radio
✓ ASSERT: After each click, verify only one radio is checked
```

---

### Test 4: Text Input with getByLabelText

**Purpose**: Demonstrates finding text inputs by associated label.

**Features Demonstrated**:
- Event Method: `userEvent.type()`
- Query Method: `getByLabelText`
- Assertion: `toHaveValue()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Find name input using getByLabelText
       Type "John Doe"
✓ ASSERT: Verify input contains typed value
```

---

### Test 5: Complete Form Interaction Sequence

**Purpose**: Demonstrates comprehensive multi-element form workflow with callback verification.

**Features Demonstrated**:
- Event Methods: `userEvent.type()`, `userEvent.click()`
- Query Methods: `getByLabelText`, `getByRole`
- Assertions: `toHaveValue()`, `toBeChecked()`, `toHaveBeenCalledWith()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent and mock submit callback
           Render MockFormComponent
✓ ACT: Step 1 - Enter name "Jane Smith"
       Step 2 - Check subscribe checkbox
       Step 3 - Select premium radio
       Step 4 - Click submit button
✓ ASSERT: Verify all form field values
          Verify submit callback called with correct data object
```

---

### Test 6: Fieldset and Legend

**Purpose**: Demonstrates finding grouped form elements using fieldset's legend.

**Features Demonstrated**:
- Query Method: `getByRole("group")` with name from legend
- Assertion: `toBeInTheDocument()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MockFormComponent
✓ ACT: Find fieldset using getByRole("group") with legend name
✓ ASSERT: Verify fieldset exists in document
```

---

### Test 7: Get All Radio Buttons

**Purpose**: Demonstrates querying multiple elements and checking attributes.

**Features Demonstrated**:
- Query Method: `getAllByRole("radio")`
- Assertion: `toHaveLength()`, `toHaveAttribute()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MockFormComponent
✓ ACT: Get all radio buttons using getAllByRole
✓ ASSERT: Verify array has 3 elements
          Verify each has correct value attribute
```

---

### Test 8: Keyboard Navigation

**Purpose**: Demonstrates keyboard interaction for accessibility testing.

**Features Demonstrated**:
- Event Methods: `userEvent.tab()`, `userEvent.keyboard()`
- Query Method: `getByRole("checkbox")`
- Assertion: `toBeChecked()`, `not.toBeChecked()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Navigate to checkbox using tab key
       Toggle with space key
       Toggle again with space key
✓ ASSERT: Verify checkbox state after each space press
```

---

### Test 9: Verify Input Attributes

**Purpose**: Demonstrates checking element attributes with `toHaveAttribute`.

**Features Demonstrated**:
- Query Methods: `getByLabelText`, `getByRole`
- Assertion: `toHaveAttribute()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MockFormComponent
✓ ACT: Find name input and checkbox
✓ ASSERT: Verify type and id attributes on inputs
```

---

### Test 10: Initial Radio Selection

**Purpose**: Demonstrates checking initial form state.

**Features Demonstrated**:
- Query Method: `getByRole("radio")` with name
- Assertion: `toBeChecked()`, `toHaveAttribute()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Render MockFormComponent
✓ ACT: Find basic radio button
✓ ASSERT: Verify it is checked by default
          Verify it has value attribute "basic"
```

---

### Test 11: Clear and Re-type Input

**Purpose**: Demonstrates clearing input before typing new value.

**Features Demonstrated**:
- Event Methods: `userEvent.type()`, `userEvent.clear()`
- Query Method: `getByLabelText`
- Assertion: `toHaveValue()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Type initial value "First Name"
       Clear input
       Type new value "New Name"
✓ ASSERT: Verify value after each action
```

---

### Test 12: Independent Checkbox State

**Purpose**: Demonstrates that checkbox state persists through other interactions.

**Features Demonstrated**:
- Event Methods: `userEvent.click()`, `userEvent.type()`
- Query Methods: `getByRole`, `getByLabelText`
- Assertion: `toBeChecked()`

**Arrange-Act-Assert**:
```
✓ ARRANGE: Setup userEvent
           Render MockFormComponent
✓ ACT: Check checkbox
       Interact with text input
✓ ASSERT: Verify checkbox remains checked after other interactions
```

---

## Summary of Features

### Query Methods Demonstrated
- `getByRole` - Find by ARIA role (most accessible)
- `getByLabelText` - Find inputs by label text
- `getByText` - Find by text content
- `getByDisplayValue` - Find inputs by current value
- `getByTestId` - Find by data-testid attribute
- `queryByText` - Safe query that returns null if not found
- `getAllByRole` - Find multiple elements by role
- `within()` - Scope queries to container

### Event Methods Demonstrated
- `userEvent.setup()` - Initialize userEvent instance
- `userEvent.type()` - Simulate typing
- `userEvent.clear()` - Clear input value
- `userEvent.click()` - Simulate mouse click
- `userEvent.selectOptions()` - Select dropdown options
- `userEvent.tab()` - Keyboard navigation
- `userEvent.keyboard()` - Simulate keyboard input

### Assertions Demonstrated
- `toBeInTheDocument()` - Element exists in DOM
- `toHaveValue()` - Input has specific value
- `toBeChecked()` - Checkbox/radio is checked
- `toHaveTextContent()` - Element contains text
- `toHaveAttribute()` - Element has attribute
- `toBeNull()` - Value is null
- `toBeGreaterThan()` - Numeric comparison
- `not.toBe()` - Inequality check
- `toHaveBeenCalledTimes()` - Mock called N times
- `toHaveBeenCalledWith()` - Mock called with args

### Async Helpers Demonstrated
- `waitFor()` - Wait for async state changes
- `async/await` with userEvent methods

---

## Best Practices Highlighted

1. **Use userEvent over fireEvent** - More realistic user interactions
2. **Prefer accessible queries** - getByRole, getByLabelText over getByTestId
3. **Use queryBy for conditional rendering** - Doesn't throw when element missing
4. **Test user workflows** - Sequential interactions mirror real usage
5. **Verify callbacks** - Ensure handlers called with correct data
6. **Use Arrange-Act-Assert pattern** - Clear test structure
7. **Test keyboard interactions** - Ensure accessibility
8. **Scope queries with within()** - More precise element selection
