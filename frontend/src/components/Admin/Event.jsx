import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import Api from '../../store/api/axios-auth'
import cities from '../../data/cities'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/modules/loading'
import toastr from "toastr"

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const initialValues = {
  title: '',
  description: '',
  category: '',
  images: [
    { url: '' }
  ],
  date: getCurrentDateTime(),
  cityId: '',
  location: '',
  seatingCategories: [
    { name: '', price: '' }
  ],
  isPopular: false,
  socialMediaLinks: [],
  organizer: ['']
}

const validationSchema = Yup.object({
  title: Yup.string().required('Zorunlu Alan'),
  description: Yup.string(),
  category: Yup.string().required('Zorunlu Alan'),
  images: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().url('Geçersiz URL').required('Zorunlu Alan')
    })
  ),
  date: Yup.date(),
  cityId: Yup.number().required('Zorunlu Alan'),
  location: Yup.string().required('Zorunlu Alan'),
  seatingCategories: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Zorunlu Alan'),
      price: Yup.number().required('Zorunlu Alan')
    })
  ),
  isPopular: Yup.boolean(),
  socialMediaLinks: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      url: Yup.string().url('Geçersiz URL')
    })
  ),
  organizer: Yup.array().of(Yup.string().required('Zorunlu Alan')),
})

const Event = () => {
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])

  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.accessToken)

  const handleSubmit = (values) => {
    values.date = new Date(values.date).toISOString()

    validationSchema.validate(values)
      .then(validData => {
        dispatch(setLoading(true))
        Api({}, token).post('/events/add', { ...validData }).then(response => {
          dispatch(setLoading(false))
          toastr.success(response?.data?.message, "İşlem Başarılı!")
        }).catch(error => {
          console.error('Error fetching data:', error)
          dispatch(setLoading(false))
        })
      })
  }

  useEffect(() => {
    // categories
    Api().get('/categories').then(response => {
      setCategories(response.data)
    }).catch(error => {
      console.error('Error fetching data:', error)
    })

    //locations
    Api().get('/locations').then(response => {
      setLocations(response.data)
    }).catch(error => {
      console.error('Error fetching data:', error)
    })

	}, [])

  return (
    <div className="container mt-5">
      <h2>Event</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          ({ values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Başlık*
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Açıklama
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Kategori*
                </label>
                <Field
                  as="select"
                  name="category"
                  id="category"
                  className="form-control"
                >
                  <option value="" label="Seçiniz" />
                  {
                    categories.map((item, index) => {
                      return (
                        <option key={index} value={item.id} label={item.name}></option>
                      )
                    })
                  }
                </Field>
                <ErrorMessage name="category" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Tarih
                </label>
                <Field
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="form-control"
                />
                <ErrorMessage name="date" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="cityId" className="form-label">
                  Şehir*
                </label>
                <Field
                  as="select"
                  name="cityId"
                  id="cityId"
                  className="form-control"
                >
                  <option value="" label="Seçiniz" />
                  {
                    cities.map((item, index) => {
                      return (
                        <option key={index} value={item.id} label={item.name}></option>
                      )
                    })
                  }
                </Field>
                <ErrorMessage name="cityId" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Mekan*
                </label>
                <Field
                  as="select"
                  name="location"
                  id="location"
                  className="form-control"
                >
                  <option value="" label="Seçiniz" />
                  {
                    locations.map((item, index) => {
                      return (
                        <option key={index} value={item.id} label={item.name}></option>
                      )
                    })
                  }
                </Field>
                <ErrorMessage name="location" component="div" className="text-danger" />
              </div>
              <div className="mb-3 d-flex align-content-center align-items-center">
                <label htmlFor="isPopular" className="form-label me-2 mb-1">
                  Popüler
                </label>
                <Field
                  type="checkbox"
                  name="isPopular"
                  id="isPopular"
                />
                <ErrorMessage name="isPopular" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="seatingCategories" className="form-label">
                  Koltuk Kategorisi*
                </label>
                <FieldArray name="seatingCategories">
                  {({ push, remove }) => (
                    <div>
                      {values.seatingCategories.map((_, index) => (
                        <div key={index}>
                          <Field
                            type="text"
                            name={`seatingCategories[${index}].name`}
                            placeholder="İsim"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`seatingCategories[${index}].name`}
                            component="div"
                            className="text-danger"
                          />
                          <Field
                            type="number"
                            name={`seatingCategories[${index}].price`}
                            placeholder="Fiyat"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`seatingCategories[${index}].price`}
                            component="div"
                            className="text-danger"
                          />
                          <button type="button" className='btn-admin' onClick={() => remove(index)}>
                            Kaldır
                          </button>
                        </div>
                      ))}
                      <button type="button" className='btn-admin mt-2' onClick={() => push({ name: '', price: '' })}>
                        Ekle
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>  
              <div className="mb-3">
                <label htmlFor="socialMediaLinks" className="form-label">
                  Sosyal Medya
                </label>
                <FieldArray name="socialMediaLinks">
                  {({ push, remove }) => (
                    <div>
                      {values.socialMediaLinks.map((_, index) => (
                        <div key={index}>
                          <Field
                            type="text"
                            name={`socialMediaLinks[${index}].name`}
                            placeholder="İsim"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`socialMediaLinks[${index}].name`}
                            component="div"
                            className="text-danger"
                          />
                          <Field
                            type="url"
                            name={`socialMediaLinks[${index}].url`}
                            placeholder="URL"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`socialMediaLinks[${index}].url`}
                            component="div"
                            className="text-danger"
                          />
                          <button type="button" className='btn-admin' onClick={() => remove(index)}>
                            Kaldır
                          </button>
                        </div>
                      ))}
                      <button type="button" className='btn-admin mt-2' onClick={() => push({ name: '', url: '' })}>
                        Ekle
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>     
              <div className="mb-3">
                <label htmlFor="organizer" className="form-label">
                  Sanatçı/lar*
                </label>
                <FieldArray name="organizer">
                  {({ push, remove }) => (
                    <div>
                      {values.organizer.map((_, index) => (
                        <div key={index}>
                          <Field
                            type="text"
                            name={`organizer[${index}]`}
                            placeholder="İsim"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`organizer[${index}]`}
                            component="div"
                            className="text-danger"
                          />
                          <button type="button" className='btn-admin' onClick={() => remove(index)}>
                            Kaldır
                          </button>
                        </div>
                      ))}
                      <button type="button" className='btn-admin mt-2' onClick={() => push('')}>
                        Ekle
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">
                  Fotoğraflar*
                </label>
                <FieldArray name="images">
                  {({ push, remove }) => (
                    <div>
                      {values.images.map((_, index) => (
                        <div key={index}>
                          <Field
                            type="url"
                            name={`images[${index}].url`}
                            placeholder="URL"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`images[${index}].url`}
                            component="div"
                            className="text-danger"
                          />
                          <button type="button" className='btn-admin' onClick={() => remove(index)}>
                            Kaldır
                          </button>
                        </div>
                      ))}
                      <button type="button" className='btn-admin mt-2' onClick={() => push({ url: '' })}>
                        Ekle
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>    
              <button type="submit" className="btn btn-primary">
                Kaydet
              </button>
            </Form>
          )}
      </Formik>
    </div>
  );
};

export default Event;
