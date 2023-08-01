import { useState, useEffect } from 'react';
import { newDateNote, generateRandomId } from './utils/index.js'
import { Note } from './components/Note.jsx'
import { Loading } from './components/Loading.jsx';
import { NoteCardSearch } from './components/NoteCardSearch.jsx';
import { NoteCardCreate } from './components/NoteCardCreate.jsx';
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

  useEffect(() => {
    setIsLoading(true)

    const loadingId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(loadingId);
    }
  }, [seacrhNoteForm, notes])

  const deleteNotes = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id)

    setNotes(updatedNotes)
    setSeacrhNoteForm("")
    setInputText("")

    window.localStorage.setItem('noteListStorage', JSON.stringify(updatedNotes))
  };

  const updateNote = (noteId, updatedNote) => {
    const updatedNotes = [...notes];
    let indice = updatedNotes.findIndex(elemento => elemento.id === noteId);

    updatedNotes[indice] = updatedNote;
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
    setSeacrhNoteForm("")
  }

  const handleOnChangeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newNoteFound = notes.filter(note => note.description.toLowerCase().includes(searchValue) || searchValue === "");

    setFoundNotes(newNoteFound);
    setSeacrhNoteForm(searchValue);
  };

  return (
    <div className='container-app'>
      <main className='note-form'>
        <NoteCardCreate
          text='Crear nota:'
          value={inputText}
          fnHandleChange={handleChange}
          fnOnClick={handleClick}
        />
        <NoteCardSearch
          text='Buscar nota:'
          value={seacrhNoteForm}
          setValue={setSeacrhNoteForm}
          fnOnChage={handleOnChangeSearch}
          arraySize={notes}
        />
      </main>
      
      {seacrhNoteForm !== ''
        ? (
          isLoading
            ? (
              <Loading />
            )
            : (
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
                      deleteNotes={() => deleteNotes(note.id)}
                      updateNote={(updatedNoteEdit) => updateNote(note.id, updatedNoteEdit)}
                      newDateNote={newDateNote}
                      SetSearchText={setSeacrhNoteForm}
                    />
                  ))}
                </div>
              </section>
            )
        ) : (
          <section className='list-notes'>
            <h1 style={{ textAlign: 'center' }}>
              NOTAS CREADAS: {notes.length}.
            </h1>
            {notes.length === 0 &&
              <h2 style={{ opacity: '.7', textAlign: 'center' }}>
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
                  deleteNotes={() => deleteNotes(note.id)}
                  updateNote={(updatedNoteEdit) => updateNote(note.id, updatedNoteEdit)}
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