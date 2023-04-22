import React , { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import axios from 'axios';


const Login = () => {

  const navigate = useNavigate(); 

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  
  const handleSubmit= async()=>{
    console.log( email , password);
  try{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post('http://localhost:8000/api/v1/user/login', {email , password }, config).then(
        res => { 
          alert("Logged-in Successfully..!");
          let userinfo = JSON.stringify(res.data);
          localStorage.setItem('NewUser',userinfo );
          navigate('/');
        }
          ).catch( 
        err => alert("Wrong Credentials..!") );
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

const signUp =()=>{
  navigate('/register');
}

  return (
      <>
       <div className='reg-con'>
         <div className='empty'></div>
         <div className='reg-box'>
           <h2>Sign In</h2>
           <input type='email' placeholder="email"  onChange={(e)=>{setemail(e.target.value)}} value={email} required />
           <input type='password' placeholder='password' onChange={(e)=>{setpassword(e.target.value)}} value={password} required />
           <button type='submit' onClick={handleSubmit} >Login</button>
           <div className='reverse'>
              <p className='home' onClick={home} >Back to home</p>
              <p className='signup' onClick={signUp} >Sign Up</p>
           </div>
         </div>
       </div>
      </>
  )
}

export default Login