// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components


const TopicPage = () => {
  const [ topic, setTopic ] = useState([])
  const [ errors, setErrors] = useState(false)


  // ! Executed
  useEffect(() => {
  // Get our bread data
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/topic')
        // console.log(response)
        setTopic(data)
        console.log('data', data )
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getData()
  }, [])


  return (
    <>
      <div className="topic-div">
        <h1 className='text-center'>Topics</h1>
      </div>
      <div className="container">
        {topic.map(titles => {
          const { _id, topic, description, imageUrl, createdAt } = titles
          
          // console.log('topic', topic)
          const date = createdAt.split('T')[0]
          const time = createdAt.split('T')[1]
          const actualTime = time.split('.')[0]
          console.log('time', actualTime)

          return (
            <div key={_id} className="topic">
              <div className="topic-text">
                <Link to={`/topic/${_id}`}>
                  <div className="topic-date">Added on: {date} at: {actualTime}</div>
                  <div className="title">{topic}</div>
                  <div className="description">{description}</div>
                </Link>
                <div className="topic-like">👍 Likes: place variable here
                  <button className="topic-button">Click to like</button>
                </div> 
              </div> 
              <div className="topic-image">
                <img className="image" src={imageUrl} max-width="300"max-height="200"></img>
              </div>
            </div> 
          )
        })}
      </div>
    </>
  )
}
export default TopicPage