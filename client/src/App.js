import React from 'react';
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
    minWidth: 650,
  },
});

function createData( state, hospitilized, deaths ) {
  return { state, hospitilized, deaths };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

function App() {
  const classes = useStyles();

  return (
    <Box bgcolor="blue" mx="auto" display="flex" alignItems="center" flexDirection="column" width="80%">
      <h1>Data for Covid-19 in USA (per state)</h1>
      <TableContainer component={Paper} align="center">
        <Table className={classes.table} aria-label="simple table"  style={{ width: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>States in USA</b></TableCell>
              <TableCell align="center"><b>Hospitilized</b>&nbsp;(today)</TableCell>
              <TableCell align="center"><b>Total new corona deaths during the last 3 days</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.state}>
                <TableCell component="th" scope="row" align="center">
                  {row.state}
                </TableCell>
                <TableCell align="center">{row.hospitilized}</TableCell>
                <TableCell align="center">{row.deaths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;