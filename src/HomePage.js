import React,{useState} from 'react';
import Navbar from './Components/Navbar.';
import './App.css';
import Hero from './Hero';
import Modal from './Modal';

const HomePage = () => {
 
      const [loading, setloading] = useState(false);

      return (
    
       <div className='body'>
        {
          loading?(<Modal/>):(<> 
          <Navbar /> 
          <Hero />
           </> )
        }
       </div>
      );
}

export default HomePage