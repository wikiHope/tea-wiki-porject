import Api from '../store/api/axios-auth'
import { useDispatch, useSelector } from 'react-redux'
import { setEvents } from '../store/modules/event'
import { setLoading } from '../store/modules/loading'
import { useEffect } from 'react'
import Events from '../components/Events'

function PastEvents() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.event.events)

  const filter = {
    startDate: new Date('01/01/2018').toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  }

  useEffect(() => {
    dispatch(setLoading(false))
    Api().post('/events/filter', { ...filter }).then(response => {
      dispatch(setEvents(response.data))
      dispatch(setLoading(false))
    }).catch(error => {
      console.error('Error fetching data:', error)
      dispatch(setLoading(false))
    }) 
  }, [])


  return (
    <>
    <div className='container'>
      <Events data={events}></Events>
    </div>
    </>
  )
}

export default PastEvents