import './style/SwitchBtn.css'

export const SwitchBtn = ({ value, fnOnChange }) => {
  return (
    <div className="switch-container">
      <div className="switch-container-options">
        <span
          className={
            `switch-container-options__span ${!value ? 'switchBtn-state' : ''}`
          }
        >
          Agregar nota
        </span>
        <label className="switch">
          <input
            className='switch-input'
            type="checkbox"
            checked={!value}
            onChange={fnOnChange}
          />
          <span className="slider"></span>
        </label>
        <span
          className={
            `switch-container-options__span ${value ? 'switchBtn-state' : ''}`
          }
        >
          Buscar nota
        </span>
      </div>
    </div>
  )
}
