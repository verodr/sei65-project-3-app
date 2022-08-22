// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components


const TopicPage = () => {
  const [ topic, setTopic ] = useState([])
  const [ errors, setErrors] = useState(false)
  const [resStatus, setResStatus] = useState(null)
  const [data, setData] = useState([])


  // ! Executed
  useEffect(() => {
  // Get our bread data
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/topic')
        setTopic(data)
        console.log('data', data )
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getData()
  }, [resStatus])

  const likeTopic = async (Id, firstLike) => {
    try {
      
      console.log(localStorage.getItem('userName'))
      const body = { like: firstLike + 1 }
      const res = await axios.put(`http://localhost:4000/topic/${Id}`, body)
      setResStatus(firstLike)
      console.log(res.data.message)
    } catch (error){
      console.log(error)
    }
  }


  return (
    <>
      <div className="topic-div">
        <h1 className="text-center">Topics</h1>
      </div>
      <div className="topic-container">
        {topic.map(titles => {
          const { _id, topic, description, imageUrl, topicUser, createdAt, like } = titles
          
          // console.log('topic', topic)
          const date = createdAt.split('T')[0]
          const time = createdAt.split('T')[1]
          const actualTime = time.split('.')[0]
          // console.log('time', actualTime)

          return (
            <div key={_id} className="topic">
              <div className="topic-text">
                <Link to={`/topic/${_id}`}>
                  <div className="topic-date">{topicUser} Added on: {date} at: {actualTime}</div>
                  <div className="title">{topic}</div>
                  <div className="description">{description}</div>
                </Link>
                <div className="topic-like">
                  <button onClick={() => likeTopic( _id, like )}>👍
                    <span>{like}</span></button>
                </div> 
              </div> 
              <div className="topic-image">
                <img className="image" src={imageUrl}></img>
              </div>
            </div> 
          )
        })}
      </div>
    </>
  )
}
export default TopicPage