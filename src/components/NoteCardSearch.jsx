import './style/NoteCard.css'

export const NoteCardSearch = ({ text, value, setValue, fnOnChage, arraySize }) => {
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
          onChange={(e) => fnOnChage(e)}
          disabled={arraySize.length === 0}
          style={{ minHeight: '150px', width: '100%', resize: 'none', }}
        />
        <span className="note-card-input__label text-black bg-white dark:text-white dark:bg-gray-700">
          {arraySize.length === 0 ? '*Crea primero una nota*' : 'Escribe una palabra clave'}
        </span>
      </label>
      <div className="note-card-buttons">
        <button
          onClick={() => setValue("")}
          className="note-card-buttons__comment"
          disabled={!value}
        >
          Todas las notas
        </button>
      </div>
    </div>
  )
}
