import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"

import App from "../App"
import Home from "../pages/Home"
import Place from "../pages/Place"
import EventDetail from "../pages/EventDetail"
import PastEvents from "../pages/PastEvents"
import Login from "../pages/Login"
import SignUp from "../pages/Signup"
import Admin from "../pages/Admin"

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.auth.accessToken)

  if (!token) {
    return <Navigate to="/" />
  }

  return (
    <Routes>
      <Route path="/" element={<Component />} />
    </Routes>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/past-events",
        element: <PastEvents />
      },
      {
        path: "/place/:placeId",
        element: <Place />
      },
      {
        path: "/event/:eventId",
        element: <EventDetail />
      },
      {
        path: "/admin",
        element: <PrivateRoute component={Admin} />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
])

export default router