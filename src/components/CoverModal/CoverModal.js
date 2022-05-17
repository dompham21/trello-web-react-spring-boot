import React, { Fragment, useState, useRef } from 'react'
import { LoadingButton } from '@atlaskit/button';
import Modal, {
    ModalTransition,
  } from '@atlaskit/modal-dialog';
import { MdClear } from 'react-icons/md';
import Form, { Field } from '@atlaskit/form';
import { BsImage  } from 'react-icons/bs';
import './CoverModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBackgrounds } from 'store/reducer/backgroundReducer';
import { updateCardCover } from 'store/reducer/cardReducer';

function CoverModal(props) {
    const { id } = props;
    const buttonsRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const backgrounds = useSelector((state) => state.background.backgrounds)
    const handleOpen = () => {
      setIsOpen(!isOpen);
      if(!Array.isArray(backgrounds) || backgrounds.length === 0) {
          dispatch(getAllBackgrounds());
      }
    }
    const dispatch = useDispatch();


    const ButtonImageBackgroundsColor = ({ backgrounds, changeHandler }) => (
        <Fragment>
          {
            backgrounds.map((background) => (
                <button
                    className='modal-cover-btn-select'

                    type="submit"
                    key={background.id}
                    style={{backgroundColor: background.color, backgroundImage: "unset"}}
                    onClick={(e) => {
                        e.preventDefault();
                        changeHandler(background.id);
                        if(buttonsRef) {
                            buttonsRef.current.map(bg => bg.className = "modal-cover-btn-select")
                            buttonsRef.current[background.id].className = "modal-cover-btn-select is-active"
                        }
                    }}
                    ref={el => buttonsRef.current[background.id] = el} 
                >
                </button>
            ))
          }
        </Fragment>
    );
     
    
    const ButtonImageBackgroundsImage = ({ backgrounds, changeHandler }) => (
       
        <Fragment>
          {
            backgrounds.map((background) => (
                <button
                    className='modal-cover-btn-select'
                    type="submit"
                    key={background.id}
                    style={{backgroundImage: `url(${background.cover})`}}
                    onClick={(e) => {
                        e.preventDefault();
                        changeHandler(String(background.id));
                        if(buttonsRef) {
                            buttonsRef.current.map(bg => bg.className = "modal-cover-btn-select")
                            buttonsRef.current[background.id].className = "modal-cover-btn-select is-active"
                        }
                    }}
                    ref={el => buttonsRef.current[background.id] = el} 
                >
                </button>
            ))
          }
        </Fragment>
    );


  return (
    <Fragment>
      <li className='card-tool-item' onClick={handleOpen}>
        <BsImage/>
        <span>Cover</span>
      </li>
      <ModalTransition>
        {isOpen && (
        <Modal isBlanketHidden={true} onClose={() => setIsOpen(false)}  shouldScrollInViewport={true} width='304px'>
            <div className='modal-date'>
                <div className='modal-date-header'>
                    <div></div>
                    <div className='modal-date-title'>Cover</div>
                    <MdClear onClick={() => setIsOpen(false)}/>
                </div>
                <Form
                    onSubmit={(data) => {
                        let dataToSubmit = {
                            id: id,
                            backgroundId: data.backgroundId
                        }

                        dispatch(updateCardCover(dataToSubmit))
                        setIsOpen(false);
                    }}
                >
                {({ formProps, submitting }) => (
                    <form {...formProps}>
                        <Field
                            name="backgroundId"
                            defaultValue="1"
                            isRequired
                        >
                            {({ fieldProps }) => (
                                <div className="modal-cover-bg" data-name={fieldProps.id} data-value={fieldProps.value}>
                                    <div className='modal-cover-bg-wrapper'>
                                        <div className='modal-cover-bg-label'>
                                            <h4>Colors</h4>
                                        </div>
                                        <div className="modal-cover-bg-color">
                                            <ButtonImageBackgroundsColor
                                                backgrounds={backgrounds.filter(item => item.color !== null)}
                                                changeHandler={fieldProps.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='modal-cover-bg-wrapper'>
                                        <div className='modal-cover-bg-label'>
                                            <h4>Photos</h4>
                                        </div>
                                        <div className="modal-cover-bg-color is-photo">
                                            <ButtonImageBackgroundsImage
                                                backgrounds={backgrounds.filter(item => item.cover !== null)}
                                                changeHandler={fieldProps.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>     
                                                        
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

export default CoverModal