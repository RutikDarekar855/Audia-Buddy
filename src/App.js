
import {Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Translate from './Components/Translate';
import HomePage from './HomePage';
import { TextContext } from './Context/TextContext';
import { ActivityContext } from './Context/ActivityContext';
import { useState } from 'react';
import Help from './Components/Help';
import Services from './Components/Services';
import About from './Components/About';

const App = () => {

  const [Text, setText] = useState(''); 
  const [ activities , setActivities] =useState([]);         

 return(
  <TextContext.Provider value={{Text ,setText}}>
    <ActivityContext.Provider value={{activities ,setActivities}}>
   <Routes>
     <Route path='/' element={<HomePage />} />
     <Route path='/register' element={<Register />} />
     <Route path='/login' element={<Login />} />
     <Route path='/profile' element={<Profile />} />
     <Route path='/translate' element={<Translate />} />
     <Route path='/help' element={<Help />} />
     <Route path='/services' element={<Services />} />
     <Route path='/about' element={<About />} />
   </Routes>
   </ActivityContext.Provider>
   </TextContext.Provider>
 )
};

export default App;



