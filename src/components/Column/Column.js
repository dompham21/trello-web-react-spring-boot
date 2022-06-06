import Card from 'components/Card/Card'
import React, { Fragment, useEffect, useState } from 'react'
import { Container, Draggable } from "react-smooth-dnd"
import { IoMdAdd } from 'react-icons/io'
import { MdClear } from 'react-icons/md'
import TextArea from '@atlaskit/textarea';          
import './Column.scss'
import Form, {
  ErrorMessage,
  Field,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';
import LoadingButton from '@atlaskit/button/loading-button';
import { useDispatch, useSelector } from 'react-redux';
import { postNewCard } from 'store/reducer/cardReducer'
import _ from "lodash"

function Column(props) {
  const [isAdd, setIsAdd] = useState(false)
  const { column, onCardDrop } = props
  const [cards, setCards] = useState([])
  const cardsState = useSelector(state => state.card.cards)
  const newCard = useSelector(state => state.card.card)


  const dispatch = useDispatch();

  useEffect(() => {
    if(column?.cards) {
      let arr = [...column.cards]

      setCards(_.orderBy(arr, ['orderNum'],['asc']))
    }
  },[])

  useEffect(() => {
    if(cardsState !== null && cardsState?.cards  && cardsState?.id === column.id) {
      let arr = [...cardsState.cards]
      setCards(_.orderBy(arr, ['orderNum'],['asc']));
    }
  },[cardsState])

  useEffect(() => {
    if(newCard !== null && newCard.columns === column.id) {
      let cardPush = [...cards];
      let result = cardPush.findIndex(item => item.id === newCard.id)
      if(result > -1) { 
        cardPush[result] = newCard;
      }
      else {
        cardPush.push(newCard);
      }

      setCards(cardPush)
    }
  },[newCard])

  const handleClickAdd = () => {
    setIsAdd(true);
  }

  const handleCancelAdd = () => {
    setIsAdd(false);
  }
  return (
    <div className="column">
      <header className="column-drag-handle">
        <h2>{column.title}</h2>
      </header>
      <ul className={`card-list ${isAdd ? "colappse" : ""}` }>
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
            cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card}/>
              </Draggable>
            ))
          }      
        </Container> 
      </ul>
      <footer className={isAdd ? "is-active" : ""}>
        <div className="footer-wrapper" onClick={handleClickAdd}>
          <IoMdAdd/>
          <span>Add a card</span>
        </div>
        <Form
          onSubmit={(data, form) => {
            console.log(data)
            dispatch(postNewCard(data));
            form.reset();
          }}
         
        >
          {({ formProps, submitting, reset }) => (
            <form {...formProps} className="add-new-card-form">
              <Field
                name="columnId"
                defaultValue={column?.id}
                isRequired
              >
                
                {({ fieldProps }) => ( 
                  <input autoComplete="off" type="hidden"/>
                )}
              </Field>
              <Field
                name="title"
                label="Card title"
                defaultValue=""
                isRequired
                validate={async (value) => {
                    if (value !== undefined || value !== "") {
                        return undefined;
                    }

                    return new Promise((resolve) => setTimeout(resolve, 300)).then(
                        () => 'error',
                    );
                }}
              >
                {({ fieldProps, error, valid, meta }) => {
                return (
                    <Fragment>
                        <TextArea resize="auto" autoComplete='off' placeholder='Enter a tilte for this card...' type="text" {...fieldProps} />
                        {error && (
                            <ErrorMessage>
                            Card title is required
                            </ErrorMessage>
                        )}
                        {meta.validating && meta.dirty ? (
                            <HelperMessage>Checking......</HelperMessage>
                        ) : null}
                        {!meta.validating && valid && meta.dirty ? (
                            <ValidMessage>Awesome card title!</ValidMessage>
                        ) : null}
                    </Fragment>
                );
                }}
              </Field>
              <div className="add-new-card-control">
                <LoadingButton  className="btn-add" type="submit">Add card</LoadingButton>
                <MdClear onClick={handleCancelAdd}/>
              </div>
                
            </form>
          )}
        </Form>
      </footer>
    </div>
  )
}

export default Column