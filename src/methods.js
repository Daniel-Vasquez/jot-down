import { newDateNote, generateRandomId } from './utils/index.js'

export const deleteNote = (id, notes, setNotes) => {
  const updatedNotes = notes.filter((note) => note.id !== id);

  setNotes(updatedNotes);

  window.localStorage.setItem("noteListStorage", JSON.stringify(updatedNotes));
};

export const updateNote = (noteId, updatedNote, notes, setNotes) => {
  const updatedNotes = [...notes];
  let indice = updatedNotes.findIndex((elemento) => elemento.id === noteId);

  updatedNotes[indice] = updatedNote;
  setNotes(updatedNotes);
  window.localStorage.setItem("noteListStorage", JSON.stringify(updatedNotes));
};

export const createNote = (inputText, notes, setNotes) => {
  const dateNotes = newDateNote();

  const id = generateRandomId();

  const newNote = {
    id: id,
    description: inputText,
    date: dateNotes,
  };

  const newNoteList = [...notes, newNote];

  window.localStorage.setItem("noteListStorage", JSON.stringify(newNoteList));

  setNotes(newNoteList);
};

export const searchNote = (
  e,
  notes,
  setFoundNotes,
  setSeacrhNoteForm
) => {
  const searchValue = e.target.value.toLowerCase();
  const newNoteFound = notes.filter(note => note.description.toLowerCase().includes(searchValue) || searchValue === "");

  setFoundNotes(newNoteFound);
  setSeacrhNoteForm(searchValue);
};
