import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Api from '../store/api/axios-auth'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../store/modules/auth'
import { useNavigate, Link } from "react-router-dom"

const initialValues = {
  userName: '',
  password: '',
}

const validationSchema = Yup.object({
  userName: Yup.string().required('Zorunlu Alan'),
  password: Yup.string().required('Zorunlu Alan'),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (values) => {
    Api().post('/auth/login', values).then(response => {
      if (response?.data?.access_token) {
        dispatch(setAccessToken(response.data.access_token))
        navigate("/")
      }
    }).catch(error => {
      console.error('Error fetching data:', error)
    })
  }

  return (
    <>
      <div id='login' className="py-5 container mt-5">
        <h2 className='text-center'>Giriş Yap</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className='row d-flex flex-column align-items-center'>
              <div className="col-lg-6 col-md-8 col-10 mb-3 mt-5">
                <label htmlFor="userName" className="form-label">
                  Kullanıcı Adı
                </label>
                <Field
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Kullanıcı adı giriniz"
                  className="form-control"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-lg-6 col-md-8 col-10 mb-5">
                <label htmlFor="password" className="form-label">
                  Şifre
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Şifre giriniz"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Giriş
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div id='signupItem' className='mt-3 text-center'>
        <span>Henüz bir üyeliğiniz yoksa <Link to="/signup">üye olmak için tıklayınız.</Link></span>
      </div>
    </>
  );
}

export default LoginPage