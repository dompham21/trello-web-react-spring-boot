import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'
import React, { Fragment, useEffect } from 'react'
import "./BoardPage.scss"
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import { getBoardById } from 'store/reducer/boardReducer'


function BoardPage() {
  const dispatch = useDispatch();
  const {id} = useParams()

  const board = useSelector((state) => state.board.board)

  useEffect(() => {
    dispatch(getBoardById(id))
  },[])

  return (
      <Fragment>
        <div className='trello-root' style={{backgroundImage:board?.backgrounds?.cover ? `url(${board.backgrounds.cover})` : "unset",
                                            backgroundColor: board?.backgrounds?.color ? board.backgrounds.color : "unset"}}
        >
          <AppBar/>
          <BoardBar/>
          <BoardContent board={board}/>
        </div>
       
      </Fragment>
  )
}

export default BoardPage