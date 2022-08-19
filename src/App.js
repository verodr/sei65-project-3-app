import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import CommentPage from './components/CommentPage'
import CreateTopicPage from './components/CreateTopicPage'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import PageNavbar from './components/PageNavbar'
import Register from './components/Register'
import TopicPage from './components/TopicPage'
import NotFound from './components/NotFound' 


const App = () => {
  return (
    <div className= 'App'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/topic' element = {<TopicPage/>} />
          <Route path = '/topic/create' element = {<CreateTopicPage/>} />
          <Route path = '/topic/:single' element = {<CommentPage/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/notFound' element = {<NotFound/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  )
}  
export default App
