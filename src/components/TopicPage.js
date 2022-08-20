// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

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
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getData()
  }, [])


  return (
    <Container as="main">
      <h1 className='text-center mb-4'>topic</h1>
      <Row>
        { topic.map(titles => {
          const { _id, topic, imageUrl } = titles
          console.log('topic', topic)
          return (
            <Col key={_id} md="6" lg="4" className='mb-4'>
              <Link to={`/topic/${_id}`}>
                <Card>
                  <Card.Img variant='top' src={imageUrl}></Card.Img>
                  <Card.Body className='bg-light'>
                    <Card.Title className='text-center mb-0'>{topic} - {}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        }) }
      </Row>
    </Container>
  )

}
export default TopicPage