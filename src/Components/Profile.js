import React from 'react';
import "../styles/Profile.css";
import Navbar from '../Components/Navbar.';
import { useState ,useEffect } from 'react';
import axios from 'axios';
const Profile = () => {


const [name, setname] = useState('');
const [email, setemail] = useState('');
const [oldpassword, setoldpassword] = useState('');
const [newpassword, setnewpassword] = useState('');
const [updated, setupdated] = useState(false);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('NewUser')).result._id;
    const getUser = async()=>{
      await axios.get(`http://localhost:8000/api/v1/user/${id}`).then(res =>{
      console.log("Getting user info..." , res.data);
      setname(res.data.name);
      setemail(res.data.email);
    }).catch(err =>{console.log(err)})
    }
    getUser();
  }, [updated]);
  

  const handleSubmit=()=>{
    const id = JSON.parse(localStorage.getItem('NewUser')).result;
    const updateUser = async()=>{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios.put(`http://localhost:8000/api/v1/user/${id}`,{name,email,oldpassword,newpassword},config).then(res =>{
      console.log("updating user info..." , res.data);
      setupdated(true);
      alert("Profile Updated successfully!");
    }).catch(err =>{alert("Old password does not matched!")});
       setoldpassword("");
       setnewpassword("");
    }
    updateUser();
  }


  return (
    <>
    <Navbar />
    <div className='profile'>
      <div className='proleft'>
        <div className='iconbox'>
          <img src='/download.jpg' />
        </div>
        <h3>{name}</h3>
      </div>
      <div className='proright'>
        <input type="text" placeholder="Username" value={name} onChange={(e)=>setname(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} />
        <input type="password" placeholder="Old Password" onChange={(e)=>setoldpassword(e.target.value)} />
        <input type="password" placeholder='New Password' onChange={(e)=>setnewpassword(e.target.value)} />
        <button onClick={handleSubmit} >Update</button>
      </div>
    </div>
  </>
  );
}

export default Profile;