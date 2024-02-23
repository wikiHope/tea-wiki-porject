import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Api from '../store/api/axios-auth'
import Description from '../components/Event/Description'
import Ticket from '../components/Event/Ticket'
import Organizer from '../components/Event/Organizer'
import Location from '../components/Event/Location'
import Slider from '../components/ui/Slider'
import defaultImage from '../assets/images/default.jpg'
import { setLoading } from '../store/modules/loading'
import { useDispatch } from 'react-redux'

function EventDetail() {
  const { eventId } = useParams()
  const [data, setData] = useState(null)

  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    dispatch(setLoading(true))
    Api().get(`/events/${eventId}`).then(response => {
      setData(response.data)
      dispatch(setLoading(false))
    }).catch(error => {
      dispatch(setLoading(false))
      console.error('Error fetching data:', error)
    })
  }, [location.pathname])

  const defaultImageList = [
    {
      url: defaultImage
    }
  ]

  return (
    <div className='container'>
      {
        data ? (
          <div className="row">
            <div className="col-12">
              <Slider data={data.images.length > 0 ? data.images : defaultImageList}></Slider>
            </div>
            <div className='col-12 mt-5'>
              <div className='row'>
                <div className="col-12 mb-5">
                  <Description title={data.title} description={data.description} socialMediaLinks={data.socialMediaLinks}></Description>
                </div>
                <div className="col-sm-6 mb-5">
                  <Ticket date={data.date} locationName={data.location.name} seatingCategories={data.seatingCategories} isPickable={data.isPickable}></Ticket>
                </div>
                <div className="col-sm-6 mb-5">
                  <Organizer data={data.organizer}></Organizer>
                </div>
                <div className="col-12 mb-5">
                  <Location data={data.location}></Location>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No Data</p>
        )
      }
    </div>
  )
}

export default EventDetail