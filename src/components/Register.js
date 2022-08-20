import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [ registerData, setRegisterData ] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '', 
  })
  
  const navigate = useNavigate()
  
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const res = await axios.post('http://localhost:4000/register', registerData)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setErrors(true)
    }
  
  }
  
  
  return (
    <div>
      <div>
        <h1>Registration form</h1>
      </div>
      {errors && <div className='error'>{errors}</div>}
      <form onSubmit={onSubmit}>
        <input 
          type='text' name='userName' placeholder='Username' value={registerData.userName} onChange={handleChange}
        />
        <input type='text' name='email' placeholder='Email' value={registerData.email} onChange={handleChange}
        />
        <input type='password' name='password' placeholder='Password' value={registerData.password} onChange={handleChange}
        />

        <input type='password' name='confirmPassword' placeholder='Confirm Password' value={registerData.confirmPassword} onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
    
  )
  
}

export default Register