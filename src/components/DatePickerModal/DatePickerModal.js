import React, { Fragment, useState } from 'react'
import { LoadingButton } from '@atlaskit/button';
import Modal, {
    ModalTransition,
  } from '@atlaskit/modal-dialog';
import { MdClear } from 'react-icons/md';
import './DatePickerModal.scss'
import Calendar from '@atlaskit/calendar';
import Textfield from '@atlaskit/textfield';
import Form, { Field } from '@atlaskit/form';
import { TimePicker } from '@atlaskit/datetime-picker';
import { BsCalendar2Date  } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { updateCardDueDate } from 'store/reducer/cardReducer';
import moment from 'moment';

function DatePickerModal(props) {
    const { id } = props
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    let todayDate = moment().format("DD/MM/YYYY");

    const [dateChange, setDateChange] = useState(todayDate);
        
    
    const handleChangeDate = (value) => {
        setDateChange(moment(value?.iso, "YYYY-MM-DD").format("DD/MM/YYYY"))
    }

  return (
    <Fragment>
        <li className='card-tool-item'  onClick={() => setIsOpen(!isOpen)}>
        <BsCalendar2Date/>
        <span>Date</span>
        </li>
        <ModalTransition>
            {isOpen && (
            <Modal isBlanketHidden={true} onClose={() => setIsOpen(false)}  shouldScrollInViewport={true} width='304px'>
                <div className='modal-date'>
                    <div className='modal-date-header'>
                        <div></div>
                        <div className='modal-date-title'>Date</div>
                        <MdClear onClick={() => setIsOpen(false)}/>
                    </div>
                    <div className='modal-date-calendar'>
                        <Calendar
                            defaultSelected={todayDate}
                            testId={'calendar'}
                            onSelect={(value) => handleChangeDate(value)}
                        />  
                    </div>
                    <div className='modal-date-input'>
                    <Form
                        onSubmit={(data) => {
                            console.log(data.timeHour)
                            let date = data.dateDay + " " +  data.timeHour + ":00";
                            let dateCovert = moment(date,"DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
                            console.log(dateCovert)
                            let dataToSubmit = {
                                id: id,
                                dueDate: dateCovert
                            }
                            dispatch(updateCardDueDate(dataToSubmit))
                            setIsOpen(false)
                        }}
                    >
                    {({ formProps }) => (
                        <form {...formProps}>
                            <Field label="Date due" name="dateDay" isRequired defaultValue={dateChange}>
                                {({ fieldProps }) => (
                                <Fragment>
                                    <Textfield
                                        {...fieldProps}
                                        width={'110px'}
                                        isReadOnly={true}
                                        placeholder="dd/MM/yyyy"
                                    />
                                </Fragment>
                                )}
                            </Field>
                            <Field name="timeHour" isRequired defaultValue={"9:00"}>
                                {({ fieldProps }) => (
                                    <TimePicker {...fieldProps} placeholder="Select a hour" timeIsEditable />
                                )}
                            </Field>
                            <div className='modal-date-btn-submit'> 
                                <LoadingButton type="submit" appearance="primary">Save</LoadingButton>
                            </div>
                            
                        </form>
                    )}
                    </Form>
                        
                    </div>
                </div>
            </Modal>
            )}
        </ModalTransition>
    </Fragment>   
    
  )
}

export default DatePickerModal