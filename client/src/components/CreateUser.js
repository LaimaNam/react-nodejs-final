import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userContext } from '../App';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateUser() {
  const classes = useStyles();
  // hooks
  // -- local state
  const [message, setMessage] = useState('');

  //context data
  const { setUser, user, usersList, setUsersList } = useContext(userContext);

  // custom functions
  const createUser = (e) => {
    e.preventDefault();

    if (!user.name || !user.age || !user.email || !user.password) {
      setMessage('Please fill in all the fields');
      return;
    }

    axios.post('http://localhost:5000/api/users', user).then(() => {
      setUser({
        name: '',
        age: 0,
        email: '',
        password: '',
      });
      setMessage('');
    });

    setUsersList([...usersList, user]);
  };

  return (
    <>
      <h2>Pridėti vartotoją:</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          autoComplete="on"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="age"
          variant="outlined"
          autoComplete="on"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="email"
          type="email"
          variant="outlined"
          autoComplete="on"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          autoComplete="on"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <Button variant="contained" color="primary" onClick={createUser}>
          Pridėti
        </Button>
        <p>{message}</p>
      </form>
    </>
  );
}
