import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {DataContext} from '../Context'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

class Compras extends React.Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;

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

        //Impuesto
        const TAX_RATE = 0.15;

        //Formato con 2 decimales
        function FormatoTotales(num) {
            return `${num.toFixed(2)}`;
        }

        const invoiceSubtotal = total;
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;
        return (
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
                                    <RemoveCircleIcon color="secondary" fontSize="small" onClick={() => reduction(row.id)}/>
                                    {row.cantidad}
                                    <AddCircleIcon color="secondary" fontSize="small" onClick={() => increase(row.id)}/>
                                    </StyledTableCell>
                                <StyledTableCell align="right">{row.precio}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {FormatoTotales(row.precio)}
                                    <RemoveShoppingCartIcon color="secondary" fontSize="small" onClick={() => removeProduct(row.id)}/>
                                    </StyledTableCell>
                            </StyledTableRow>
                        ))}

                        <StyledTableRow>
                            <StyledTableCell/>
                            <StyledTableCell colSpan={1} align="right">Subtotal</StyledTableCell>
                            <StyledTableCell/>
                            <StyledTableCell align="right">{FormatoTotales(total)}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell/>
                            <StyledTableCell align="right">I.S.V</StyledTableCell>
                            <StyledTableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</StyledTableCell>
                            <StyledTableCell align="right">{FormatoTotales(invoiceTaxes)}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell/>
                            <StyledTableCell colSpan={1} align="right">Total</StyledTableCell>
                            <StyledTableCell/>
                            <StyledTableCell align="right">{FormatoTotales(invoiceTotal)}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell colSpan={3}></StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant="contained">Comprar</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </StyledTable>
            </TableContainer>
        );
    }
}

export default Compras;