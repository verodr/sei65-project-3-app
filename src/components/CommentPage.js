import { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'

const CommentPage = () => {

  // Set of states
  const { single } = useParams()
  const [ data, setData] = useState([])
  const [ commentList, setCommentList ] = useState([])
  const [resStatus, setResStatus] = useState('')

  const [userInput, setUserInput] = useState('')
  const [updateInput, setUpdateInput] = useState('')

  const [ errors, setErrors ] = useState(false)
  const [updating, setUpdating] = useState('')
  const navigate = useNavigate()



  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://readit-project.herokuapp.com/topic/${single}`)
        setData(res.data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [resStatus])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://readit-project.herokuapp.com/comment/${single}`)
        setCommentList(res.data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [resStatus])

  const deleteComment = async (single, commentId) => {
    try { 
      const res = await axios.delete(`https://readit-project.herokuapp.com/comment/${single}/${commentId}`)
      setResStatus(res)
    } catch (error){
      setResStatus(error.response)
    }
  }
  const deleteTopic = async (single) => {
    try { 
      const res = await axios.delete(`https://readit-project.herokuapp.com/topic/${single}`)
      setResStatus(res)
      navigate('/topic')
    } catch (error){
      setResStatus(error.response)
    }
  }

  const openUpdateForm = (e, single, commentId) => {
    e.preventDefault()
    updateDocument(single, commentId)
  }

  const updateDocument = async (single, commentId) => {
    const body = { text: updateInput }
    console.log(body, single, commentId)
    try { 
      const res = await axios.put(`https://readit-project.herokuapp.com/comment/${single}/${commentId}`, body)
      setResStatus(res)
      setUpdating('')
    } catch (error){
      console.log('Error message: ', error.response.data.message)
      setResStatus(error.response)
    }
  }

  const checkLogin = (comm) => {
    if (!localStorage.getItem('token')){
      setResStatus({ status: 'NoToken' })
      return false
    }
    const currentUserName = localStorage.getItem('userName')
    const authorTopic = comm.commentUser ? comm.commentUser : comm.topicUser 
    if (currentUserName !== authorTopic){
      setResStatus({ status: 'WrongToken' })
      return false
    }
    console.log(localStorage.getItem('userName'))
    return true
  }

  // this function changes the state (global variable) "user input" with what the user is typing.
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleUpdateChange = (e) => {
    setUpdateInput(e.target.value)
  }

  // it reset the value of "updating" to its original value, making the updating form disappear
  const cancelUpdating = (e) => {
    setUpdating('')
    setResStatus({ status: '' })
  }

  // It makes the request to the server to create a new comment using the userInput text and the autorization token provided
  const createComment = async (e) => {
    e.preventDefault()
    if (!checkLogin({ commentUser: localStorage.getItem('userName') }) || userInput === ''){
      return 
    }
    const body = { text: userInput }
    try {
      const res = await axios.post(`https://readit-project.herokuapp.com/comment/${single}`, body)
      setResStatus(res)
    } catch (error){
      setResStatus(error.response)
    }
    setUserInput('')
  }
  const likeTopic = async (Id, firstLike) => {
    try {
      
      console.log(localStorage.getItem('userName'))
      const body = { like: firstLike + 1 }
      const res = await axios.put(`https://readit-project.herokuapp.com/topic/${Id}`, body)
      setResStatus(body)
      console.log(res.data.message)
    } catch (error){
      console.log(error)
    }
  }
  const dislikeTopic = async (Id, firstLike) => {
    try {
      
      console.log(localStorage.getItem('userName'))
      const body = { dislike: firstLike + 1 }
      const res = await axios.put(`https://readit-project.herokuapp.com/topic/${Id}`, body)
      setResStatus(body)
      console.log(res.data.message)
    } catch (error){
      console.log(error)
    }
  }


  return (
    <div className="view">
      <div className='topic-header'>
        <h3>{data.topic}</h3>
        <img className="image" src={data.imageUrl}></img>
        <p className="comment-description">{data.description}</p> 
        <button className='delete' onClick={() => {
          if (checkLogin(data)) {
            deleteTopic(data._id)
            // navigate('/topic')
          }
        }
        }> DELETE </button> 
      </div>
      <div className="topic-like">
        <button onClick={() => likeTopic( data._id, data.like )}>👍
          <span>{data.like}</span></button>
        <button onClick={() => dislikeTopic( data._id, data.dislike )}>👎<span>{data.dislike}</span></button>
      </div>
      
      <ul className='comments'>
        { commentList ? 
          <>
            {commentList.map(c => {
              return (
                <li key={c._id}> 
                  { updating !== c._id && 
                  <> <p> {c.text} </p>
                    <div className='created-by-on'>
                      <p className='currentBy'> created by: {c.commentUser} </p>
                      <p className='currentOn'> created on: {c.createdAt.split('T')[0]} at {c.createdAt.split('T')[1].split('.')[0]} </p>
                    </div>
                    <button className='delete' onClick={() => {
                      if (checkLogin(c)) {
                        deleteComment(data._id, c._id)
                      }
                    }
                    }> DELETE </button> 
                    <button className='update' onClick={() => { 
                      if (checkLogin(c)){
                        setUpdating(c._id) 
                        setUpdateInput(c.text)
                        setResStatus('')
                      }
                    }} > UPDATE </button>
                  </> }
                  { updating === c._id && 
                  ( <form name ='update-com' onSubmit={(text) => openUpdateForm(text, data._id, c._id)}> 
                    <input type="text"
                      name= 'up-com'
                      defaultValue={c.text}
                      placeholder= 'edit comment'
                      onChange = {handleUpdateChange}>
                    </input> 
                    <button className='edit' type="submit">EDIT</button> or <button className='cancel' onClick={ cancelUpdating }>CANCEL</button> 
                  </form> ) 
                  }
                </li>
                
              )
            })}
            {/* This line displays an error message from the server in case the request is Unauthorized */}
          </>
          : 
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : 'Loading...'}
          </h2>
        }
      </ul>
      <div className='comment-form'>
        {/* This line displays the message from the server when a request has successfully completed (resStatus.data.message) */}
        { resStatus.status === 200 && <p className='post-comment'> {resStatus.data.message} </p>}
        { resStatus.status === 403 && <p className='comment-error'> ERROR: You can`t modify other users` comments!</p>}
        { resStatus.status === 'NoToken' && <p className='comment-error'> ERROR: Not logged in! Please <Link to = '/login'>Login</Link>!</p>}
        { resStatus.status === 'WrongToken' && <p className='comment-error'> ERROR: You cannot modify other users` contents!!</p>}
        <form onSubmit={createComment} className="form">
          <input type="text" placeholder="Comment Here" value= {userInput} onChange={handleChange}/>
          <button className='submit' type="submit">SEND</button>
        </form>
      </div>
    </div>
  )
}

export default CommentPage