import HomeBoardItem from 'components/HomeBoardItem/HomeBoardItem'
import React, {useState,Fragment, useEffect, useRef} from 'react'
import "./HomeWorkSpace.scss"
import Popup from '@atlaskit/popup';
import {MdClose} from 'react-icons/md'
import LoadingButton from '@atlaskit/button/loading-button';
import TextField from '@atlaskit/textfield';
import {AiOutlineCheck} from 'react-icons/ai'
import Form, {
    ErrorMessage,
    Field,
    FormFooter,
    HelperMessage,
    ValidMessage,
  } from '@atlaskit/form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBackgrounds } from 'store/reducer/backgroundReducer';
import isEmpty from 'lodash'
import { getAllBoard, postNewBoard } from 'store/reducer/boardReducer';

function HomeWorkSpace() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentBG, setCurrentBG] = useState({}); 
    const dispatch = useDispatch();
    const buttonsRef = useRef([]);
    const previewRef = useRef(null);


    const backgrounds = useSelector((state) => state.background.backgrounds)
    const isSubmitingBoard = useSelector((state) => state.board.isLoading)
    const boards = useSelector((state) => state.board.boards)


    const handleOpenAddNew = () => {
        setIsOpen(!isOpen);
        if(!Array.isArray(backgrounds) || backgrounds.length === 0) {
            dispatch(getAllBackgrounds());
        }
    }

    useEffect(()=> {
        dispatch(getAllBoard())
    } ,[dispatch])

    
    useEffect(()=> {
        if(Array.isArray(backgrounds) && backgrounds.length > 0) {
            setCurrentBG(backgrounds[0])
        }
    } ,[backgrounds])

    useEffect(()=> {
        if(!isSubmitingBoard && isOpen) {
            setIsOpen(false);
        }
    } ,[isSubmitingBoard])


    const ButtonImageBackgroundsColor = ({ backgrounds, changeHandler }) => (
        <Fragment>
          {
            backgrounds.map((background) => (
                <button
                    type="submit"
                    key={background.id}
                    style={{backgroundColor: background.color, backgroundImage: "unset"}}
                    onClick={(e) => {
                        e.preventDefault();
                        changeHandler(background.id);

                        if(buttonsRef) {
                            buttonsRef.current.map(bg => bg.className = "")
                            buttonsRef.current[background.id].className = "is-active"
                        }
                        if(previewRef) {
                            previewRef.current.style.backgroundColor = background.color;
                            previewRef.current.style.backgroundImage = "unset";
                        }
                    }}
                    ref={el => buttonsRef.current[background.id] = el} 

                >
                    <AiOutlineCheck/>

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
                    type="submit"
                    key={background.id}
                    style={{backgroundImage: `url(${background.cover})`}}
                    onClick={(e) => {
                        e.preventDefault();
                        changeHandler(String(background.id));
                        if(buttonsRef) {
                            buttonsRef.current.map(bg => bg.className = "")
                            buttonsRef.current[background.id].className = "is-active"
                        }

                        if(previewRef) {
                            previewRef.current.style.backgroundColor = "unset";
                            previewRef.current.style.backgroundImage = `url(${background.cover})`;
                        }
                    }}
                    ref={el => buttonsRef.current[background.id] = el} 
                >
                    <AiOutlineCheck/>
                </button>
            ))
          }
        </Fragment>
    );
    const PopUpAddNew = () => {
      return (
          <section className="popup-add-new">
            <header className="popup-add-new-header">
                <div></div>
                <div className="title">Create board</div>
                <MdClose onClick={() => setIsOpen(false)}/>
            </header>
            <div className="popup-add-new-content">
                <div className="preview">
                    {
                        (isEmpty(currentBG) || currentBG != null) ? 
                            <div className="preview-bg" ref={previewRef} style={{backgroundImage: currentBG.cover ? `url(${currentBG.cover})` : "unset", 
                                backgroundColor: currentBG.color ? currentBG.color : "unset"}}
                            >
                                <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"/>
                            </div>
                        : 
                            <div className="preview-bg" >
                                <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"/>
                            </div>
                    }
                    
                </div>
                <Form
                    onSubmit={(data) => {
                        dispatch(postNewBoard(data))
                    }}
                >
                {({ formProps, submitting }) => (
                    <form {...formProps}>
                        <Field
                            name="backgroundId"
                            label="Background"
                            defaultValue="1"
                            isRequired
                        >
                            {({ fieldProps }) => (
                                <div className="background-picker" data-name={fieldProps.id} data-value={fieldProps.value}>
                                        {console.log(fieldProps)}
                                    <div className="background-picker-img">
                                        <ButtonImageBackgroundsImage
                                            backgrounds={backgrounds.filter(item => item.cover !== null)}
                                            changeHandler={fieldProps.onChange}
                                        />
                                    </div>
                                    <div className="background-picker-color">
                                        <ButtonImageBackgroundsColor
                                            backgrounds={backgrounds.filter(item => item.color !== null)}
                                            changeHandler={fieldProps.onChange}
                                        />
                                    </div>
                                    
                                </div>     
                                                        
                            )}
                        </Field>
                        <Field
                            name="title"
                            label="Board title"
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
                                    <TextField type="title" {...fieldProps} />
                                    {error && (
                                        <ErrorMessage>
                                        Board title is required
                                        </ErrorMessage>
                                    )}
                                    {meta.validating && meta.dirty ? (
                                        <HelperMessage>Checking......</HelperMessage>
                                    ) : null}
                                    {!meta.validating && valid && meta.dirty ? (
                                        <ValidMessage>Awesome board title!</ValidMessage>
                                    ) : null}
                                </Fragment>
                            );
                            }}
                        </Field>
                        <FormFooter>
                            <LoadingButton className="btn-submit" type="submit" isLoading={isSubmitingBoard}>Create</LoadingButton>
                        </FormFooter>
                    </form>
                )}
                </Form>
            </div>
          </section>
      )
  }  
  return (
    <div className="all-board">
        <h2 className="title">YOUR WORKSPACES</h2>
        <div className="grid-board">
            {
                Array.isArray(boards) && boards.length > 0 && boards.map((board, index) => (
                    <HomeBoardItem key={board.id} {...board}/>
                ))
            }
            <div className="board-item add-new">
                
                <Popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    placement="auto"
                    content={() => <PopUpAddNew/>}
                    trigger={(triggerProps) => (
                        <div {...triggerProps} className="board-item-bg" onClick={handleOpenAddNew}>
                            <div className="board-title-details">
                                <div className="board-title-details-name">Create new board</div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    </div>
  )
}

export default HomeWorkSpace