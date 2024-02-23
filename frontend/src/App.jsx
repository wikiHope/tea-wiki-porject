import Header from './pages/Header'
import Footer from './pages/Footer'
import { Outlet } from 'react-router-dom'
import ShareModal from './components/modal/Share'
import InfoModal from './components/modal/Info'

function App() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
      <ShareModal></ShareModal>
      <InfoModal></InfoModal>
    </>
  )
}

export default App
