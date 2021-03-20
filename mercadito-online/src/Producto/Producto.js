import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { DataContext } from '../Context';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
export class Producto extends Component {
  static contextType = DataContext;
  render() {
    const { products, addCart, increase, reduction, removeProduct } = this.context;
    console.log(products);
    function createData(id, name, cantidad, precio) {
      return { id, name, cantidad, precio };
    }
    const rows = [
      createData(1, 'Frozen yoghurt', 5, 50),
      createData(2, 'Ice cream sandwich', 10, 18),
      createData(3, 'Eclair', 2, 80),
      createData(4, 'Cupcake', 20, 8),
      createData(5, 'Gingerbread', 17, 12),
    ];

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 20,
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
      <div id="product">
        <TableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="right">Precio unitario</StyledTableCell>
                <StyledTableCell align="right">Producto a comprar</StyledTableCell>
                <StyledTableCell align="right">Eliminar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell component="th" scope="row">{product.title}</StyledTableCell>

                  <StyledTableCell align="right">{product.precio}</StyledTableCell>
                  <StyledTableCell align="right">
                    <AddShoppingCartIcon color="secondary" fontSize="small" onClick={() => addCart(product.id)} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                  <RemoveShoppingCartIcon color="secondary" fontSize="small" onClick={() => removeProduct(product.id)}/>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </div>
    );
  }
}

export default Producto;