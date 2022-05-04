import React from 'react'
import './Card.scss'


function Task(props) {
  const {card} = props
  return (
    <li className="card-item">
        {card.cover && <img src={card.cover}  alt="title-here-alt" onMouseDown={(e) => e.preventDefault()}/>}
        {card.title}
    </li>
  )
}

export default Task