import './App.css';
import { useState } from 'react'; 
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 
import ClickCounter from './hooksExercise';
import { ThemeContext, themes } from "./themeContext";

function App() {
  // notes list, favorite status, theme
  const [notes, setNotes] = useState(dummyNotesList);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  // Toggle theme
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  // Create a new note
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote = {
      ...createNote,
      id: notes.length + 1 // new note pos
    };

    setNotes([...notes, newNote]); 
    setCreateNote(initialNote); 
  };

  // Delete a note
  const deleteNoteHandler = (id: number) => {
    const filteredNotes = notes.filter(note => note.id !== id); // filter=remove
    setNotes(filteredNotes); // update
  };

  // Faves List
  const favoriteNotes = notes.filter(note => note.isFavorite);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className='app-container'
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
          padding: '20px'
        }}
      >
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input 
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required
            ></input>
          </div>
          <div>
            <textarea
              placeholder="Note Content"
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required
            ></textarea>
          </div>
          <div>
            <select
              value={createNote.label}
              onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label})}
              required
            >
              <option value={"personal"}>Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div><button type="submit">Create Note</button></div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
                padding: '10px',
                marginBottom: '10px'
              }}
            >
              <div className="notes-header">
                <button onClick={() => deleteNoteHandler(note.id)}>x</button> 
                <button onClick={() => toggleFavorite(note.id)}>
                  {note.isFavorite ? '❤️' : '🤍'}
                </button>
              </div>
              

              <h2><blockquote contentEditable="true"><p>{note.title}</p></blockquote></h2>
              <p><blockquote contentEditable="true"><p>{note.content}</p></blockquote></p>
              <p><blockquote contentEditable="true"><p>{note.label}</p></blockquote></p>
            </div>
          ))}
        </div>

        <div>
          <h3>List of Favorites:</h3>
          <ul>
            {favoriteNotes.map(favNote => (
              <li key={favNote.id}>{favNote.title}</li>
            ))}
          </ul>
        </div>

        <button onClick={toggleTheme} >
          Toggle Theme
        </button>
        <ClickCounter />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
