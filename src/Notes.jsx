import { useState } from 'react';
import { newDateNote } from './utils/index.js'
import { Note } from './components/Note.jsx'
import { NoteCardSearch } from './components/NoteCardSearch.jsx';
import { NoteCardCreate } from './components/NoteCardCreate.jsx';
import { SwitchBtn } from './components/SwitchBtn.jsx';
import { createNote, deleteNote, updateNote, searchNote } from './methods.js';
import "./Notes.css"

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const myNoteListStorage = window.localStorage.getItem('noteListStorage')
    return myNoteListStorage
      ? JSON.parse(myNoteListStorage)
      : []
  });
  const [inputText, setInputText] = useState("")
  const [seacrhNoteForm, setSeacrhNoteForm] = useState("")
  const [foundNotes, setFoundNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [switchBtn, setSwitchBtn] = useState(false)

  const handleDelete = (id) => {
    deleteNote(id, notes, setNotes)

    setInputText("");
    setSeacrhNoteForm("");
  };

  const handleUpdate = (noteId, updatedNote) => {
    updateNote(noteId, updatedNote, notes, setNotes)
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  }

  const handleCreate = () => {
    createNote(inputText, notes, setNotes)

    setInputText("");
    setSeacrhNoteForm("");
  }

  const handleSearch = (e) => {
    searchNote(e, notes, setFoundNotes, setSeacrhNoteForm)
  };

  const handleOnChangeSwitch = () => {
    setSwitchBtn(!switchBtn)
    setSeacrhNoteForm("")
    setInputText("")
  }

  return (
    <div className='container-app'>
      <main className='note-form'>
        <SwitchBtn
          value={switchBtn}
          handleOnChangeSearch={handleOnChangeSwitch}
        />

        {switchBtn
          ? (<NoteCardSearch
            text='Buscar nota:'
            value={seacrhNoteForm}
            setValue={setSeacrhNoteForm}
            fnOnChage={handleSearch}
            arraySize={notes}
          />)
          : (<NoteCardCreate
            text='Crear nota:'
            value={inputText}
            fnHandleChange={handleChange}
            fnOnClick={handleCreate}
          />)
        }
      </main>

      {seacrhNoteForm !== ''
        ? (
          <section className='list-notes'>
            <h2>Notas Encontradas: {foundNotes.length}</h2>
            <div className='note-container'>
              {foundNotes.map((note, index) => (
                <Note
                  key={index}
                  index={index}
                  notes={notes}
                  findNotes={foundNotes}
                  note={note}
                  deleteNotes={() => handleDelete(note.id)}
                  updateNote={(updatedNoteEdit) => handleUpdate(note.id, updatedNoteEdit)}
                  newDateNote={newDateNote}
                  SetSearchText={setSeacrhNoteForm}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className='list-notes'>
            <h1 style={{ textAlign: 'center' }}>
              NOTAS CREADAS: {notes.length}.
            </h1>
            {notes.length === 0 &&
              <h2 style={{ opacity: '.5', textAlign: 'center' }}>
                No hay notas, crea una.
              </h2>
            }
            <div className='note-container'>
              {notes.map((note, index) => (
                <Note
                  key={index}
                  index={index}
                  notes={notes}
                  findNotes={foundNotes}
                  note={note}
                  deleteNotes={() => handleDelete(note.id)}
                  updateNote={(updatedNoteEdit) => handleUpdate(note.id, updatedNoteEdit)}
                  newDateNote={newDateNote}
                  SetSearchText={setSeacrhNoteForm}
                />
              ))}
            </div>
          </section>
        )
      }
    </div>
  )
}

export default Notes