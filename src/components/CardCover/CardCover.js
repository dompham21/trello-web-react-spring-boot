import React from 'react'

function CardCover(props) {
    const {card, color} = props
  return (
    <div className='card-cover' 
        style={{backgroundImage: card?.background?.cover ? `url(${card?.background?.cover})` : "unset",
        backgroundColor: color
    }}></div>
  )
}

export default CardCover