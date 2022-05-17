import React, { Fragment, useState } from 'react'
import { LoadingButton } from '@atlaskit/button';
import Modal, {
    ModalTransition,
  } from '@atlaskit/modal-dialog';
import { MdClear } from 'react-icons/md';
import Textfield from '@atlaskit/textfield';
import Form, { Field } from '@atlaskit/form';
import { BsCheck2Square  } from 'react-icons/bs';
import './ChecklistModal.scss'
import { useDispatch } from 'react-redux';
import { postNewTasklist } from 'store/reducer/cardReducer';

function ChecklistModal(props) {
    const { id } = props
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    return (
    <Fragment>
        <li className='card-tool-item' onClick={() => setIsOpen(!isOpen)}>
            <BsCheck2Square/>
            <span>Checklist</span>
        </li>
        <ModalTransition>
            {isOpen && (
            <Modal isBlanketHidden={true} onClose={() => setIsOpen(false)}  shouldScrollInViewport={true} width='304px'>
                <div className='modal-date'>
                    <div className='modal-date-header'>
                        <div></div>
                        <div className='modal-date-title'>Checklist</div>
                        <MdClear onClick={() => setIsOpen(false)}/>
                    </div>
                    <Form
                        onSubmit={(data) => {
                            let dataToSubmit = {
                                title: data.title,
                                cardId: id
                            }
                            setIsOpen(false);
                            dispatch(postNewTasklist(dataToSubmit))
                        }}
                    >
                    {({ formProps, submitting }) => (
                        <form {...formProps}>
                            <Field
                                name="title"
                                isRequired
                                label="Title"
                                defaultValue={""}
                            >
                                {({ fieldProps }) => (
                                    <Fragment>
                                        <Textfield
                                            {...fieldProps}
                                            placeholder="Add new checklist..."
                                        />
                                    </Fragment>                        
                                )}
                            </Field>
                            <div className='modal-date-btn-submit'> 
                                <LoadingButton type="submit" appearance="primary">Save</LoadingButton>
                            </div>
                        </form>
                    )}
                    </Form>
                </div>
                
            </Modal>
            )}
        </ModalTransition>
    </Fragment>
    
  )
}

export default ChecklistModal