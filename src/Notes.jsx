import { useState } from 'react';
import Note from './components/Note.jsx'
import { newDateNote, generateRandomId } from './utils/index.js'
import "./Notes.css"

const Notes = () => {
  const [inputText, setInputText] = useState("")
  const [seacrhNoteForm, setSeacrhNoteForm] = useState("")
  const [foundNotes, setFoundNotes] = useState("")

  const [notes, setNotes] = useState(() => {
    const myNoteListStorage = window.localStorage.getItem('noteListStorage')
    return myNoteListStorage
      ? JSON.parse(myNoteListStorage)
      : []
  });

  const deleteNotes = (id) => {
    const updatedNotes = notes.filter((note) => note.id != id)
    setNotes(updatedNotes);

    window.localStorage.setItem('noteListStorage', JSON.stringify(updatedNotes))
  };

  const updateNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);

    window.localStorage.setItem('noteListStorage', JSON.stringify(updatedNotes))
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  }

  const handleClick = () => {
    const dateNotes = newDateNote()

    const id = generateRandomId()

    const newNote = {
      id: id,
      description: inputText,
      date: dateNotes
    };

    const newNoteList = [...notes, newNote]

    window.localStorage.setItem('noteListStorage', JSON.stringify(newNoteList))
    
    setNotes(newNoteList);
    setInputText("")
  }

  const searchNote = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newNoteFound = notes.filter(note => note.description.toLowerCase().includes(searchValue) || searchValue === "");

    setFoundNotes(newNoteFound);
    setSeacrhNoteForm(searchValue);
  };

  return (
    <div className='container-app'>
      <section className='notes'>
        <div className="note-card">
          <h2>
            Buscar nota:
          </h2>
          <label className="note-card-input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value={seacrhNoteForm}
              onChange={(e) => searchNote(e)}
              disabled={notes.length === 0}
            />
            <span className="note-card-input__label">
              {notes.length === 0 ? '*Crea primero una nota*' : 'Escribe una palabra clave'}
            </span>
          </label>
          <div className="note-card-buttons">
            <button
              onClick={() => setSeacrhNoteForm("")}
              className="note-card-buttons__comment"
              disabled={!seacrhNoteForm}
              >
              Todas las notas
            </button>
          </div>
        </div>
        <div className="note-card">
          <h2>
            Crear nota:
          </h2>
          <label className="note-card-input">
            <textarea
              className="input__field"
              type="text"
              placeholder=" "
              value={inputText}
              onChange={handleChange}
              style={{minHeight: '150px', width: '100%', resize: 'none',}}
            />
            <span className="note-card-input__label">Escribe tu nota</span>
          </label>
          <div className="note-card-buttons">
            <button
              onClick={handleClick}
              disabled={!inputText}
              className="note-card-buttons__comment"
            >
              Crear nota
            </button>
          </div>
        </div>
      </section>
      {seacrhNoteForm !== ''
        ? (
          <div>
            <h2>Notas Encontradas: {foundNotes.length}</h2>
            {foundNotes.map((note, index) => (
              <div key={index} className='note-card'>
                <Note
                  note={note}
                  deleteNotes={() => deleteNotes(note.id)}
                  updateNote={(updatedNoteEdit) => updateNote(index, updatedNoteEdit)}
                  newDateNote={newDateNote}
                />
                <span className='note-card__span'>{index + 1}</span>
              </div>
            ))}
          </div>
        ) : (
          <section className='note'>
            <h1>NOTAS CREADAS: {notes.length}.</h1>
            {notes.length === 0 && <h2 style={{ opacity: '.7' }}>No hay notas, crea una.</h2>}
            <div className='note-container'>
              {notes.map((note, index) => (
                <div key={index} className='note-card'>
                  <Note
                    note={note}
                    deleteNotes={() => deleteNotes(note.id)}
                    updateNote={(updatedNoteEdit) => updateNote(index, updatedNoteEdit)}
                    newDateNote={newDateNote}
                  />
                  <span className='note-card__span'>{index + 1}</span>
                </div>
              ))}
            </div>
          </section>
        )
      }
    </div>
  )
}

export default Notes
