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

export default function EditUser() {
  const classes = useStyles();
  // hooks
  // -- local state
  const [message, setMessage] = useState('');
  const [userToUpdate, setUserToUpdate] = useState({
    id: '',
    name: '',
    age: 0,
    email: '',
    password: '',
  });

  //context data
  const { usersList, setUsersList } = useContext(userContext);

  //   custom functions

  const handleUserChange = (e) => {
    setUserToUpdate({ ...userToUpdate, id: e.target.value });
  };

  const editUser = (e) => {
    e.preventDefault();

    if (
      !userToUpdate.name ||
      !userToUpdate.age ||
      !userToUpdate.email ||
      !userToUpdate.password
    ) {
      setMessage('Please fill in all the fields');
      return;
    }

    axios
      .put(`http://localhost:5000/api/users/${userToUpdate.id}`, userToUpdate)
      .then(() => {
        setUserToUpdate({
          id: '',
          name: '',
          age: 0,
          email: '',
          password: '',
        });
        setMessage('User updated');
      });

    const newList = usersList.filter((user) => user._id !== userToUpdate.id);
    newList.push(userToUpdate);
    setUsersList(newList);
  };

  return (
    <>
      <h2>Redaguoti vartotoją:</h2>

      <form className={classes.root} noValidate autoComplete="off">
        <select name="" id="" onChange={(e) => handleUserChange(e)}>
          <option>Pasirinkti vartotoją</option>
          {usersList.map((user) => (
            <option value={user._id} key={user._id}>
              {user.name}, {user.email}
            </option>
          ))}
        </select>
        <br />
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          value={userToUpdate.name}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, name: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="age"
          variant="outlined"
          value={userToUpdate.age}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, age: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="email"
          type="email"
          variant="outlined"
          value={userToUpdate.email}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, email: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          value={userToUpdate.password}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, password: e.target.value })
          }
        />

        <Button variant="contained" color="primary" onClick={editUser}>
          Edit
        </Button>
        <p>{message}</p>
      </form>
    </>
  );
}
