import React, { useState} from 'react';
import Tesseract from 'tesseract.js';
import { useSpeechSynthesis } from 'react-speech-kit';

const Temp = () => {


      const [isLoading, setIsLoading] = React.useState(false);
      const [image, setImage] = React.useState('');
      const [text, setText] = React.useState('');
      const [progress, setProgress] = React.useState(0);
      const [ value , setvalue] = useState("");
      
      const { speak } = useSpeechSynthesis();
    
      const handleSubmit = () => {
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
          });
      };
    
      
       const handleSpeech = ()=>{
         setvalue(text);
         console.log(value);
         speak({text:value});
       }

  return (
      <div className='con' style={{ height: '60px' }}>
      <div >
        <div>
          {!isLoading && (
            <h1 >Image To Text</h1>
          )}
          {isLoading && (
            <>
              <progress value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p >Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="inp1"

              />
              <input
                type="button"
                onClick={handleSubmit}
                value="Convert"
              />
            </>
          )}
          {!isLoading && text && (
            <>
              <textarea
                rows="30"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </>
          )}
        </div>
      </div> <br /><br />
      <div className='con'>
        <h2>Text To Speech Converter</h2>
       { // <textarea rows={10} onChange={(e) => { setvalue(e.target.value) }} /> 
       } 
        <button onClick={handleSpeech} >Convert</button>
      </div>
    </div>
  )
}

export default Temp;

