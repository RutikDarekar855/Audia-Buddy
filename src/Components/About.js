import React from 'react';
import  '../styles/About.css';
import{ useNavigate} from 'react-router-dom';

const About = () => {

  const navigate =useNavigate();
  const home =()=>{
    navigate('/');
  }
  return (
    <div className='about-con'>
      <div className='about-box'>
      <div className='profile-con'>
        <img style={
          {width:"300px" , height:"300px"}
        } id='pro' src='profile.jpg' />
      </div>
      <div  className='bio'>
        <h3>Rutik Darekar</h3>
        <p>Email :rutikdarekar1000@gmail.com </p>
        <p>Contact :7666722855 </p>
        <p> Full (MERN) Stack Developer </p>
        <button id='home-btn' onClick={home}>Back To Home</button>
      </div>
      </div> 
    </div>
  )
}

export default About