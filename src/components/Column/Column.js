import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'

function Column(props) {
  const { column } = props
  return (
    <div className="column">
      <header>
        <h2>{column.title}</h2>
      </header>
      <ul className="card-list">
        {column.cards.map((card, index) => <Card card={card} key={index}/>)}       
      </ul>
      <footer>
        <span>Add a card</span>
        </footer>
    </div>
  )
}

export default Column