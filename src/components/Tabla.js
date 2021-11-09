import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#272537",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomizedTables = (props) => {
  let nomRows = props.nomRows
  let rows =  props.rows
  const [fil, setFil] = useState([]);
  const [nomFil, setNomFil] = useState([]);

  const nomFilas = () => {
    let f = []
    for (let i = 0; i < nomRows?.length; i++) {
      f.push(<StyledTableCell align="center" key={i}>{nomRows[i]}</StyledTableCell>)
    }
    setNomFil(f);
  }

  const filas = () => {
    
    let f = []
    for (let i = 0; i < rows?.length; i++) {
      let c = []
      for (let a = 0; a < rows[i]?.length; a++) {
        c.push(<StyledTableCell align="center" key={a}>{rows[i][a]}</StyledTableCell>)
      }
      f.push(<StyledTableRow key={i}>
        {c}
      </StyledTableRow>)
    }
    setFil(f);
  }

  useEffect(() => {
    nomFilas();
    filas();
  }, [rows])

  return (
    <TableContainer sx={{height:700, display:"block",overflow:"scroll"}} component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead sx={{position:"sticky", top: 0, zIndex: 10}}>
          <TableRow >
            {nomFil ? nomFil : <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          {fil ? fil : <></>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;