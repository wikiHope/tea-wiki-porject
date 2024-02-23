import SearchInput from "../components/ui/SearchInput"
import Api from '../store/api/axios-auth'
import { setLoading } from '../store/modules/loading'
import { useDispatch, useSelector } from 'react-redux'
import { setEvents } from '../store/modules/event'
import { Link, useNavigate } from 'react-router-dom'
import { removeAccessToken } from '../store/modules/auth'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.accessToken)

  const filters = useSelector((state) => state.filter.filters)

  const logoutHandler = () => {
    dispatch(removeAccessToken())
    navigate("/")
  }

  const clickHandler = (event) => {
    dispatch(setLoading(true))
    Api().post('/events/filter', { keyword: event, ...filters}).then(response => {
      dispatch(setEvents(response.data))
      dispatch(setLoading(false))
    }).catch(error => {
      console.error('Error fetching data:', error)
      dispatch(setLoading(false))
    })
  }

  return (
    <>
      <div id="header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-ticket-perforated" viewBox="0 0 16 16">
                <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9H4m7 0v.9h1v-.9h-1m-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/>
                <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/>
              </svg>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="d-flex align-items-center">
                      <Link to="/past-events" className="nav-link active" id="navItem">Geçmiş Etkinlikler</Link>
                    </div>
                  </li>
                  {
                    token ? (
                      <li className="nav-item">
                        <div className="d-flex align-items-center">
                          <Link to="/admin" className="nav-link active" id="navItem">Yönetici Paneli</Link>
                        </div>
                      </li>
                    ) : (
                      ""
                    )
                  }
                </ul>
                <SearchInput placeholder="Etkinlik veya Sanatçı arayın" label="Etkinlik veya Sanatçı arayın" clickHandler={clickHandler}></SearchInput>
                {
                  token ? (
                    <button className="btn btn-outline-success btn-primary" type="submit" onClick={logoutHandler}>
                      Çıkış
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-walking m-2" viewBox="0 0 16 16">
                        <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.75 1.75 0 0 1-.088.395l-.318.906.213.242a.75.75 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
                        <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.75.75 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843a1.93 1.93 0 0 0 .006-.067l1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
                      </svg>
                    </button>
                  ) : (
                    <Link to="/login">
                      <button className="btn btn-outline-success btn-primary" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-walking m-2" viewBox="0 0 16 16">
                          <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.75 1.75 0 0 1-.088.395l-.318.906.213.242a.75.75 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
                          <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.75.75 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843a1.93 1.93 0 0 0 .006-.067l1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
                        </svg>
                        Giriş
                      </button>
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
        </nav>      
      </div>
    </>

  )
}

export default Header