import React from 'react'

export const NoteCardCreate = ({text, value, fnHandleChange, fnOnClick}) => {
  return (
    <div className="note-card">
      <h2>
        {text}
      </h2>
      <label className="note-card-input">
        <textarea
          className="input__field"
          type="text"
          placeholder=" "
          value={value}
          onChange={fnHandleChange}
          style={{ minHeight: '150px', width: '100%', resize: 'none', }}
        />
        <span className="note-card-input__label">Escribe tu nota</span>
      </label>
      <div className="note-card-buttons">
        <button
          onClick={fnOnClick}
          disabled={!value}
          className="note-card-buttons__comment"
        >
          Crear nota
        </button>
      </div>
    </div>
  )
}
