import './style/SwitchBtn.css'

export const SwitchBtn = ({ text1, text2, value, handleOnChangeSearch }) => {
  return (
    <div className="switch-container">
      <div className="switch-container-options">
        <span
          className={
            `switch-container-options__span ${!value ? 'switchBtn-state' : ''}`
          }
        >
          {text1}
        </span>
        <label className="switch">
          <input
            className='switch-input'
            type="checkbox"
            checked={!value}
            onChange={handleOnChangeSearch}
          />
          <span className="slider"></span>
        </label>
        <span
          className={
            `switch-container-options__span ${value ? 'switchBtn-state' : ''}`
          }
        >
          {text2}
        </span>
      </div>
    </div>
  )
}
