import React from 'react'

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {DataContext} from '../Context';
class Pedidos extends React.Component {
    static contextType = DataContext;
    render() {
        const {pedidos} = this.context;
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
        function createData(pedido, cliente, fecha, hora, total, precio) {
            return {
                pedido,
                cliente,
                fecha,
                hora,
                total,
                precio,
                history: [
                    { nombre: '2020-01-05', precio: '11091700', cantidad: 3 },
                    { nombre: '2020-01-02', precio: 'Anonymous', cantidad: 1 },
                ],
            };
        }
        const rows = [
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
            createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
            createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
            createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
        ];
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            
                            <StyledTableCell>Pedido</StyledTableCell>
                            <StyledTableCell align="right">Cliente</StyledTableCell>
                            <StyledTableCell align="right">Direccion</StyledTableCell>
                            <StyledTableCell align="right">Telefono</StyledTableCell>
                            <StyledTableCell align="right">Productos</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {pedidos.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>{row.id}</StyledTableCell>
                                <StyledTableCell>{row.title}</StyledTableCell>
                                <StyledTableCell align="right">{row.direccion}</StyledTableCell>
                                <StyledTableCell align="right">{row.telefono}</StyledTableCell>
                                <StyledTableCell align="right">{row.contenido}</StyledTableCell>
                                <StyledTableCell align="right">{row.precio}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.pedido}
                </TableCell>
                <TableCell align="right">{row.cliente}</TableCell>
                <TableCell align="right">{row.fecha}</TableCell>
                <TableCell align="right">{row.hora}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Producto
                </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.nombre}
                                            </TableCell>
                                            <TableCell>{historyRow.precio}</TableCell>
                                            <TableCell align="right">{historyRow.cantidad}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.cantidad * row.precio * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Pedidos;