import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'

/// Hacking the authorization - to be deleted!
const hacker = {
  headers: { Authorization: ''  },
}
/// end

const CommentPage = () => {
  const { single } = useParams()
  const [ data, setData] = useState([])
  const [ commentList, setCommentList ] = useState([])
  const [resStatus, setResStatus] = useState('')

  const [userInput, setUserInput] = useState('')

  const [ errors, setErrors ] = useState(false)


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
        setCommentList(res.data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [resStatus])

  const deleteComment = async (single, commentId) => {
    try { 
      const res = await axios.delete(`http://localhost:4000/comment/${single}/${commentId}`, hacker)
      setResStatus(res)
    } catch (error){
      setResStatus(error.response)
    }
  }
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    const body = { text: userInput }
    try {
      const res = await axios.post(`http://localhost:4000/comment/${single}`, body, hacker)
      setResStatus(res)
    } catch (error){
      setResStatus(error.response)
    }
  }


 


  return (
    <div className="view">
      <h3>{data.topic}</h3>
      <h4>{data.description}</h4>
      { resStatus.status === 200 && <p className='text-danger'> {resStatus.data.message} </p>}
      <form onSubmit={onSubmit} className="flex-column">
        <input
          type="text"
          placeholder="comment here"
          value= {userInput}
          onChange={handleChange}
        />
        <button type="submit">SEND</button>
      </form>
      <ul className='comments'>
        { commentList ? 
          <>
            {commentList.map(c => {
              return (
                <li key={c._id}> { c.text }
                  <button onClick={() => deleteComment(data._id, c._id)}> DELETE </button>
                  <button onClick={() => deleteComment(data._id, c._id)}> Update </button>
                </li>
                
              )
            })}
            { resStatus.status === 401 && <p className='text-danger'> ERROR: Unauthorized! </p>}
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