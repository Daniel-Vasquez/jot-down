import { useState } from 'react';
import Note from './components/Note.jsx'
import { newDateNote } from './utils/index.js'
import "./Notes.css"

const Notes = () => {
  const [inputText, setInputText] = useState("")

  const [notes, setNotes] = useState(() => {
    const myNoteListStorage = window.localStorage.getItem('noteListStorage')
    return myNoteListStorage
      ? JSON.parse(myNoteListStorage)
      : []
  });

  const deleteNotes = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
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

    const newNote = {
      description: inputText,
      date: dateNotes
    };

    const newNoteList = [...notes, newNote]

    setNotes(newNoteList);

    window.localStorage.setItem('noteListStorage', JSON.stringify(newNoteList))

    setInputText("")
  }

  return (
    <div className='container-app'>
      <section className='notes'>
        <div className="comment-card">
          <h2>
            Añadir nota
          </h2>
          <label className="comment-card-input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value={inputText}
              onChange={handleChange}
            />
            <span className="comment-card-input__label">Escribe tu nota</span>
          </label>
          <div className="comment-card-buttons">
            <button
              onClick={handleClick}
              disabled={!inputText}
              className="comment-card-buttons__comment"
            >
              Crear nota
            </button>
          </div>
        </div>
      </section>
      <section className='note'>
        <h1>Notas creadas: {notes.length}.</h1>
        {notes.length === 0 && <h2 style={{ opacity: '.7' }}>No hay notas, crea una.</h2>}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            maxHeight: '700px',
          }}
        >
          {notes.map((note, index) => (
            <div
              key={index}
              className='comment-card'
              style={{position: 'relative'}}
            >
              <Note
                note={note}
                deleteNotes={() => deleteNotes(index)}
                updateNote={(updatedNoteEdit) => updateNote(index, updatedNoteEdit)}
                newDateNote={newDateNote}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '-25px',
                  backgroundColor: '#E91E63',
                  width: '25px',
                  height: '25px',
                  padding: '10px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: '900',
                  fontSize: '20px',
                }}
              >
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Notes
