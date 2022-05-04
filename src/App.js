import './App.scss'
import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'
import React from 'react'
function App() {
  return (
    <div className="main">
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
    </div>
  )
}

export default App
