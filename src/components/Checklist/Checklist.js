import React, { useState, Fragment } from 'react'
import ProgressBar from '@atlaskit/progress-bar';
import TextArea from '@atlaskit/textarea';          
import { MdClear } from 'react-icons/md'
import Button,{ LoadingButton } from '@atlaskit/button';
import { BsCheck2Square  } from 'react-icons/bs';
import './Checklist.scss'
import Form, { Field } from '@atlaskit/form';
import { postNewTask } from 'store/reducer/cardReducer';
import { useDispatch } from 'react-redux';
import Task from 'components/Task/Task';

function Checklist(props) {
    const { tasklist, id } = props;
    const [hideNewBtn, setHideNewBtn] = useState(false);

    const dispatch  = useDispatch();

    const calculatorPercentTaskDone = () => {
        let total = tasklist?.tasks.length;
        let totalDone = 0;
        tasklist?.tasks.map(task =>  { if(task.state) totalDone++ });

        if(totalDone === 0) return 0;
        return ((totalDone/total)).toFixed(2);
    }
    return (
        <div className='card-module'>
            <div className='card-module-header'>
            <div className='card-module-icon'>
                <BsCheck2Square/>
            </div>
            <div className='card-module-title'>
                <h3>{tasklist?.title}</h3>
            </div>
            </div>
            <div className='card-module-gutter checklist'>
                <div className='checklist-process'>
                <div className='process-percent'>{calculatorPercentTaskDone() * 100}%</div>
                <ProgressBar value={calculatorPercentTaskDone()} ariaLabel="Progress bar label"/>
                </div>
                <div className='checklist-list'>
                    {
                        tasklist?.tasks && tasklist?.tasks.map(task => (
                            <Task {...task} key={task.id} cardId={id} tasklistId={tasklist.id}/>
                        ))
                    }
                </div>
                <div className='checklist-new-item'>
                    <Button className={`btn-new ${hideNewBtn ? "btn-hide-on-edit": ""}`} onClick={() => setHideNewBtn(true)}>Add an item</Button>
                    <div className={`checklist-item-label ${hideNewBtn ? "editing" : ""}`} >
                        <Form
                            onSubmit={(data, form) => {
                                let dataToSubmit = {
                                    name: data.name,
                                    cardId: id,
                                    tasklistId: tasklist.id
                                }
                                dispatch(postNewTask(dataToSubmit))
                                setHideNewBtn(false)
                                form.reset()
                            }}
                        >
                        {({ formProps, submitting }) => (
                            <form {...formProps}>
                                <Field
                                    name="name"
                                    isRequired
                                    defaultValue={""}
                                >
                                    {({ fieldProps }) => (
                                        <Fragment>
                                            <TextArea {...fieldProps}  resize="auto" autoComplete='off' type='text' placeholder='Add an item...'/>
                                        </Fragment>                        
                                    )}
                                </Field>
                                <div className='edit-control'>
                                    <LoadingButton  className="btn-add" type="submit">Save</LoadingButton>
                                    <MdClear onClick={() => setHideNewBtn(false)}/>
                                </div>
                            </form>
                        )}
                        </Form>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Checklist