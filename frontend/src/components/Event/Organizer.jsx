import PropTypes from 'prop-types'
import unknownImage from '../../assets/images/unknown.png'

function Organizer(props) {
  return (
    <div className='organizer'>
      <h2 className='mb-3'>Sanatçılar</h2>
      {
        props.data.map((organizer, index) => {
          return (
            <div key={index}>
              <div className='organizer__image mb-2'>
                <img alt={organizer} src={unknownImage}/>
              </div>
              <div className='organizer__body'>{organizer}</div>
            </div>
          )
        })
      }
    </div>
  )
}

Organizer.propTypes = {
  data: PropTypes.array
}

export default Organizer
