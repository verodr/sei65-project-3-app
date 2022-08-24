import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components


const Home = () => {
  const [ topics, setTopics ] = useState({
    'mostComments': {},
    'latestTopic': {},
    'mostLikes': {},
  })
  const [ errors, setErrors ] = useState(false)

  // ! Executed
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: latestTopic } = await axios.get('http://localhost:4000/latest-topic')
        const { data: mostComments } = await axios.get('http://localhost:4000/highest-comment')
        const { data: mostLikes } = await axios.get('http://localhost:4000/most-likes')
        setTopics({ latestTopic: { ...latestTopic, title: 'Latest Topic' },
          mostComments: { ...mostComments, title: 'Most Comments' },
          mostLikes: { ...mostComments, title: 'Most Comments' }, 
        })
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

  // console.log('new topic', topics)
  //for (const latestTopic in topics) {
  //   return (
  //     <>
  //       <div>({topics.latestTopic[0].topic})</div>      
        

//     </>
//   )
}
export default Home