import React, { useState , useEffect , useContext} from 'react';
import './styles/Hero.css';
import Tesseract from 'tesseract.js';
import Modal from './Modal';
import axios from 'axios';
import Header from './Components/Header';
import {useNavigate} from 'react-router-dom';
import { TextContext } from './Context/TextContext';
import { ActivityContext } from './Context/ActivityContext';

const Hero = () => {

  const { Text , setText } =useContext(TextContext);
  const { activities , setActivities } =useContext(ActivityContext);
  const [userLoggedin , setUserLoggedin] = useState(false);
  const [id, setId] = useState('');
  const [postModal, setpostModal] = useState(true);
  const navigate=useNavigate();
  useEffect(async() => {
    if(localStorage.getItem('NewUser')){
      setUserLoggedin(true);
      console.log(localStorage.getItem("NewUser"));
      setId(JSON.parse(localStorage.getItem('NewUser')).result._id);
    }else{
      setUserLoggedin(false);
    }

    if(userLoggedin){
  //  await axios.get(`http://localhost:8000/api/v1/activity/${id}`).then(res =>{
  //     console.log("Fetching your Activities..." , res);
  //     setActivities(res.data);
  //     setText("");
  //   }).catch(err =>{console.log(err)})
    }

  }, [ userLoggedin, id]);



  var speech = new window.SpeechSynthesisUtterance();
  speech.lang = 'en';
  var voices = [];
  voices = window.speechSynthesis.getVoices();
  console.log(voices);
  speech.voice = voices[1];
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pitch, setpitch] = useState(1);
  const [rate, setrate] = useState(1);
  const [volume, setvolume] = useState(1);

  
  const handleClick = () => {

    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
        console.log(Text);
        if(userLoggedin){
          // try{
          //   const config = {
          //     headers: {
          //       "Content-Type": "application/json",
          //             },
          //          };
          //   const post = Text;
          //   axios.post(`http://localhost:8000/api/v1/activity/${id}`,post,config).then(res =>{
          //   console.log("Activity Saved successfully.." , res);
          // }).catch(err =>{console.log(err)})
          // } catch(err){
          //   console.log(err);
          // }
        }
      });
  }

  const handleVoice = () => {
    speech.text = Text;
    console.log("playing...")
    window.speechSynthesis.speak(speech);
}

 const femaleVoice1 =()=>{
  speech.voice = voices[2];
 }
 const femaleVoice2 =()=>{
  speech.voice = voices[12];
 }

 const maleVoice =()=>{
  speech.voice = voices[1];
 }

  const handlePause =()=>{
    // Pause the speechSynthesis instance
    window.speechSynthesis.pause();
    console.log("PAUSED")
}

const handleResume =()=>{
   // Resume the paused speechSynthesis instance
   window.speechSynthesis.resume();
   console.log("Resumed")
}

const handleCancel =()=>{
      // Cancel the speechSynthesis instance
      window.speechSynthesis.cancel();
      console.log("canceled")
 }

 function handleRate(e){
  // Get rate Value from the input
  setrate(e.target.value);
  console.log(rate)
  // Set rate property of the SpeechSynthesisUtterance instance
  speech.rate = rate;

  // Update the rate label
};

function handleVolume(e){
  // Get volume Value from the input
  setvolume(e.target.value);
  console.log(volume);
  // Set volume property of the SpeechSynthesisUtterance instance
  speech.volume = volume;


};

