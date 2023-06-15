import { useState } from 'react';

function Note({ note, deleteNotes, updateNote, newDateNote }) {
  console.log({note})
  const { description, date } = note
  const [isEditing, setIsEditing] = useState(false);
  const [inputTextEdit, setInputTextEdit] = useState(description ? description : "")

  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const dateComment = newDateNote()

    const updatedCommentEdit = {
      ...note,
      description: inputTextEdit,
      date: dateComment
    };

    updateNote(updatedCommentEdit);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setUpdatedDescription(updatedDescription);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setInputTextEdit(e.target.value);
  }

  return (
    <div className="todo">
      {isEditing ? (
        <>
          <h3>Edita tu nota:</h3>
          <input
            className="input__field"
            value={inputTextEdit}
            placeholder='Escribe tu comentario'
            onChange={handleChange}
          />
          <div className="comment-card-buttons">
            <button
              className="comment-card-buttons__comment"
              onClick={handleSaveClick}
              disabled={!inputTextEdit}
            >
              Guardar
            </button>
            <button
              className="comment-card-buttons__comment"
              onClick={handleCancelClick}
              style={{
                backgroundColor: 'red'
              }}
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            {description}, {" "}
            <strong>{date}.</strong>
          </p>
          <div className="comment-card-buttons">
            <button
              className="comment-card-buttons__comment"
              onClick={deleteNotes}
              style={{
                backgroundColor: 'red'
              }}
            >
              Eliminar
            </button>
            <button
              className="comment-card-buttons__comment"
              onClick={handleUpdateClick}
            >
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note