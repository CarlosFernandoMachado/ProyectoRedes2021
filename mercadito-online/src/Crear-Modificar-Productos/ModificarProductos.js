import React from "react"
import './Formulario.css'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class ModificarProducto extends React.Component {



    render() {
        return (
            <div>
                <Grid container className="root" justify="center">
                    <Grid item xs={3}>
                        <TextField
                            label="Nombre"
                            defaultValue="Eclair"
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Precio"
                            defaultValue="2"
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Cantidad"
                            defaultValue="80"
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <div className="paper">
                    <Button size="large" variant="contained" color="primary" component={Link} to="/admin">Modificar Producto</Button>
                </div>
            </div>
        );
    }

}

