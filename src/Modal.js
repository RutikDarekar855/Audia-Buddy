import React from 'react'
import Spinner from './Spinner';
import './styles/Modal.css';

const Timepass = ({progress}) => {

  return (
    <div className='modal-con'>
      <div className='modal-box'>
           <h1>Please Wait!</h1>
           <Spinner />
           <>
              <progress value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p >Processing:- {progress} %</p>
            </>
      </div>
    </div>
  )
}

export default Timepass;