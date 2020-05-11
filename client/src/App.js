import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  table: {
    minWidth: 850,
  },
});

const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  mm = mm < 10 ? `0${mm}` : mm;
  dd = dd < 10 ? `0${dd}` : dd;
  return yyyy + mm + dd;
};

function createData( state, hospitilized, deaths ) {
  return { state, hospitilized, deaths };
}

function App() {
  const [date, setDate] = useState(null);
  const [resources, setResources] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (date !== getTodayDate()) {
      fetch(`/data`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setDate(res.date);
          setResources(res.resources);
        })
    } 
  }, [])

  return (
    <Box bgcolor="aqua" mx="auto" display="flex" alignItems="center" flexDirection="column" width="70%">
      <h1 align="center">Data for Covid-19 in USA (per state)</h1>
      <TableContainer component={Paper} align="center">
        <Table className={classes.table} aria-label="simple table" bgcolor="#FFFFFE" style={{ width: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center"><h3>States in USA</h3></TableCell>
              <TableCell align="center" ><h3>Hospitilized&nbsp;(today)</h3></TableCell>
              <TableCell align="center"><h3>Total new corona deaths during the last 3 days</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { resources !== null 
              ? resources.map((row) => (
                <TableRow key={row.stateName}>
                  <TableCell component="th" scope="row" align="center">
                    {row.stateName}
                  </TableCell>
                  <TableCell align="center">{row.hospitilized !== null ? <b>{row.hospitilized}</b> : "n/a"}</TableCell>
                  <TableCell align="center">{row.deaths !== null ? <b>{row.deaths}</b> : "n/a"}</TableCell>
                </TableRow>
              ))
              : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;