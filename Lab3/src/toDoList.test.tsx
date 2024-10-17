import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";  // Ensure you're importing the correct component
import { dummyGroceryList } from "./constants";  // Ensure this contains the list of items

test('Read: Are all the items in the list displayed on the screen', () => {
    render(<ToDoList />);

    dummyGroceryList.forEach((item) => {
        const listItem = screen.getByText(item.name); 
        expect(listItem).toBeInTheDocument();
    });
});


test('Is the number of items checked the same as shown in the title?', () => {
    render(<ToDoList />);

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]); 
    
    const updatedItemsBoughtText = screen.getByText(/Items bought: 1/i);
    expect(updatedItemsBoughtText).toBeInTheDocument();
});

test('Does the number of items bought start at 0?', () => {
    render(<ToDoList />);
    const itemsBoughtText = screen.getByText(/Items bought: 0/i);
    expect(itemsBoughtText).toBeInTheDocument();
});