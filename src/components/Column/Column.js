import Card from 'components/Card/Card'
import React from 'react'
import { Container, Draggable } from "react-smooth-dnd"
import './Column.scss'

function Column(props) {
  const { column } = props
  return (
    <div className="column">
      <header className="column-drag-handle">
        <h2>{column.title}</h2>
      </header>
      <ul className="card-list">
        <Container
          groupName="card-group-col"
          getChildPayload={index => column[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{                      
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview" 
          }}
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
        <span>Add a card</span>
      </footer>
    </div>
  )
}

export default Column