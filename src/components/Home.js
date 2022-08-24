import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components

const Home = () => {
  // const [ topics, setTopics ] = useState({
  //   'mostComments': {},
  //   'latestTopic': {},
  //   'mostLikes': {},
  // })

  const [topics, setTopics ] = useState([])
  const [ errors, setErrors ] = useState(false)

  // ! Executed
  useEffect(() => {
    const getData = async () => {
      try {

        // const [latestTopic, mostComments, mostLikes] = await Promise.all([
        //   axios.get('http://localhost:4000/latest-topic'),
        //   axios.get('http://localhost:4000/highest-comment'),
        //   axios.get('http://localhost:4000/most-likes')
        // ])
        const { data: latestTopic } = await axios.get('http://localhost:4000/latest-topic')
        const { data: mostComments } = await axios.get('http://localhost:4000/highest-comment')
        const { data: mostLikes } = await axios.get('http://localhost:4000/most-likes')
        setTopics([...topics, { ...latestTopic, title: 'Latest Topic' }, { ...mostComments, title: 'Most Comments' }, { ...mostLikes, title: 'Most Likes' }])
        // setTopics([...topics, latestTopic, mostComments, mostLikes])
        // setTopics({ latestTopic: { ...latestTopic, title: 'Latest Topic' },
        //   mostComments: { ...mostComments, title: 'Most Comments' },
        //   mostLikes: { ...mostLikes, title: 'Most Likes' }, 
        // })
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    console.log('topics', topics)
  }, [topics])

  console.log('new topic', topics)

  return (
    <>
      <div className="topic-div">
        <h1 className="text-center"> Welcome!</h1>
      </div>
      <div className="topic-container">
        <div>
          {Object.values(topics).map(topic => (
            <>
              <div className="home-title">{topic.title}</div>
              <div key={topic[0]._id} className="topic">
                <div className="topic-text">
                  <Link to={`/topic/${topic[0]._id}`}>
                    <div className="topic-date">{topic[0].topicUser} Added on: {topic[0].createdAt.split('T')[0]} at: {topic[0].createdAt.split('T')[1].split('.')[0]}</div>
                    <div className="title">{topic[0].topic}</div>
                    <div className="description">{topic[0].description}</div>
                  </Link>
                </div>
                <div className="topic-image">
                  <img className="image" src={topic[0].imageUrl}></img>
                </div>        
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home