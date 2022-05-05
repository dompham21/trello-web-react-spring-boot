import Column from 'components/Column/Column';
import React, { useEffect, useState } from 'react'
import './BoardContent.scss';
import { initData } from 'mock/InitData';
import {isEmpty} from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from 'utilities/dragDrog'
import { IoMdAdd } from 'react-icons/io'

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initData.boards.find(b => b.id === 'board-1');
    if(boardFromDB) {
      setBoard(boardFromDB);
      setColumns(boardFromDB.columns)
    }

  },[])
  if(isEmpty(board)) {
    return <div className="not-found">Board not found</div>
  }

  const onDropColumn = (dropResult) => {
    let newColumns = applyDrag([...columns], dropResult);
    
    let newBoard = {...board}
    newBoard.columns = newColumns;

    setBoard(newBoard);
    setColumns(newColumns);
  }


  const onCardDrop = (columnId, dropResult) => {
    if(dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns  = [...columns]

      let currentColumn = newColumns.find(c => c.id === columnId);
      console.log(dropResult)

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      setColumns(newColumns)
    }
  }


  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onDropColumn}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "columns-drop-preview"
        }}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"

      >
        {
          columns.map((col, index) => (
            <Draggable key={index}>
              <Column column={col} onCardDrop={onCardDrop}/>
            </Draggable>
          ))  
        }
      </Container>
      <div className="add-new-column">
      <IoMdAdd/>
        <span>Add another list</span>
      </div>
    </div>
  )
}

export default BoardContent