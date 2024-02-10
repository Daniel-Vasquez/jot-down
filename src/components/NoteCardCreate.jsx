import './style/NoteCard.css'

export const NoteCardCreate = ({text, value, fnHandleChange, fnOnClick}) => {
  return (
    <div className="note-card bg-white dark:bg-gray-700">
      <h2 className='my-4 text-lg font-extrabold text-black dark:text-white'>
        {text}
      </h2>
      <label className="note-card-input">
        <textarea
          className="input__field text-black dark:text-white bg-white dark:bg-gray-700"
          type="text"
          placeholder=" "
          value={value}
          onChange={fnHandleChange}
          style={{ minHeight: '150px', width: '100%', resize: 'none', }}
        />
        <span className="note-card-input__label text-black bg-white dark:text-white dark:bg-gray-700">Escribe tu nota</span>
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
