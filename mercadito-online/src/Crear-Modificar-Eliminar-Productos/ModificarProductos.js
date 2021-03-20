import React from "react"
import './Formulario.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {DataContext} from '../Context';
export default class ModificarProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", cantidad: "", precio:"",id:"", redirect:false};
    
        this.Changetitle = this.Changetitle.bind(this);
        this.Changecantidad = this.Changecantidad.bind(this);
        this.Changeprecio = this.Changeprecio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      static contextType = DataContext;
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
        const url = "http://localhost:9000/Productos/"+this.props.location.state.id;
        axios.put(url, this.state).then(response => {
            console.log(response);
            this.setState({redirect:true});
        })
        .catch(error=>{
            console.log(error)
        })
       
      }
      componentDidMount(){
        this.setState({id:this.props.location.state.id});
        this.setState({title:this.props.location.state.title});
        this.setState({cantidad:this.props.location.state.cantidad});
        this.setState({precio:this.props.location.state.precio});
      }


    render() {
        const {actualizar_productos} = this.context;
        const StyledTextField = withStyles((theme) => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                margin: '10px',
            },
        }))(TextField);
        return (
            <div>
                {this.state.redirect ? (<Redirect push to="/admin"/>) : null}
                <form onSubmit={this.handleSubmit}>
                    <div className="root">
                        <TextField
                            label="Nombre"
                            
                            variant="outlined"
                            value={this.state.title}
                            onChange={this.Changetitle}
                        />
                        <TextField
                            label="Precio"
                            
                            variant="outlined"
                            value={this.state.precio}
                            onChange={this.Changeprecio}
                        />
                        <TextField
                            label="Cantidad"
                           
                            variant="outlined"
                            value={this.state.cantidad}
                            onChange={this.Changecantidad}
                        />
                    </div>
                    <div className="paper">
                        <Button size="large" variant="contained" color="primary"  onClick={() => actualizar_productos(this.state.id,this.state.title,this.state.cantidad,this.state.precio)} type="submit" value="Submit">Modificar Producto</Button>
                    </div>
                    
                </form>
               
            </div>
        );
    }

}

