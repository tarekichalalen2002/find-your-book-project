import React from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AddBookForm from './pages/AddBookForm'
import Authors from './pages/Authors'
import SignIn from './pages/SignIn'
import { useDispatch, useSelector } from 'react-redux'
import { selectShowSideBar, setShowSidebar } from './states'

const App = () => {

  const showSidebar = useSelector(selectShowSideBar)
  const dispatch = useDispatch()

  return (
    <Router>
      <main className=' flex items-start bg-gray-50'>
        <Sidebar /> 
        <div className=' w-full relative'>
          <Navbar />  
          <div className=' px-3 py-4'>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/authors' element={<Authors />} />
              <Route path='/add-book' element={<AddBookForm />} />
              <Route path='/register' element={<SignIn />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </div>
          <section className={` ${!showSidebar ? 'hidden' : 'lg:hidden block'} absolute top-0 h-screen w-full bg-gray-800 bg-opacity-80`} onClick={() => dispatch(setShowSidebar({ value: false }))}></section>
        </div>
      </main>
    </Router>
  )
}

export default App