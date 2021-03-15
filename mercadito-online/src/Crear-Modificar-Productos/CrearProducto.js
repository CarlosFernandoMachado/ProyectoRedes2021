import React from "react"
import './Formulario.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class CrearProducto extends React.Component {

    render() {
        const StyledTextField = withStyles((theme) => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                margin: '10px',
            },
        }))(TextField);
        return (
            <div>
                <div className="root">
                    <StyledTextField
                        label="Nombre"
                        variant="outlined"
                    />
                    <StyledTextField
                        label="Precio"
                        variant="outlined"
                    />
                    <StyledTextField
                        label="Cantidad"
                        variant="outlined"
                    />
                </div>
                <div className="paper">
                    <Button size="large" variant="contained" color="primary" component={Link} to="/admin">Crear Producto</Button>
                </div>
            </div >
        );
    }

}

