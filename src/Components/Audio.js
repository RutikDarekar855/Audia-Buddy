import React from 'react'

const Audio = () => {
  return (
    <div>Audio</div>
  )
}

export default Audio;


/*
import React ,{useState} from 'react'

const Audio = () => {

      const [text, settext] = useState("");
    //  const [pitch, setpitch] = useState(1);
      const [voices, setvoices] = useState([]);
    //  const [rate, setrate] = useState(1);
    //  const [volume, setvolume] = useState(1);
      
            // Initialize new SpeechSynthesisUtterance object
            let speech = new window.SpeechSynthesisUtterance();

            // Set Speech Language
            speech.lang = "en";

            window.speechSynthesis.onvoiceschanged = () => {
                  // Get List of Voices
                  setvoices(window.speechSynthesis.getVoices());
                  // Initially set the First Voice in the Array.
                  speech.voice = voices[0];
                  // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
                 // let voiceSelect = document.querySelector("#voices");
                 // voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
            };

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

            function handleChangeVoice(e){
                  console.log(e.target.value);
                 // On Voice change, use the value of the select menu (which is the index of the voice in the global voice array)
                 speech.voice = voices[e.target.value];
                   
            }

            const handleStart =()=>{
                // Set the text property with the value of the textarea
                 console.log(text);
                 const newtext = text;
                // Start Speaking
                window.speechSynthesis.speak(text);
            }

            const handlePause =()=>{
                  // Pause the speechSynthesis instance
                  window.speechSynthesis.pause();
              }

              const handleResume =()=>{
                 // Resume the paused speechSynthesis instance
                 window.speechSynthesis.resume();
              }

              const handleCancel =()=>{
                    // Cancel the speechSynthesis instance
                    window.speechSynthesis.cancel();
               }

      return (
            <>
                  <div className="container mt-5 bg-dark">
                        <h1 className="text-light">Text to Speech</h1>
                        <p className="lead text-light mt-4">Select Voice</p>
                        <select id="voices" className="form-select bg-secondary text-light">
                              { voices.map((voice , i)=>{
                                    return(<option key={i} onChange={(e)=>{handleChangeVoice(e)}} >{voice.name}</option>)
                              }) }
                        </select>
                        <div className="d-flex mt-4 text-light">
                              <div>
                                    <p className="lead">Volume</p>
                                    <input type="range" min="0" max="1" value={volume} step="0.1" id="volume"   />
                                    <span id="volume-label" className="ms-2">{volume}</span>
                              </div>
                              <div className="mx-5">
                                    <p className="lead">Rate</p>
                                    <input type="range" min="0.1" max="10" value={rate} id="rate" step="0.1" />
                                    <span id="rate-label" className="ms-2">{rate}</span>
                              </div>
                              <div>
                                    <p className="lead">Pitch</p>
                                    <input type="range" min="0" max="2" value={pitch} step="0.1" id="pitch"  />
                                    <span id="pitch-label" className="ms-2">{pitch}</span>
                              </div>
                        </div>
                        <textarea className="form-control bg-dark text-light mt-5" cols="30" rows="10" placeholder="Type here..."
                            onChange={(e) =>{settext(e.target.value)}}></textarea>
                        <div className="mb-5">
                              <button id="start" className="btn btn-success mt-5 me-3" onClick={handleStart} >Start</button>
                              <button id="pause" className="btn btn-warning mt-5 me-3" onClick={handlePause}>Pause</button>
                              <button id="resume" className="btn btn-info mt-5 me-3"   onClick={handleResume}>Resume</button>
                              <button id="cancel" className="btn btn-danger mt-5 me-3"  onClick={handleCancel}>Cancel</button>
                        </div>
                  </div>
            </>
      );
}

export default Audio;

*/