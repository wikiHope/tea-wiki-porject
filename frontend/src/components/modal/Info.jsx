import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../store/modules/modal'

function InfoModal() {
  const dispatch = useDispatch()
  const isShow = useSelector((state) => state.modal.infoModalShow)

  const onHideHandler = () => {
    dispatch(setModal({status: false, modalName: 'infoModalShow'}))
  }

  return (
    <div className={`modal ${isShow ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onHideHandler}>&times;</span>
        <h4 className='text-center mb-4'>Oturma Planı</h4>
        <img src="https://ckm.kadikoy.bel.tr/Uploads/Image/images/b_salon_oturma.jpg" className="" alt="oturma planı" />
      </div>
    </div>
  )
}

export default InfoModal