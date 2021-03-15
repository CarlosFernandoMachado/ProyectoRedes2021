import React from "react"
import './Formulario.css'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class CrearProducto extends React.Component {

    render() {
        return (
            <div>
                <Grid  className="root">
                    <Grid item xs>
                        <TextField
                            label="Nombre"
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            label="Precio"
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            label="Cantidad"
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <div className="paper">
                    <Button size="large" variant="contained" color="primary" component={Link} to="/admin">Crear Producto</Button>
                </div>
            </div >
        );
    }

}

