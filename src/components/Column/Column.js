import Card from 'components/Card/Card'
import React from 'react'
import { Container, Draggable } from "react-smooth-dnd"
import { IoMdAdd } from 'react-icons/io'
import './Column.scss'

function Column(props) {
  const { column, onCardDrop } = props


 
  return (
    <div className="column">
      <header className="column-drag-handle">
        <h2>{column.title}</h2>
      </header>
      <ul className="card-list">
        <Container
          groupName="card-group-col"
          getChildPayload={index => column.cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{                      
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview" 
          }}
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          dropPlaceholderAnimationDuration={200}
        >
          {
            column.cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card}/>
              </Draggable>
            ))
          }      
        </Container> 
      </ul>
      <footer>
        <div className="footer-wrapper">
          <IoMdAdd/>
          <span>Add a card</span>
        </div>
      </footer>
    </div>
  )
}

export default Column