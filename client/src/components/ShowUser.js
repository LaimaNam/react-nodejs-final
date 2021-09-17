import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../App';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function RenderStudents() {
  const classes = useStyles();

  // context data
  const { usersList, setUsersList } = useContext(userContext);

  // side effects
  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then((users) => {
      setUsersList(users.data);
    });
  }, [setUsersList]);

  // custom functions
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`).then(() => {
      const newList = usersList.filter((user) => user._id !== id);
      setUsersList(newList);
    });
  };

  const updateUser = (id) => {};

  return (
    <>
      <h2>Vartotojai:</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vardas</TableCell>
              <TableCell align="right">Amžius</TableCell>
              <TableCell align="right">El.paštas</TableCell>
              <TableCell align="right">Slaptažodis</TableCell>
              <TableCell align="right">Atnaujinti</TableCell>
              <TableCell align="right">Trinti</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user, key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.password}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="update"
                    onClick={() => updateUser(user._id)}
                  >
                    <CreateIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
