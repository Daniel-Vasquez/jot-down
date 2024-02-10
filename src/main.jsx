import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Notes.jsx'
import { Navbar } from './components/Navbar/index.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Navbar>
    <App />
  </Navbar>
)
