import Column from 'components/Column/Column';
import React, { Fragment, useEffect, useState } from 'react'
import './BoardContent.scss';
import {isEmpty} from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from 'utilities/dragDrog'
import { IoMdAdd } from 'react-icons/io'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import Form, {
  ErrorMessage,
  Field,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';
import LoadingButton from '@atlaskit/button/loading-button';
import TextField from '@atlaskit/textfield';
import {  getAllColumn, postNewColumn } from 'store/reducer/columnReducer';
import {useParams} from "react-router-dom";
import { updateOrderNumCard } from 'store/reducer/cardReducer';

function BoardContent(props) {
  const { board } = props;
  const [columns, setColumns] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const dispatch = useDispatch();
  const {id} = useParams();
  const isLoading = useSelector(state => state.column.isLoading)
  const columnsState = useSelector(state => state.column.columns)
  const newColumn = useSelector(state => state.column.column)

  useEffect(() => {
    dispatch(getAllColumn(id))
  },[])

 

  useEffect(() => {
    setColumns(columnsState);
  },[columnsState])

  useEffect(() => {
    if(newColumn !== null) {
      let columnPush = [...columns];
      columnPush.push(newColumn)
      setColumns(columnPush)
    }
  },[newColumn])


  
  if(isEmpty(board) || board === null) {
    return <div className="not-found">Board not found</div>
  }

  const onDropColumn = (dropResult) => {
    console.log(dropResult)
    let newColumns = applyDrag([...columns], dropResult);
    
    let newBoard = {...board}
    newBoard.columns = newColumns;

    // setColumns(newColumns);
  }


  const onCardDrop = (columnId, dropResult) => {
    const { removedIndex, addedIndex } = dropResult;

    if(removedIndex !== null && addedIndex !== null) {
      console.log("index remove: " + removedIndex);
      console.log("index add: " + addedIndex)
      let currentColumn = columns.find(c => c.id === columnId);
      console.log("remove: " + JSON.stringify(currentColumn.cards[removedIndex]))
      console.log("add: " + JSON.stringify(currentColumn.cards[addedIndex]))

      let dataToSubmit = {
        "columnId": columnId,
        "id1": currentColumn.cards[removedIndex].id,
        "id2": currentColumn.cards[addedIndex].id,
        "orderNum1": currentColumn.cards[removedIndex].orderNum,
        "orderNum2": currentColumn.cards[addedIndex].orderNum
      }

      dispatch(updateOrderNumCard(dataToSubmit))
    }
  }

  const handleClickAdd = () => {
    setIsAdd(true);
  }

  const handleCancelAdd = () => {
    setIsAdd(false);
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
      <div className={`add-new-column ${isAdd ? 'is-active' : ''}`}>
        <div className="add-new-col-placeholder" onClick={handleClickAdd}>
          <IoMdAdd/>
          <span>Add another list</span>
        </div>
        <Form
          onSubmit={(data, form) => {
            dispatch(postNewColumn(data));
            form.reset();
          }}
         
        >
          {({ formProps, submitting, reset }) => (
            <form {...formProps} className="add-new-col-form">
              <Field
                name="boardId"
                defaultValue={board?.id}
                isRequired
              >
                
                {({ fieldProps }) => ( 
                  <input autoComplete="off" type="hidden"/>
                )}
              </Field>
              <Field
                name="title"
                label="Column title"
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
                        <TextField autoComplete='off' placeholder='Enter colum tilte...' type="text" {...fieldProps} />
                        {error && (
                            <ErrorMessage>
                            Column title is required
                            </ErrorMessage>
                        )}
                        {meta.validating && meta.dirty ? (
                            <HelperMessage>Checking......</HelperMessage>
                        ) : null}
                        {!meta.validating && valid && meta.dirty ? (
                            <ValidMessage>Awesome column title!</ValidMessage>
                        ) : null}
                    </Fragment>
                );
                }}
              </Field>
              <div className="add-new-col-control">
                <LoadingButton isLoading={isLoading} className="btn-add" type="submit">Add list</LoadingButton>
                <MdClear onClick={handleCancelAdd}/>
              </div>
                
            </form>
          )}
        </Form>
      </div>
    </div>
  )
}

export default BoardContent