import React from "react"
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

class Admin extends React.Component {

  render() {
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

    function createData(name, cantidad, precio) {
      return { name, cantidad, precio };
    }
    const rows = [
      createData('Frozen yoghurt', 5, 50),
      createData('Ice cream sandwich', 10, 18),
      createData('Eclair', 2, 80),
      createData('Cupcake', 20, 8),
      createData('Gingerbread', 17, 12),
    ];
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className="table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="right">Cantidad</StyledTableCell>
                <StyledTableCell align="right">Precio</StyledTableCell>
                <StyledTableCell align="right">Modificar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
                  <StyledTableCell align="right">{row.precio}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton color="inherit" component={Link} to="/modificarproducto">
                      <CreateIcon fontSize="small"/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="paper">
          <Button size="large" variant="contained" color="primary" component={Link} to="/crearproducto">Crear Producto</Button>
        </div>
      </div>
    );
  }

}

export default Admin;