function handlePitch(e){
  // Get pitch Value from the input
  setpitch(e.target.value);
  console.log(pitch);
  // Set pitch property of the SpeechSynthesisUtterance instance
  speech.pitch = pitch;
};

 const tryanother=()=>{
   setText("");
   setImage("");
 }

 const Translate=()=>{
  
  
  navigate('/translate');
 }
  return (
    <>
      {
        !Text && (
          <div className='before-converting' >

            <div className='hero-con'>
              <div className='hero-left'>
                <div className='upload' style={{marginLeft:"260px"}}>

                  {
                    image ? (
                      <label htmlFor='input-file' className='gol' >
                        File Uploaded
                        <input type='file' className='file' id='input-file' onChange={(e) =>
                          setImage(URL.createObjectURL(e.target.files[0]))
                        } />

                      </label>
                    ) : (
                      <label htmlFor='input-file' className='gol' >
                        Upload Image Here
                        <input type='file' className='file' id='input-file' onChange={(e) =>
                          setImage(URL.createObjectURL(e.target.files[0]))
                        } />
                      </label>
                    )
                  }
                  <br></br>
                  <button className='btn' onClick={handleClick} >Convert</button>
                </div>
                {/* <div className='pdf'>
                  <label htmlFor='input-file' className='gol' >
                    Upload Pdf Here
                    <input type='file' className='file' id='input-file' />
                  </label>
                  <button className='btn'  >Convert</button>
                </div>
                <div className='camera'>
                  <label htmlFor='input-file' className='gol' >
                    Capture Image
                    <input type='file' className='file' id='input-file' />
                  </label>
                  <button className='btn' onClick={handleVoice} > Convert</button>
                </div> */}
              </div>
              <div className='hero-right'>
                { userLoggedin? (
                <>
                 <h4>Your Recent Activities</h4>
                 { activities.map((act, i) => {
                  return (   <p key={i} className="post" >{act.post}</p>  ) })}
                 </> 
                 ):(
                 <>
                  <h6>Login to see your recent activities</h6>
                  <p>No recent activities...</p>
                 </>
                  )}
               
              </div>
            </div>
           <Header />
          </div>
        )
      }

      {
        Text && (
          <div className='after-converting' >
            <div className='text-hero-con'>
              <div className='text-hero-left'>
                <h4>Your extracted text is here 👇</h4>
                <textarea>{Text}</textarea>
                <button className='tryother' onClick={tryanother} >Try Another</button>
                <button className='tryother2' onClick={Translate} >Translate</button>
              </div>
              <div className='text-hero-right'>
                <h5>Select The Voice </h5>
                <div className='voices'>
                  <p className='male' onClick={maleVoice} >Male</p>
                  <p className='female ' onClick={femaleVoice1}>Female 1</p>
                  <p className='female ' onClick={femaleVoice2}>Female 2</p>
                </div>
               { /*  <select>
                {   
                  voices.map((e, i) => { return ( <option key={i}  >voices[i]</option> ) })
                }
              </select>   */}
                <div className='music-con'>
                 <img src='music-3.jpg' alt='music' />
                </div>
                <div className='buttons-con'>
                <button id="start" className="btn btn-success mt-3 me-2 " onClick={handleVoice}  >Start</button>
                <button id="pause" className="btn btn-warning mt-3 me-2 " onClick={handlePause} >Pause</button>
                <button id="resume" className="btn btn-info mt-3  me-2"   onClick={handleResume}   >Resume</button>
                <button id="cancel" className="btn btn-danger mt-3 me-2" onClick={handleCancel}   >Cancel</button>
              </div>
              </div>
            </div>

            <div className="controls">
                <div>
                  <span className="lead ">Volume</span>
                  <input type="range" min="0" max="1" step="0.1" id="volume" value={volume} onChange={(e)=>{handleVolume(e)}} />
                  <span id="volume-label" className="ms-2">1</span>
                </div>
                <div className="mx-5">
                  <span className="lead">Rate</span>
                  <input type="range" min="0.1" max="10" id="rate" step="0.1" value={rate} onChange={(e)=>{handleRate(e)}} />
                  <span id="rate-label" className="ms-2">1</span>
                </div>
                <div>
                  <span className="lead">Pitch</span>
                  <input type="range" min="0" max="2" step="0.1" id="pitch" value={pitch} onChange={(e)=>{handlePitch(e)}} />
                  <span id="pitch-label" className="ms-2">1</span>
                </div>
              </div>
             <Header />
            </div> 
        )
      }
       { isLoading && (<Modal progress={progress} /> )}
    </>
  )
}


export default Hero;
