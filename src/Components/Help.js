import React from 'react';
import '../styles/help.css';
import { useNavigate } from 'react-router-dom';

const Help = () => {

    const navigate =useNavigate();

    const home=()=>{
        navigate('/');
    }

    return (
        <div className='help-con'>
            <div className='help-box'>
                <div className='help-left'>
                    <img id='email' src='/email3.png' />
                </div>
                <div className='help-right'>
                    <input type="text" placeholder='Name' />
                    <input type="number" placeholder='Contact' />
                    <textarea type="text" placeholder='Your Query...' />
                    <button>Submit</button>
                </div>
            </div>
                <button id='back' onClick={home}>Back To Home</button>
        </div>
    )
}

export default Help