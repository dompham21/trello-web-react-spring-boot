import React, { Fragment, useCallback, useEffect, useState } from 'react'
import './Card.scss'
import Modal, {
  ModalTransition,
} from '@atlaskit/modal-dialog';
import DatePickerModal from 'components/DatePickerModal/DatePickerModal';
import Checklist from 'components/Checklist/Checklist';
import DescriptionCard from 'components/DescriptionCard/DescriptionCard';
import CoverModal from 'components/CoverModal/CoverModal';
import ChecklistModal from 'components/ChecklistModal/ChecklistModal';
import CardHeader from 'components/CardHeader/CardHeader';
import moment from 'moment';
import CardCover from 'components/CardCover/CardCover';
import { usePalette } from 'react-palette'
import { AiOutlineClockCircle, AiOutlineUnorderedList }  from 'react-icons/ai'
import { BsCheck2Square  } from 'react-icons/bs';


function Task(props) {
  const { card } = props

  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = usePalette(card?.background?.cover)

 

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const getTotalChecklist = () => {
    if(card?.taskLists) {
      let total = card?.taskLists.length;
      let totalDone = 0;
      card?.tasklists?.map(task =>  { if(task.state) totalDone++ });
  
      return totalDone + "/" + total;
    }
    else return "0/0"
   
}
  return (
    <Fragment>
      <li className="card-item" onClick={openModal}>
        {card?.background?.cover && <img src={card?.background?.cover}  alt="title-here-alt" onMouseDown={(e) => e.preventDefault()}/>}
        {card?.title}
        <div className='card-badges'>
          <div className='card-badges-time'>
            <AiOutlineClockCircle/>
            <span>
              {card?.dueDate && moment(card?.dueDate).format("MMM DD")}
            </span>
          </div>
          <div className='card-badges-description'>
            <AiOutlineUnorderedList/>
          </div>
          <div className='card-badges-checklist'>
            <BsCheck2Square/>
            <span>
              {getTotalChecklist()}
            </span>
          </div>
        </div>
      </li>
      <ModalTransition>
        {isOpen && (
          <Modal autoFocus={false} onClose={closeModal} width='large' shouldScrollInViewport={true}>
            {
              card?.background && data && 
              <CardCover card={card} color={card.background?.color ? card.background.color : data.muted}/>
            }
            <CardHeader closeModal={closeModal} title={card?.title} id={card?.id}/>
            <div className='card-body'>
              <div className='card-content-body'>
                <div className='card-module'>
                  <div className='card-module-header'></div>
                  {
                    card?.dueDate &&
                      <div className='card-module-gutter'>
                        <h3 className='card-date-title'>Date due</h3>
                        <div className='card-date-time'>
                          <span>
                            {card?.dueDate && moment(card?.dueDate).calendar({
                              sameDay: '[Today at] HH:mm A',
                              nextDay: '[Tomorrow at] HH:mm A',
                              lastDay: '[Yesterday at] HH:mm A',
                              sameElse: 'DD/MM/YYYY [at] HH:mm A'
                            })}
                          </span>
                        </div>
                      </div>
                  }
                  
                </div>
                <DescriptionCard id={card?.id} description={card?.description}/>
                {
                  card?.taskLists?.map((tasklist) => 
                    <Checklist tasklist={tasklist} key={tasklist.id} id={card?.id}/>
                  )
                }
              </div>
              <div className='card-side-bar'>
                <div className='card-side-bar-title'>Add to card</div>
                <ul className='card-tool-list'>
                  <ChecklistModal id={card?.id}/>
                  <CoverModal id={card?.id}/>
                  <DatePickerModal id={card?.id}/>
                </ul>
              </div>
            </div>
          </Modal>
        )}
      </ModalTransition>
    </Fragment>
  )
}

export default Task