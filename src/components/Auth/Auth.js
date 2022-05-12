import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import useStyles from './styles';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
// import Icon from './icon';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const clientId = "57366438895-7ipjaangh3qn68hejkrde5a6m106u6op.apps.googleusercontent.com"; // add it to env later
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  
  const handleSubmit = () => {
    console.log('hello')
  };

  const handleChange = () => {
    console.log('hello')
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = await jwt_decode(token);
    // console.log("ID: " + result.sub);
    // console.log('Full Name: ' + result.name);
    // console.log('Given Name: ' + result.given_name);
    // console.log('Family Name: ' + result.family_name);
    // console.log("Image URL: " + result.picture);
    // console.log("Email: " + result.email);
    try {
      dispatch({ type: 'AUTH', data: { result, token} });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />           
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />           
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleOAuthProvider clientId={clientId} >
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleFailure}
              className={classes.googleButton}
            />
          </GoogleOAuthProvider>;
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth