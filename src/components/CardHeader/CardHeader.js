import React, { useState } from 'react'
import Button from '@atlaskit/button';
import { AiOutlineClose, AiOutlineCreditCard } from 'react-icons/ai'
import TextField from '@atlaskit/textfield';
import './CardHeader.scss'
import { useDispatch } from 'react-redux';
import { updateCardTitle } from 'store/reducer/cardReducer';



function CardHeader(props) {
    const { closeModal, title, id } = props
    const [isFocusInput, setIsFocusInput] = useState(false);
    const [ keyword, setKeyword ] = useState(title);
    const dispatch  = useDispatch()
    const handleOnBlurInput = () => {
        setIsFocusInput(false)
        if(title !== keyword) {
            let dataToSubmit = {
                title: keyword,
                id: id
            }
            dispatch(updateCardTitle(dataToSubmit))
        }
    }

    const handleChangeInput = (e) => {
        const { value } = e.target;
        setKeyword(value)
    }
    return (
        <div className='card-header'>
            <div className='card-header-icon'>
            <AiOutlineCreditCard/>
            </div>
            <div className='card-title'>
                <TextField value={keyword} onChange={(e) => handleChangeInput(e)} className={`card-title-input${isFocusInput ? " is-editing" : ""}`} onFocus={() => setIsFocusInput(true)} onBlur={handleOnBlurInput}/>
                <div className='card-title-current-list'>in list WTF</div>
            </div>
            <Button appearance="link" onClick={closeModal}>
                <AiOutlineClose label="Close Modal"/>
            </Button>
        </div>
    )
}

export default CardHeader