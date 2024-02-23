import PropTypes from 'prop-types'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setModal } from '../../store/modules/modal'

import 'moment/locale/tr'

function Card(props) {
  const dispatch = useDispatch()

  const formatDate = (dateStr) => {
    return moment(dateStr).format('llll')
  }

  const handleShareClick = (e) => {
    e.preventDefault()
    dispatch(setModal({status: true, modalName: 'shareModalShow'}))
  }

  const isPast = () => {
    const currentDateTime = new Date()
    const date = new Date(props.data.date)
    
    return currentDateTime > date
  }

  return (
    <>
      <div className={`card m-2 ${isPast() ? 'filter' : ''}`}>
        <img src={props.data.profileImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.data.title}</h5>
          {
            isPast() ? (
              <div className='pastEvents'>
                <i>Bu etkinlik sona erdi</i>
              </div>
            ) : (
              <></>
            )
          }
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>
            {props.data.locationName}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-week me-2" viewBox="0 0 16 16">
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
            </svg>
            {formatDate(props.data.date)}
          </li>
        </ul>
        <div className="card-body d-flex justify-content-between">
          <h4>{props.data.minPrice}<small>,00</small> TL</h4>
          <div onClick={handleShareClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

Card.propTypes = {
  data: PropTypes.object
}

export default Card
