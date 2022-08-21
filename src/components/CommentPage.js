import { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'

// the below here just until I have login page
localStorage.setItem('userName', 'TheLady')

/// Hacking the authorization - to be deleted!
const hacker = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRoZUxhZHkiLCJlbWFpbCI6ImxhZHlAbWFpbCIsImlhdCI6MTY2MTA4MjkzNywiZXhwIjoxNjYxMjU1NzM3fQ.uusZEmgo2N-3W68N5NAcmbJ-3kC25IjnywR560DrYzc'
axios.defaults.headers.common['Authorization'] = hacker

/// end


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


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/topic/${single}`)
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
        const res = await axios.get(`http://localhost:4000/comment/${single}`)
        const result = res.data.map(c => ( { ...c, updating: false  }))
        setCommentList(result)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [resStatus])

  const deleteComment = async (single, commentId) => {
    try { 
      const res = await axios.delete(`http://localhost:4000/comment/${single}/${commentId}`)
      setResStatus(res)
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
      const res = await axios.put(`http://localhost:4000/comment/${single}/${commentId}`, body)
      setResStatus(res)
      setUpdating('')
    } catch (error){
      console.log(error.response)
      setResStatus(error.response)
    }
  }

  const checkLogin = (comm) => {
    if (!axios.defaults.headers.common['Authorization']) {
      setResStatus({ status: 'NoToken' })
      return false
    }
    const currentUserName = localStorage.getItem('userName')
    if (currentUserName !== comm.commentUser){
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

  // it reset the value of "updating" to false, making the updating form disappear
  const cancelUpdating = (e) => {
    setUpdating(false)
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
      const res = await axios.post(`http://localhost:4000/comment/${single}`, body)
      setResStatus(res)
    } catch (error){
      setResStatus(error.response)
    }
    setUserInput('')
  }


  return (
    <div className="view">
      <h3>{data.topic}</h3>
      <h4>{data.description}</h4>
      {/* This line displays the message from the server when a request has successfully completed (resStatus.data.message) */}
      { resStatus.status === 200 && <p className='text-danger'> {resStatus.data.message} </p>}
      
      <form onSubmit={createComment} className="flex-column">
        <input
          type="text"
          placeholder="comment here"
          value= {userInput}
          onChange={handleChange}
        />
        <button type="submit">SEND</button>
      </form>
      { resStatus.status === 403 && <p className='text-danger'> ERROR: You can`t modify other users` comments!</p>}
      { resStatus.status === 'NoToken' && <p className='text-danger'> ERROR: Not logged in! Please <Link to = '/login'>Login</Link>!</p>}
      { resStatus.status === 'WrongToken' && <p className='text-danger'> ERROR: You cannot modify other users` comments!!</p>}
      <ul className='comments'>
        { commentList ? 
          <>
            {commentList.map(c => {
              return (
                <li key={c._id}> 
                  { updating !== c._id && 
                  <> <p> {c.text} </p>
                    <p> created by: {c.commentUser} </p>
                    <button onClick={() => {
                      if (checkLogin(c)) {
                        deleteComment(data._id, c._id)
                      }
                    }
                    }> DELETE </button> 
                    <button value={commentList.indexOf(c)} onClick={() => { 
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
                      name={c._id}
                      defaultValue={c.text}
                      placeholder= 'edit comment'
                      onChange = {handleUpdateChange}>
                    </input> 
                    <button type="submit">EDIT</button> or <button onClick={ cancelUpdating }>CANCEL</button> 
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
    </div>
  )
}

export default CommentPage