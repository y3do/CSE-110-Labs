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


test('Read: Are all the notes that are created displayed on the page', async () => {
    render(<StickyNotes />);

    const titles = dummyNotesList.map(note => screen.queryAllByText(note.title));
    const contents = dummyNotesList.map(note => screen.queryAllByText(note.content));

    dummyNotesList.forEach((note, index) => {
        expect(titles[index].length).toBeGreaterThan(0); 
        expect(contents[index].length).toBeGreaterThan(0);
    });
});



test('Update: Once the update is done, is the document object value updating', () => {
    render(<StickyNotes />);

    // first note info
    const noteTitle = screen.getByTestId('title-1');
    const noteContent = screen.getByTestId('content-1');

    // edit
    fireEvent.input(noteTitle, { target: { innerText: 'Updated Note Title' } });
    fireEvent.input(noteContent, { target: { innerText: 'Updated Note Content' } });

    // check
    expect(noteTitle.innerText).toBe('Updated Note Title');
    expect(noteContent.innerText).toBe('Updated Note Content');
});



test('delete note filters out once x is pressed', () => {
    render(<StickyNotes />);

    const noteToDelete = screen.getByText('test note 1 title');
    expect(noteToDelete).toBeInTheDocument();

    const deleteButton = screen.getAllByText('x')[0]; // 1st delete button
    fireEvent.click(deleteButton);

    expect(noteToDelete).not.toBeInTheDocument();
});
