import PropTypes from 'prop-types'
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

function Map(props) {

  const {isLoaded } = useJsApiLoader({ id: "event-location", googleMapsApiKey: import.meta.env.REACT_APP_MAPS_API_KEY})

  const center =  {
    lat: props.coordinates.coordinates[0],
    lng: props.coordinates.coordinates[1]
  }

  return isLoaded ? (
    <>
      <GoogleMap  mapContainerStyle={props.customStyle} center={center} zoom={10} >
          <Marker position={center}></Marker>
      </GoogleMap>
    </>
  ) : ( 
    <></> 
  )
}

Map.propTypes = {
  coordinates: PropTypes.object,
  customStyle: PropTypes.object
}

export default Map
