import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import thoughts from '../../images/thoughts.png';
import useStyles from './styles'

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const location = useLocation();


  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    
    navigate('/');
    window.location.reload(false);
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    // JWT
    /* eslint-disable */
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  /* eslint-enable */

  return (
    <AppBar className={classes.appBar} position="static" color="inherit" >
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Thoughts</Typography>
        <img className={classes.image} src={thoughts} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;