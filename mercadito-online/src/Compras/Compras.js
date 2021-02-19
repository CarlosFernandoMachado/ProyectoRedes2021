import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Compras extends React.Component {
    render() {
        return (
            <Carrito/>
        );
    }
}

//Estilo de las celdas
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

//Estilo de las filas
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
//Impuesto
const TAX_RATE = 0.07;

//Estilo general de la tabla
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

//Formato con 2 decimales
function FormatoTotales(num) {
    return `${num.toFixed(2)}`;
}

//Calcula el total de UN producto
function TotalProducto(cantidad, precio) {
    return cantidad * precio;
}

//Crea las filas para la tabla
function createRow(nombre, cantidad, precio) {
    const total = TotalProducto(cantidad, precio);
    return { nombre, cantidad, precio, total };
}

//Calcula el subtotal de todos los productos
function CalcularSubtotal(items) {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Ice cream sandwich', 2, 10),
    createRow('Gingerbread', 3, 17),
];

const invoiceSubtotal = CalcularSubtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Carrito() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Articulo</StyledTableCell>
                        <StyledTableCell align="right">Cantidad a comprar</StyledTableCell>
                        <StyledTableCell align="right">Precio unitario</StyledTableCell>
                        <StyledTableCell align="right">Total Producto</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.nombre}>
                            <StyledTableCell>{row.nombre}</StyledTableCell>
                            <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
                            <StyledTableCell align="right">{row.precio}</StyledTableCell>
                            <StyledTableCell align="right">{FormatoTotales(row.precio)}</StyledTableCell>
                        </StyledTableRow>
                    ))}

                    <StyledTableRow>
                        <StyledTableCell rowSpan={3} />
                        <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
                        <StyledTableCell align="right">{FormatoTotales(invoiceSubtotal)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>I.S.V</StyledTableCell>
                        <StyledTableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</StyledTableCell>
                        <StyledTableCell align="right">{FormatoTotales(invoiceTaxes)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={2}>Total</StyledTableCell>
                        <StyledTableCell align="right">{FormatoTotales(invoiceTotal)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                    <StyledTableCell colSpan={3}></StyledTableCell>
                        <StyledTableCell align="right">
                        <Button variant="contained">Comprar</Button>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Compras;