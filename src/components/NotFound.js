import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notFound'>
      <h1>404 Page Not Found</h1>
      <Link to='/'>Back to home</Link>
    </div>
  )
  
}

export default NotFound