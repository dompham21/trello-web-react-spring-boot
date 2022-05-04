import Column from 'components/Column/Column';
import React, { useEffect, useState } from 'react'
import './BoardContent.scss';
import { initData } from 'mock/InitData';
import {isEmpty} from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';

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
    console.log(dropResult);
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
              <Column column={col}/>
            </Draggable>
          ))  
        }
      </Container>
    </div>
  )
}

export default BoardContent