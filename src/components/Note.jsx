import { useState } from 'react';
import './style/Note.css'

export function Note({ notes, findNotes, note, deleteNotes, updateNote, newDateNote, SetSearchText }) {
  const { description, date, editedText } = note
  const [isEditing, setIsEditing] = useState(false);
  const [inputTextEdit, setInputTextEdit] = useState(description ? description : "")

  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const dateComment = newDateNote()

    let editedText = (inputTextEdit !== description);
    let objetoB = findNotes.find(objeto => objeto.id === note.id);
    let objetoA = notes.find(objeto => objeto.id === note.id);

    objetoB = {
      ...note,
      description: inputTextEdit,
      date: dateComment,
      editedText: editedText
    };

    if (objetoB && objetoA) {
      objetoA = objetoB
    }

    updateNote(objetoA);
    setIsEditing(false);
    SetSearchText("")
  };

  const handleCancelClick = () => {
    setUpdatedDescription(updatedDescription);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setInputTextEdit(e.target.value);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <h3>Edita tu nota:</h3>
          <input
            className="input__field"
            value={inputTextEdit}
            placeholder='Escribe tu comentario'
            onChange={handleChange}
          />
          <div className="note-card-buttons">
            <button
              className="note-card-buttons__comment"
              onClick={handleSaveClick}
              disabled={inputTextEdit === description}
            >
              Guardar
            </button>
            <button
              className="note-card-buttons__comment"
              onClick={handleCancelClick}
              style={{
                backgroundColor: 'red'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="note-card-text">
            {description}, {" "}
            <strong>{date}.</strong>
            {editedText === true && <span style={{opacity: '.5'}}> (Editado).</span>}
          </p>
          <div className="note-card-buttons">
            <button
              className="note-card-buttons__comment"
              onClick={handleUpdateClick}
            >
              Editar
            </button>
            <button
              className="note-card-buttons__comment"
              onClick={deleteNotes}
              style={{
                backgroundColor: '#e91e63'
              }}
            >
              Eliminar
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Note