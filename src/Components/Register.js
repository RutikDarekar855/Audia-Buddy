import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import axios from 'axios';

const Register = () => {

   const navigate = useNavigate(); 

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');


  const handleSubmit= async()=>{
      console.log(name  , email , password);
    try{
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      await axios.post('http://localhost:8000/api/v1/user/register', { name, email , password }, config).then(
          res => { alert("Registered Successfully..!");
                   navigate('/login') }
          ).catch(
          err => console.log(err.data));
  
      setname('');
      setemail('');
      setpassword('');
    }
    catch(err){
      console.log(err);
    }
  }


  
const home =()=>{
  navigate('/');
}

const login =()=>{
 navigate('/login');
}

  return (
      <>
       <div className='reg-con'>
         <div className='empty'></div>
         <div className='reg-box'>
           <h2>Registration</h2>
           <input type='text' placeholder="Name" onChange={(e)=>{setname(e.target.value)}} value={name}  required/>
           <input type='email' placeholder="email" required  onChange={(e)=>{setemail(e.target.value)}} value={email} />
           <input type='password' placeholder='password' onChange={(e)=>{setpassword(e.target.value)}} value={password} />
           <button type='submit' onClick={handleSubmit} >Register</button>
           <div className='reverse'>
              <p className='home' onClick={home} >Back to home</p>
              <p className='signup' onClick={login} >Sign In</p>
           </div>
         </div>
       </div>
      </>
  )
}

export default Register;