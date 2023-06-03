import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import CloseIcon from "@mui/icons-material/Close";
import AppleIcon from "@mui/icons-material/Apple";
import { TextField, Button } from "@mui/material";
import {FcGoogle} from 'react-icons/fc'
import IconButton from "@mui/material/IconButton";
import Swal from 'sweetalert2'
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function MyLogin() {
  const [disabled, setDisabled] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [hide, setHide] = useState(true);
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userData")) || [];

  const userExist = userDetails.find(
    (user) =>
      user.name === input || user.email === input || user.phone === input
  );
 
  function handleNext() {
    setDisabled(false);
    if (userExist) {
      setHide(false);
    } else {
      setError(true);
    }
  }

  function handleNextInput(e) {
    setInput(e.target.value);
    setDisabled(false);
  }

  function handleLoginInput(e) {
    setPassword(e.target.value);
    setLoginDisabled(false);
  }

  const validUser = userDetails.find((user) => user.password === password);
  const activeUser = userDetails.find(
    (user) => user.active.isActive === false && user.password === password
  );
  function handleLoginClick() {
    if (validUser) {
      const confirmation = Swal.fire(
        'congratulations!',
        'You are logged in successfully',
      )
      if (confirmation) {
        activeUser.active.isActive = true;
        localStorage.setItem("userData", JSON.stringify(userDetails));
        navigate("/");
      }
    }else{
      Swal.fire(
        'Sorry!',
        "Account does not exist.",
      )
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={style.main_div}>
      <div className={style.form_box}>
        <div className={style.header}>
          <div className={style.cross}>
            <p>
              {" "}
              <CloseIcon onClick={() => navigate(-1)} />{" "}
            </p>
          </div>
          <div className={style.logo}>
            <span>
              <TwitterIcon
                sx={{
                  color: " rgb(29, 155, 240)",
                  fontSize: "40px",
                }}
              />{" "}
            </span>
          </div>
        </div>
        <div className={style.form} style={{ display: hide ? "" : "none" }}>
          <span className={style.heading}>Sign in to Twitter</span>
          <Button
            sx={{ borderRadius: "35px", color: "black" }}
            variant="outlined"
          >
            {" "}
            <FcGoogle size={20} /> Sign Up with Google
          </Button>
          
          <Button sx={{ borderRadius: '40px', color: 'black' }} variant="outlined"> <AppleIcon /> Sign Up with Apple</Button>

          <span>or</span>
          <TextField
            sx={{ border: "1px" }}
            label="Phone, email, or username"
            variant="filled"
            error={error}
            helperText={error ? "Incorrect entry." : ""}
            value={input}
            onChange={handleNextInput}
          />
          <Button
            sx={{ borderRadius: "35px", bgcolor: "black" }}
            variant="contained"
            onClick={handleNext}
            disabled={disabled}
          >
            {" "}
            Next
          </Button>
          <Button
            sx={{ borderRadius: "35px", color: "black",":hover": {backgroundColor: '#dfe1e3', border: '1px solid #eee' }, border: '1px solid #eee' }}
            variant="outlined"
          >
            {" "}
            Forgot Password?
          </Button>
          <p>
            Don't have an account? <Link to="/signup"><span className={style.signupColor}>Sign up</span></Link>{" "}
          </p>
        </div>
        <div style={{ display: hide ? "none" : "" }}>
          <div className={style.loginForm}>
            <h1>Enter your password</h1>
            <TextField
              sx={{ width: "100%" }}
              label="Phone, email, or username"
              variant="filled"
              disabled
              value={input}
            />
            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              value={password}
              onChange={handleLoginInput}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              sx={{
                borderRadius: "35px",
                bgcolor: "black",
                height: "50px",
                marginTop: "60px",
              }}
              variant="contained"
              disabled={loginDisabled}
              onClick={handleLoginClick}
            >
              Log in{" "}
            </Button>
            <p>
              Don't have an account? <Link to="/signup"> <span className={style.signupColor}>Sign up</span></Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
