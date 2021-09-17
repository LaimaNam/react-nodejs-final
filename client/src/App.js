import './App.css';
import React, { useState, createContext } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './styles';

//components
import CreateUser from './components/CreateUser';
import ShowUser from './components/ShowUser';

//creating context api
export const userContext = createContext();

function App() {
  const classes = useStyles();
  // hooks
  // -- state
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: '',
    password: '',
  });
  const [usersList, setUsersList] = useState([]);

  return (
    <userContext.Provider value={{ user, setUser, usersList, setUsersList }}>
      <div className="App">
        <Container maxWidth="lg">
          <AppBar className={classes.AppBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              Vartotojų admin sistema
            </Typography>
          </AppBar>
          <Grow in>
            <Container>
              <Grid
                container
                justifyContent="space-between"
                alignItems="stretch"
              >
                <Grid item xs={12} sm={7}>
                  <AppBar
                    className={classes.appBar}
                    position="static"
                    color="inherit"
                  >
                    <ShowUser />
                  </AppBar>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AppBar
                    className={classes.appBar}
                    position="static"
                    color="inherit"
                  >
                    <CreateUser />
                  </AppBar>
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
      </div>
    </userContext.Provider>
  );
}

export default App;
