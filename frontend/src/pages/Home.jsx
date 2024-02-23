import Filter from '../components/Filter'
import Events from '../components/Events'
import PopularEvents from '../components/PopularEvents'
import { useSelector } from 'react-redux'

function Home() {
  const events = useSelector((state) => state.event.events)

  return (
    <>
      <div className='container'>
        <Filter></Filter>
        <PopularEvents data={events}></PopularEvents>
        <Events data={events}></Events>
      </div>
    </>
  )
}

export default Home