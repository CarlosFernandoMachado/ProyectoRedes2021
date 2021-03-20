import React from "react"
import './Formulario.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
export default class CrearProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", cantidad: "", precio:""};
    
        this.Changetitle = this.Changetitle.bind(this);
        this.Changecantidad = this.Changecantidad.bind(this);
        this.Changeprecio = this.Changeprecio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      Changetitle(event) {
        this.setState({title: event.target.value});
      }
      Changecantidad(event) {
        this.setState({cantidad: event.target.value});
      }
      Changeprecio(event) {
        this.setState({precio: event.target.value});
      }
      handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:9000/Productos', this.state)
        .then(response=>{
            alert("Se agrego un nuevo producto");
        })
        .catch(error=>{
            console.log(error)
        })
       
      }
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
                <form onSubmit={this.handleSubmit}>
                <div className="root">
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        type="text" 
                        value={this.state.title} onChange={this.Changetitle}
                    />
                    <TextField
                        label="Precio"
                        variant="outlined"
                        type="text" 
                        value={this.state.precio} onChange={this.Changeprecio}
                    />
                    <TextField
                        label="Cantidad"
                        variant="outlined"
                        type="text" 
                        value={this.state.cantidad} onChange={this.Changecantidad}
                    />
                </div>
                <div className="paper">
                    <Button size="large" variant="contained" color="primary" type="submit" value="Submit">Crear Producto</Button>
                </div>
                <div className="paper">
                    <Button size="large" variant="contained" color="primary" component={Link} to="/admin">Cancelar</Button>
                </div>
                </form>
                
            </div >
        );
    }

}

