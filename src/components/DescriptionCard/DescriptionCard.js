import React, { useState, Fragment, useRef } from 'react'
import TextArea from '@atlaskit/textarea';          
import { MdClear } from 'react-icons/md'
import { LoadingButton } from '@atlaskit/button';
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Form, { Field } from '@atlaskit/form';
import './DescriptionCard.scss';
import { useDispatch } from 'react-redux';
import { updateCardDescription } from 'store/reducer/cardReducer';

function DescriptionCard(props) {
  const { id, description } = props
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  console.log(description)
  return (
    <div className='card-module'>
      <div className='card-module-header'>
        <div className='card-module-icon'>
            <AiOutlineUnorderedList/>
        </div>
        <div className='card-module-title'>
            <h3>Description</h3>
        </div>
      </div>
      <div className='card-module-gutter'>
        <div className={`description-fake-text-area ${isEditing || description ? "hide-on-edit": ""}`} onClick={() => setIsEditing(true)}> 
          Add a more detailed description...
        </div>
        <p className={`description-markdown ${!description || isEditing  ? "hide-on-edit" : ""}`} onClick={() => setIsEditing(true)}>{description}</p>
        <div className={`description-text-area ${isEditing ? "is-editing" : ""}`}>
          <Form
              onSubmit={(data) => {
                let dataToSubmit = {
                  id: id,
                  description: data.description
                }
                setIsEditing(false)
                dispatch(updateCardDescription(dataToSubmit))
              }}
          >
          {({ formProps, submitting }) => (
              <form {...formProps}>
                  <Field
                      name="description"
                      isRequired
                      label=""
                      defaultValue={description}
                  >
                    {({ fieldProps }) => (
                        <Fragment>
                          <TextArea {...fieldProps} resize="auto" autoComplete='off' type='text' placeholder='Add a more detailed description...'/>
                        </Fragment>                        
                    )}
                  </Field>
                  <div className='edit-control'>
                    <LoadingButton  className="btn-add" type="submit">Save</LoadingButton>
                    <MdClear onClick={() => setIsEditing(false)}/>
                  </div>
              </form>
          )}
          </Form>
          
        </div>
      </div>
    </div>
  )
}

export default DescriptionCard