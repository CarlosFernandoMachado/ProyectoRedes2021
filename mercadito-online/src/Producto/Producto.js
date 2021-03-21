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
    const { cart, products, addCart, increase, reduction, removeProduct } = this.context;

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
                    <RemoveCircleIcon color="secondary" onClick={() => reduction(product.id)} />
                    <CantidadDeArticulos cart={cart} id={product.id}/>
                    <AddCircleIcon color="primary" onClick={() => addCart(product.id)} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                  <RemoveShoppingCartIcon color="secondary" onClick={() => removeProduct(product.id)}/>
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

function CantidadDeArticulos(props){
  const { cart, id } = props;
  var cantidad = 0;
  cart.forEach(element => {
    if (element.id == id) {
      cantidad = element.cantidad;
    }
  });
  return cantidad
}

export default Producto;