
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Api from '../../store/api/axios-auth'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/modules/loading'
import toastr from "toastr"

const initialValues = {
  name: '',
  address: '',
  latitude: '',
  longitude: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('Zorunlu Alan'),
  address: Yup.string().required('Zorunlu Alan'),
  latitude: Yup.number().required('Zorunlu Alan'),
  longitude: Yup.number().required('Zorunlu Alan'),
})

const Location = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.accessToken)

  const handleSubmit = (values) => {
    validationSchema.validate(values)
      .then(validData => {
        const mappedData = {
          name: validData.name,
          address: validData.address,
          coordinates: {
            type: 'Point',
            coordinates: [validData.latitude, validData.longitude]
          }
        }
        dispatch(setLoading(true))
        Api({}, token).post('/locations/add', { ...mappedData }).then(response => {
          dispatch(setLoading(false))
          toastr.success(response?.data?.message, "İşlem Başarılı!")
        }).catch(error => {
          console.error('Error fetching data:', error)
          dispatch(setLoading(false))
        })
      })
  }

  return (
    <div className="container mt-5">
      <h2>Mekan</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              İsim*
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="form-control"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Adres*
            </label>
            <Field
              type="text"
              name="address"
              id="address"
              className="form-control"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="latitude" className="form-label">
              Enlem*
            </label>
            <Field
              type="number"
              name="latitude"
              id="latitude"
              className="form-control"
            />
            <ErrorMessage
              name="latitude"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="longitude" className="form-label">
              Boylam*
            </label>
            <Field
              type="number"
              name="longitude"
              id="longitude"
              className="form-control"
            />
            <ErrorMessage
              name="longitude"
              component="div"
              className="text-danger"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Kaydet
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Location
