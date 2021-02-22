import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class CrearProducto extends React.Component {

    render() {
        return (
            <Formulario />
        );
    }

}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
}));

function Formulario() {
    const classes = useStyles();
    return (
        <div>
            <Grid container className={classes.root} direction="row" justify="center" alignItems="baseline">
                <TextField
                    label="Nombre"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Precio"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Cantidad"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <div className={classes.paper}>
                <Button size="large" variant="contained" color="primary">Crear Producto</Button>
            </div>
        </div>
    );
}

