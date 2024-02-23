import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Api from '../../store/api/axios-auth'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/modules/loading'
import toastr from "toastr"

const initialValues = {
  name: '',
  description: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('Zorunlu Alan'),
  description: Yup.string(),
})


function Category() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.accessToken)

  const handleSubmit = (values) => {
    validationSchema.validate(values)
      .then(validData => {
        dispatch(setLoading(true))
        Api({}, token).post('/categories/add', { ...validData }).then(response => {
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
      <h2>Kategori</h2>
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
            <label htmlFor="description" className="form-label">
              Etkinlik Detayı
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              className="form-control"
            />
            <ErrorMessage
              name="description"
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
  )
}

export default Category