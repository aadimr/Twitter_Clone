import React, { useRef, useState } from 'react';

import {Link, useNavigate } from 'react-router-dom';
import style from './Registration.module.css'
import { TextField, Button } from '@mui/material';
import {FcGoogle} from 'react-icons/fc'
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
// import CloseIcon from '@mui/icons-material/Close';
import data from '../../data/userFake_DATA .json'
import Avatar from '@mui/joy/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { RxCross1 } from "react-icons/rx";
import Swal from 'sweetalert2';
import userFolllowData from '../../pages/home/rightSection/HappeningData'


export default function Registration() {
 
  const [hide, setHide] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [userImage, setUserImage] =useState('')
  const imageRef = useRef(null)

  const [EM, setEM] = useState('');
  const [PW, setPW] = useState('');
  const [Ph, setPh] = useState('');
  const [UN, setUN] = useState('');
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  function validateName(name) {
    const regex = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
    if (regex.test(name)) {
      return ""
    }
    return "name must contain only alphabets and at-least 3 alphabets are required.";
  }  

  function handleName(event) {
    setName(event.target.value)
    setError(false)
    setUN(() =>validateName(event.target.value))
  }

  function validatePhone(phone) {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;;
    if (regex.test(phone)) {
      return ""
    }
    return "Invalid phone number";
  }  

  function handlePhone(event) {
    setPhone(event.target.value)
    setPh(() =>validatePhone(event.target.value))
  }

  function validateEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if(!regex.test(email)){
      return "Invalid email"
    }
    return "";
 }

 function handleEmailChange(event) {
   setEmail(event.target.value);
   setEM(() =>validateEmail(event.target.value))
 }


  function validatePassword(password){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if(!regex.test(password)){
       return "Password must be min one Capital letter,min one digit & min 8 letter"
    }
      return ""
  }
  
  function handlePassword(event) {
    setPassword(event.target.value);
    setPW(() =>validatePassword(event.target.value))
  }

  function handleUserImage(e){
    
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserImage(reader.result);
    };
  }

  function handleSignup() {
    const storeduser = JSON.parse(localStorage.getItem('userData')) || []

    const existingUser = storeduser.find((user) =>  user.email === email || user.phone === phone)

    if (existingUser) {
      Swal.fire(
        'Opps...',
        'email or phone already exists',
      )
    }



    const userData = {
      name, email, password, phone, 
      active: {
        isActive: false
      },
      userImage,
      

    }
    const updatedUser = [...storeduser, userData]



    if (name && phone && email && password ) {

      if (EM === "Invalid email" || PW === "Password must be min one Capital letter,min one digit & min 8 letter" || Ph === "Invalid phone number" || UN === "name must contain only alphabets and at-least 3 alphabets are required.") {
        Swal.fire(
          'Opps!',
          'you have entered wrong details',
        )
      } else {
      const confirmation =  Swal.fire(
        'congratulations!',
        'You are registered successfully.',
      )
        if (confirmation) {
          localStorage.setItem('userData', JSON.stringify(updatedUser))
          localStorage.setItem('data', JSON.stringify(data.splice(0,10)))
          localStorage.setItem('followData', JSON.stringify(userFolllowData))
          navigate('/login')
        }

      }
    } else {
      
      setError(true)
      Swal.fire(
        'Wait...',
        'All fields are mandatory.',
      )
    }


  }
  return (
    <div className={style.main_div}>
      <div className={style.form_box}>

      <div className={style.header}>
              {/* <div className={style.cross}>
                <p> <CloseIcon onClick={() => navigate(-1)} /> </p>
              </div> */}
              <div className={style.logo}>

                <span><TwitterIcon sx={{
                  color: ' rgb(29, 155, 240)',
                  fontSize: '40px'
                }} /> </span>
              </div>
              </div>

        <div className={style.form_data}>
          <div className={style.form_buttons} >

         

            <div className={style.create_field} style={{ display: hide ? 'none' : '' }}>

              <div >
                <h1>Join Twitter today</h1>
              </div>

              <Button sx={{ borderRadius: '40px', color: 'black' }} variant="outlined"> <FcGoogle size={20}/> Sign Up with Google</Button>
              <Button sx={{ borderRadius: '40px', color: 'black' }} variant="outlined"> <AppleIcon /> Sign Up with Apple</Button>
              
              <div className={style.hrr}>
              {/* <hr /> */}
              <span>or</span>
              </div>

              <Button sx={{
                borderRadius: '40px',
                background: 'black',
                color: 'white',
                overflow: 'none'
              }} variant="contained" onClick={() => setHide(true)}>Create account</Button>
              <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span> , including <span> Cookie Use</span>.</p>
              <div className={style.bottum}>
                <h4>Have an account already? <Link to='/login'><span >Log in</span></Link> </h4>
              </div>
            </div>
            <div className={style.textfield} style={{ display: hide ? '' : 'none' }}>
              <h1>Create your account</h1>
              <div className={style.userPic}>

              
              <input type="file" hidden ref={imageRef} onChange={handleUserImage} />
              <Avatar variant="soft" alt="Remy Sharp" src={userImage} size="lg" sx={{ width: 50, height: 50 }}  />
              <CameraAltIcon onClick={() => imageRef.current.click()}/> 
              {userImage && (
                  <div className="image-container">
                   
                      <RxCross1 className={style.cancel__btn} onClick={() => setUserImage("")} />
 
                  </div>
                    )}
              </div>
              <TextField sx={{ 
                width: '100%'
              }} label="Name" variant="outlined" type='text'  value={name}  helperText={UN && <p>{UN}</p>} onChange={handleName} required={true} error={error || UN} />
              <TextField sx={{
                width: '100%'
              }} label="Phone" variant="outlined" type='number'  helperText={Ph && <p>{Ph}</p>}  value={phone} onChange={handlePhone} required={true} error={error || Ph}/> 
              <TextField sx={{
                width: '100%'
              }} label="Email" variant="outlined" type='email'  value={email} helperText={EM && <p>{EM}</p>}  onChange={handleEmailChange} required={true} error={error || EM}/> 
              <TextField sx={{
                width: '100%'
              }} label="Password" variant="outlined" type='password' helperText={PW && <p>{PW}</p>}   value={password} onChange={handlePassword} required={true} error={error || PW}/> 
             
              <div >
                {/* {registrationError && <p>{registrationError}</p>} */}
               

                </div>

             
                  <div className={style.signup_btn}>
                <Button sx={{
                  width: '100%',
                  borderRadius: '40px',
                  background: 'black',
                  color: 'white',
                  overflow: 'none',
                  height: '40px'
                }} variant="contained" onClick={handleSignup}>Sign up</Button>
              </div>



            </div>

          </div>


        </div>

      </div>

    </div>
  )
}
