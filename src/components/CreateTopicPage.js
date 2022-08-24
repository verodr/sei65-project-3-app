import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateTopicPage = () => {
  const [resStatus, setResStatus] = useState('')
  const [userInput, setUserInput] = useState('')
  const [ errors, setErrors ] = useState('')
  const [ topicData, setTopicData ] = useState({
    topic: '',
    description: '',
    imageUrl: '',
  })
  
  const navigate = useNavigate()

  const checkLogin = (comm) => {
    if (!localStorage.getItem('token')) {
      setResStatus({ status: 'NoToken' })
      return false
    }
    const currentUserName = localStorage.getItem('userName')
    if (currentUserName !== comm.topicUser){
      setResStatus({ status: 'WrongToken' })
      return false
    }
    console.log(localStorage.getItem('userName'))
    return true
  }

  const handleChange = (e) => {
    setTopicData({ ...topicData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  const createTopic = async (e) => {
    e.preventDefault()
    if (!checkLogin({ topicUser: localStorage.getItem('userName') })){
      return 
    }
    //the code below is to check if the url is the right format to be printed
    const body = topicData
    if (body.imageUrl.match(/\.(jpeg|jpg|gif|png)$/) === null && body.imageUrl !== '')  { 
      setResStatus('wrong-url')
      return 
    }

    try {
      console.log(body)
      const res = await axios.post('http://localhost:4000/topic', body)
      setResStatus(res)
      navigate('/topic')
    } catch (error){
      console.log(error.response)
      setErrors(error.response.data.message)
    }
    setTopicData({
      topic: '',
      description: '',
      imageUrl: '' })
  }
  
  return (
    <div className='create-container'>
      <h1 className='create-title'>Create Topic</h1>
      <form onSubmit={createTopic} className='create-form'>
        <input type='text' name='topic' placeholder='topic here' value= {topicData.topic} onChange={handleChange}/>
        <textarea name='description' placeholder='type text here' id="message-box" value={topicData.description} onChange={handleChange}></textarea>
        <input type='text' name='imageUrl' placeholder='Url img' value={topicData.imageUrl} onChange={handleChange}/>
        { resStatus === 'wrong-url' && <p className='text-danger'> ERROR:The url provided is not a supported format!</p>}
        <p> { errors } </p>
        <div className='create-button-container'>
          <button type='submit' className='create-button'>CREATE</button>
        </div>
      </form>
    </div>
    
  )
  
}

export default CreateTopicPage