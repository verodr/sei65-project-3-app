import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  
  const [ loginData, setloginData ] = useState({
    userName: '',
    password: '',
  })
  
  const navigate = useNavigate()
  
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value })
    setErrors(false)
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const res = await axios.post('http://localhost:4000/login', loginData)
      const { token } = res.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      navigate('/')
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.message)
    }
  
  }
  
  
  return (
    <div>
      <div>
        <h1>Login Form</h1>
      </div>
      {errors && <div className='error'>{errors}</div>}
      <form onSubmit={onSubmit}>
        <input 
          type='text' name='userName' placeholder='Username' value={loginData.userName} onChange={handleChange}
        />
        <input type='password' name='password' placeholder='Password' value={loginData.password} onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
  
}

export default Login