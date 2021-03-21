import React from "react"
import './Admin.css'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {DataContext} from '../Context'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {productos: []};
  }
  static contextType = DataContext;
  //Esta funcion actualmente no se utiliza para nada ahah
  componentDidMount() {
    fetch("http://localhost:9000/Productos")
      .then(async res => {
        const data = await res.json();

        if (!res.ok) {
          const error = (data && data.message) || Response.status.Text;
          return Promise.reject(error);
        }
        this.setState({ productos: data });

      })
      .catch(error => {

      })
  }
  render() {
    const {products,removeProductoInventario,actualizar_productos} = this.context;
    
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
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="right">Cantidad</StyledTableCell>
                <StyledTableCell align="right">Precio</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell component="th" scope="row">{product.id}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{product.title}</StyledTableCell>
                  <StyledTableCell align="right">{product.cantidad}</StyledTableCell>
                  <StyledTableCell align="right">{product.precio}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton color="inherit" component={Link} to={{pathname: "modificarproducto",state:{id: product.id, title:product.title, cantidad:product.cantidad, precio:product.precio}}}>
                      <CreateIcon fontSize="small"/>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => removeProductoInventario(product.id)}>
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="grid-container">
          <Button className="grid-item" size="large" variant="contained" color="primary" component={Link} to="/crearproducto">Crear Producto</Button>
          <Button className="grid-item" size="large" variant="contained" color="primary" component={Link} to="/pedidos">Ver Pedidos Hechos</Button>
          <Button className="grid-item" size="large" variant="contained" color="primary" component={Link} to="/" onClick={() => this.props.Salir()}>Salir</Button>
        </div>
      </div>
    );
  }

}

export default Admin;