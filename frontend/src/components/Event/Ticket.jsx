import PropTypes from 'prop-types'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setModal } from '../../store/modules/modal'

import 'moment/locale/tr'

function Ticket(props) {
  const dispatch = useDispatch()

  const formatDate = (date) => {
    const formattedDate = moment.utc(date).locale('tr').format('DD MMMM ddd [/] HH:mm')
    return formattedDate
  }

  const handleInfoClick = (e) => {
    e.preventDefault()
    dispatch(setModal({status: true, modalName: 'infoModalShow'}))
  }

  return (
    <div className='ticket me-5'>
      <div className='ticket__header'>
        <h2>Bilet Satın Alınız</h2>
        {
          props.isPickable ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16" onClick={handleInfoClick} >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
          ) : ''
        }
      </div>
      {
        props.seatingCategories.map((seating, index) => {
          return (
            <div key={index} className='d-flex my-3 ticket__card'>
              <div className='ticket__left'>
                <div className='ticket--date'>{formatDate(props.date)}</div>
                <div>{props.locationName}</div>
                <div className='ticket--type'>{seating.name}</div>
              </div>
              <div className='ticket__right'>
                {
                  seating.price ? (
                    <span className='price'>{seating.price}<small>.00 TL</small></span>
                  ) : (
                    'Bedava'
                  )
                }
              </div>
              <div className='ticket__bottom'>
                <span>
                  SATIN AL
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

Ticket.propTypes = {
  date: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  seatingCategories: PropTypes.array,
  isPickable: PropTypes.bool
}

export default Ticket
