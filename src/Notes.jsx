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
    <div className='bg-white dark:bg-gray-800'>
      <div className='container-app bg-white sm:h-screen dark:bg-gray-800'>
        <main className='note-form'>
          <SwitchBtn
            text1="Crear nota"
            text2="Buscar nota"
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
              <h1 className='text-center text-2xl my-3 font-extrabold text-black dark:text-white'>Notas Encontradas: {foundNotes.length}</h1>
              <div
                class="bg-blue-light flex flex-col gap-4 max-h-96 rounded-xl p-5 bg-white dark:bg-gray-700"
                style={{
                  overflowY: "scroll",
                  scrollbarColor: "rgb(36, 99, 235) transparent",
                }}
              >
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
            <section className='list-notes min-h-96'>
              <h1 className='text-center text-2xl my-3 font-extrabold text-black dark:text-white'>
                NOTAS CREADAS: {notes.length}
              </h1>
              {notes.length === 0
                ? (
                  <h2 className='text-xl text-center text-black dark:text-white'>
                    No hay notas, crea una.
                  </h2>
                )
                : (
                  <div class="bg-blue-light flex flex-col gap-14 max-h-96 rounded-xl py-7 px-5 bg-white mb-16 dark:bg-gray-700 sm:mb-0"
                    style={{
                      overflowY: "scroll",
                      scrollbarColor: "rgb(36, 99, 235) transparent",
                    }}>
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
                )
              }
            </section>
          )
        }
      </div>
    </div>
  )
}

export default Notes