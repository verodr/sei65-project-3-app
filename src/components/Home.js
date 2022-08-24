import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components


const Home = () => {
  const [ topic, setTopic ] = useState([])
  const [ errors, setErrors] = useState(false)
  const [ mostComments, setMostComments ] = useState([])
  const [ mostLikes, setMostLikes ] = useState([])

  // ! Executed
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/topic')
        // console.log(response)
        setTopic(data)
        //setLatestTopic(data)
        //console.log('data', data )
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getComment = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/highest-comment')
        // console.log(response)
        setMostComments(data)
        //setLatestTopic(data)
        //console.log('comment', data)
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getComment()
  }, [])

  useEffect(() => {
    const getLikes = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/most-likes')
        // console.log(response)
        setMostLikes(data)
        //setLatestTopic(data)
        //console.log('comment', data)
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getLikes()
  }, [])


  const updatedTopic = topic.splice(0,1)
  console.log('latest', updatedTopic)
  console.log('comment', mostComments)
  console.log('most likes', mostLikes)
  
  const homeTopics = updatedTopic.concat(mostComments, mostLikes)
  console.log('home topics', homeTopics)
  
  const labels = [
    {
      topicTitle: 'Latest Topic',
    },
    {
      topicTitle: 'Highest comments',
    },
    {
      topicTitle: 'Most Likes',
    }]


  return (
    <>
      <h1 className="text-center">Home Page</h1>
      <div className="topic-container">
        { homeTopics.map(titles => {
          const { _id, topic, description, imageUrl, topicUser, createdAt } = titles
          const date = createdAt.split('T')[0]
          const time = createdAt.split('T')[1]
          const actualTime = time.split('.')[0]
          // console.log('time', actualTime)

          return (
            <>
              {labels.map(header => {
                const { topicTitle } = header
                return (
                  <>
                    <div className="home-div">
                      <h2 className="text-center">{topicTitle}</h2>
                    </div>
                  
              
                    <div key={_id} className="topic">
                      <div className="topic-text">
                        <Link to={`/topic/${_id}`}>
                          <div className="topic-date">{topicUser} Added on: {date} at: {actualTime}</div>
                          <div className="title">{topic}</div>
                          <div className="description">{description}</div>
                        </Link>
                      </div> 
                      <div className="topic-image">
                        <img className="image" src={imageUrl}></img>
                      </div>
                    </div>
                  </>
                )
              })} 
            </>
          )
        })}
      </div>
    </>
  )
}
export default Home