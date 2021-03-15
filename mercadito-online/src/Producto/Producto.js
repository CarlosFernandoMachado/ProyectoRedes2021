import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

class Producto extends React.Component {
  render() {

    function createData(id, name, cantidad, precio) {
      return {id, name, cantidad, precio };
    }
    const rows = [
      createData(1,'Frozen yoghurt', 5, 50),
      createData(2,'Ice cream sandwich', 10, 18),
      createData(3,'Eclair', 2, 80),
      createData(4,'Cupcake', 20, 8),
      createData(5,'Gingerbread', 17, 12),
    ];

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

    const StyledTable = withStyles((theme) => ({
      root: {
          minWidth: 700,
      },
    }))(Table);

    return (
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">Cantidad</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Producto a comprar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
                <StyledTableCell align="right">{row.precio}</StyledTableCell>
                <StyledTableCell align="right">Aqui deberia ir un boton</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    );
  }
}

export default Producto;