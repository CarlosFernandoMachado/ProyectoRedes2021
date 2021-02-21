import React, { useEffect, useState } from "react"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

class Producto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  componentDidUpdate(){
    
  }
  render() {
    return (
      <TablaProductos />
    );
  }
}

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

//function createData(title, cantidad, precio) {
  //return { title, cantidad, precio};
//}
function useDatos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch("http://localhost:9000/Productos")
      .then(response => response.json())
      .then(datos => {
        setProductos(datos)
      })
  }, [])

  return productos
}

//const rows = [
  //createData('Frozen yoghurt', 5, 50),
  //createData('Ice cream sandwich', 10, 18),
  //createData('Eclair', 2, 80),
  //createData('Cupcake', 20, 8),
  //createData('Gingerbread', 17, 12),
//];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TablaProductos() {

  const misproductos = useDatos();
  const classes = useStyles();
  const [state, setState] = React.useState({
    cantidad: '0',
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Cantidad</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
            <StyledTableCell align="right">Producto a comprar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {misproductos.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
              <StyledTableCell align="right">{row.precio}</StyledTableCell>
              <StyledTableCell align="right">
              <Select
                native
                value={state.cantidad}
                onChange={handleChange}
                inputProps={{
                  name: 'cantidad',
                }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Producto;