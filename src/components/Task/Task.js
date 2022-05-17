import React, {useState, Fragment} from 'react'
import { Checkbox } from '@atlaskit/checkbox';
import TextArea from '@atlaskit/textarea';          
import { MdClear } from 'react-icons/md'
import { LoadingButton } from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';
import { postNewTask, updateTaskName, updateTaskState } from 'store/reducer/cardReducer';
import { useDispatch } from 'react-redux';

function Task(props) {
    const { id, name, cardId, state } = props
    const [editCheckBox, setEditCheckBox] = useState(false);
    const dispatch  = useDispatch();
    const handleCheckBox = (e) => {
        let checked = e.target.checked
        if(checked !== state) {
            let dataToSubmit = {
                state: checked,
                cardId: cardId,
                id: id
            }
            dispatch(updateTaskState(dataToSubmit))
        }
    }
    return (
        <div className='checklist-item' >
            <div className='checklist-item-checkbox'>
                <Checkbox
                    name="controlled-checkbox"
                    size="medium"
                    isChecked={state}
                    onChange={(e) => handleCheckBox(e)}
                />
            </div>
            <div className={`checklist-item-text ${!editCheckBox ? "hide-on-edit" : ""}`} onClick={() => setEditCheckBox(true)}>
                <span style={{textDecoration: state ? "line-through" : "unset", color: state ? "#5e6c84" : "#172b4d"}}>{name}</span>
            </div>
            <div className={`checklist-item-label ${editCheckBox ? "editing" : ""}`}>
                <Form
                    onSubmit={(data, form) => {
                        let dataToSubmit = {
                            name: data.name,
                            cardId: cardId,
                            id: id
                        }
                        dispatch(updateTaskName(dataToSubmit))
                        form.reset()
                        setEditCheckBox(false)
                    }}
                >
                {({ formProps, submitting }) => (
                    <form {...formProps}>
                        <Field
                            name="name"
                            isRequired
                            defaultValue={name}
                        >
                            {({ fieldProps }) => (
                                <Fragment>
                                    <TextArea {...fieldProps}  resize="auto" autoComplete='off' type='text' />
                                </Fragment>                        
                            )}
                        </Field>
                        <div className='edit-control'>
                            <LoadingButton className="btn-add" type="submit">Save</LoadingButton>
                            <MdClear onClick={() => setEditCheckBox(false)}/>
                        </div>
                    </form>
                )}
                </Form>
            </div>
        </div>
    )
}

export default Task