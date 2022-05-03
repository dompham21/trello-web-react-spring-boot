import Column from 'components/Column/Column';
import React, { useEffect, useState } from 'react'
import './BoardContent.scss';
import { initData } from 'mock/InitData';
import {isEmpty} from 'lodash';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initData.boards.find(b => b.id === "board-1");
    if(boardFromDB) {
      setBoard(boardFromDB);
      setColumns(boardFromDB.columns)
    }

  },[])
  if(isEmpty(board)) {
    return <div className="not-found">Board not found</div>
  }
  return (
    <div className="board-columns">
      {columns.map((col, index) => <Column key={index} column={col}/>)}
    </div>
  )
}

export default BoardContent