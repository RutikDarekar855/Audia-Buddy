import React,{useState,useEffect , useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar.';
import '../styles/Translate.css';
import axios from 'axios';
import Modal from '../Modal';
import { TextContext } from '../Context/TextContext';

const Translate = () => {

  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const { Text , setText } =useContext(TextContext);
  var speech = new window.SpeechSynthesisUtterance();
  speech.lang = 'en';
  var voices = [];
  voices = window.speechSynthesis.getVoices();
  console.log(voices);
  speech.voice = voices[12];
  const [pitch, setpitch] = useState(1);
  const [rate, setrate] = useState(1);
  const [volume, setvolume] = useState(1);
  const navigate=useNavigate();
  
  const [translate, settranslate] = useState("Your extracted text is here 👇 ")
  const [modal , setModal]= useState(false);

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
   
 }

 const handleTranslate = () => {
  // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
 
  setModal(true);
  const params = new URLSearchParams();
  params.append('q', Text);
  params.append('source', from);
  params.append('target', to);
  params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

  axios.post('https://libretranslate.de/translate',params, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(res=>{
    console.log(res.data)
    setText(res.data.translatedText)
    settranslate("Your translated text is here 👇")
    setModal(false);
  })
};

useEffect(() => {
  axios
    .get('https://libretranslate.de/languages', {
      headers: { accept: 'application/json' },
    })
    .then((res) => {
      console.log(res.data);
      setOptions(res.data);
    });
}, []);

  return (
  <div className='body'>
   <Navbar />
    <div className='after-converting' >
    <div className='text-hero-con'>
      <div className='text-hero-left'>
        <h4 id='trans-box' >{translate} </h4>
        <textarea onChange={(e)=>setText(e.target.value)} value={Text} ></textarea>
        <select className='tryother' onClick={tryanother} onChange={(e) => setTo(e.target.value)} >
          {options.map((opt)=>(
            <option key={opt.code} value={opt.code} >{opt.name}</option>
          ))}
        </select>
        <button id='trans' className='tryother2' onClick={handleTranslate} >Translate</button>
      </div>
      <div className='text-hero-right'>
        <h5>Voice : Google (Hindi) </h5>
        <div className='voices'>
          <p id='hindi' className='female' onClick={femaleVoice2}>Female </p>
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
    { modal && (<Modal />) }
  </div>
  )
}

export default Translate;