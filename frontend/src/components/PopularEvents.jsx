
import PropTypes from 'prop-types'
import Slider from '../components/ui/Slider'

function PopularEvents(props) {
  const formatData = (data) => {
    return data.filter(item => item.isPopular === true).map((item) => {
      return {
        url: item.profileImage,
        caption: item.locationName,
        captionHeader: item.title
      }
    })
  }

  return (
    <>
      {
        props.data.length > 0 ? (
          <Slider data={formatData(props.data)}></Slider>
        ) : (
          <></>
        )
      }
    </>
  )
}

PopularEvents.propTypes = {
  data: PropTypes.array
}

export default PopularEvents
