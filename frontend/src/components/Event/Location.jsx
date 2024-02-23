import PropTypes from 'prop-types'
import Map from '../ui/Map'
import Api from '../../store/api/axios-auth'
import { useDispatch, useSelector } from 'react-redux'
import { setEvents } from '../../store/modules/event'
import { useEffect } from 'react'
import Events from '../Events'

function Location(props) {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.event.events)

  useEffect(() => {
    Api().post('/events/filter', {location: props.data._id}).then(response => {
      dispatch(setEvents(response.data))
    }).catch(error => {
      console.error('Error fetching data:', error)
    }) 
  }, [])

  const mapCustomStyle = {
    width: '100%',
    height: '360px'
  }

  return (
    <div className='location'>
      <h2 className='mb-3'>{props.data.name}</h2>
      <div className='mb-3'>{props.data.address}</div>
      <Map coordinates={props.data.coordinates} customStyle={mapCustomStyle}></Map>
      <div className='other-events mt-5 text-center'>
        <h3>Sahnedeki Diğer Etkinlikler</h3>
        <Events data={events}></Events>
      </div>
    </div>
  )
}

Location.propTypes = {
  data: PropTypes.object
}

export default Location
