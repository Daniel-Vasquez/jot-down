import { useState, useEffect } from 'react';
import { newDateNote, generateRandomId } from './utils/index.js'
import { Note } from './components/Note.jsx'
import { Loading } from './components/Loading.jsx';
import { NoteCardSearch } from './components/NoteCardSearch.jsx';
import { NoteCardCreate } from './components/NoteCardCreate.jsx';
import { SwitchBtn } from './components/SwitchBtn.jsx';
import "./Notes.css"

const Notes = () => {
  const [inputText, setInputText] = useState("")
  const [seacrhNoteForm, setSeacrhNoteForm] = useState("")
  const [foundNotes, setFoundNotes] = useState("")
  const [switchBtn, setSwitchBtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const loadingId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(loadingId);
    }
  }, [seacrhNoteForm])

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

  const addNote = () => {
    setSwitchBtn(!switchBtn)
    setSeacrhNoteForm("")
  }

  return (
    <div className='container-app'>
      <section className='notes'>
        <SwitchBtn
          value={switchBtn}
          fnOnChange={addNote}
        />

        {switchBtn
          ? (
            <NoteCardSearch
              text='Buscar nota:'
              value={seacrhNoteForm}
              setValue={setSeacrhNoteForm}
              fnOnChage={searchNote}
              arraySize={notes}
            />
          ) : (
            <NoteCardCreate
              text='Crear nota:'
              value={inputText}
              fnHandleChange={handleChange}
              fnOnClick={handleClick}
            />
          )
        }
      </section>
      {seacrhNoteForm !== ''
        ? (
          isLoading
            ? (
              <Loading />
            )
            : (
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
            )
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
