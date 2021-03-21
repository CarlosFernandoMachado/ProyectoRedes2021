import React from 'react'
import './Compras.css'

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DataContext } from '../Context'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

class Compras extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", direccion: "", telefono: "" };

        this.Changetitle = this.Changetitle.bind(this);
        this.Changedireccion = this.Changedireccion.bind(this);
        this.Changetelefono = this.Changetelefono.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    static contextType = DataContext;
    Changetitle(event) {
        this.setState({ title: event.target.value });
    }
    Changedireccion(event) {
        this.setState({ direccion: event.target.value });
    }
    Changetelefono(event) {
        this.setState({ telefono: event.target.value });
    }
    componentDidMount() {
        this.context.getTotal();
    }
    render() {
        const { cart, addPedido, increase, reduction, removeProduct, total } = this.context;

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

        const StyledContainer = withStyles((theme) => ({
            root: {
                width: 800,
            },
        }))(Container);

        //Impuesto
        const TAX_RATE = 0.15;

        //Formato con 2 decimales
        function FormatoTotales(num) {
            return `${num.toFixed(2)}`;
        }

        const invoiceSubtotal = total;
        return (
            <div>
            <div className="datos">
                <Container component="main" disableGutters={true}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5">
                        Porfavor ingrese sus datos para recibir su pedido
                    </Typography>
                    <div className="papel">
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            type="text"
                            value={this.state.title} onChange={this.Changetitle}
                            className="datos-items"
                        />
                        <TextField
                            label="Direccion"
                            variant="outlined"
                            type="text"
                            value={this.state.direccion} onChange={this.Changedireccion}
                            className="datos-items"
                        />
                        <TextField
                            label="Telefono"
                            variant="outlined"
                            type="text"
                            value={this.state.telefono} onChange={this.Changetelefono}
                            className="datos-items"
                        />
                    </div>
                </Container>
            </div>
                <TableContainer component={Paper}>
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Articulo</StyledTableCell>
                                <StyledTableCell align="right">Cantidad a comprar</StyledTableCell>
                                <StyledTableCell align="right">Precio unitario</StyledTableCell>
                                <StyledTableCell align="right">Total Producto</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>{row.title}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <RemoveCircleIcon color="secondary" fontSize="small" onClick={() => reduction(row.id)} />
                                        {row.cantidad}
                                        <AddCircleIcon color="primary" fontSize="small" onClick={() => increase(row.id)} />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.precio}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {FormatoTotales(row.precio)}
                                        <RemoveShoppingCartIcon color="secondary" fontSize="small" onClick={() => removeProduct(row.id)} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell />
                                <StyledTableCell colSpan={1} align="right">Total</StyledTableCell>
                                <StyledTableCell />
                                <StyledTableCell align="right">{FormatoTotales(invoiceSubtotal)}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell colSpan={3}></StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" component={Link} to="/" onClick={() => addPedido(this.state.title, this.state.direccion, this.state.telefono)}>Comprar</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>

        );
    }
}

export default Compras;