import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";


test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
});

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

test('Read: Are all the notes that are created displayed on the page ', () => {
    render(<StickyNotes />);

});


test('Update: Once the update is done, is the document object value updating ', () => {
    render(<StickyNotes />);
});

test('delete note filters out once x is pressed ', () => {
    render(<StickyNotes />);
    const deleteNoteButton = screen.getByText("x");
    expect(deleteNoteButton).toBeInTheDocument();
});