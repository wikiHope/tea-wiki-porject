import { useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'

function LoadingOverlay() {
  const loading = useSelector((state) => state.loading.loading)

  return (
    <div className={`loading-overlay ${loading ? 'visible' : ''}`}>
      <div className="loading-spinner">
        <Spinner />
      </div>
    </div>
  )
}

export default LoadingOverlay
