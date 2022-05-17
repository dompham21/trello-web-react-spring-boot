import React from 'react'
import "./HomeBoardItem.scss"

function HomeBoardItem(props) {
    const { backgrounds, id, title } = props;

  return (
    <div className="board-item">
        <a href={"/board/" + id}>
            <div className="board-item-bg" style={{backgroundImage: backgrounds.cover ? `url(${backgrounds.cover})` : "unset", backgroundColor: backgrounds.color ? backgrounds.color : "unset"}}>
                <div className="board-fade"></div>
                <div className="board-title-details">
                    <div className="board-title-details-name">{title}</div>
                </div>
            </div>
        </a>
    </div>
  )
}

export default HomeBoardItem