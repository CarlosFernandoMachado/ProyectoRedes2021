import React from "react"
import Navegacion from './Navbar/Navbar'
import Productos from "./Producto/Producto";
import Compras from "./Compras/Compras";
import Autenticacion from "./Autenticacion/Autenticacion";
import Admin from "./Admin/Admin";
import CrearProducto from './Crear-Modificar-Productos/CrearProducto'
import ModificarProducto from './Crear-Modificar-Productos/ModificarProductos'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direccion: 'Main',
        };
        this.Donde = this.Donde.bind(this);
        this.Redireccionar = this.Redireccionar.bind(this);
    }

    Donde() {
        console.log(this.state.direccion);
    }

    Redireccionar(ubicacion) {
        this.setState({ direccion: ubicacion });
    }

    render() {
        return (
            <Router>
                <Navegacion Redireccionar={this.Redireccionar} Donde={this.Donde} />
                <Switch>
                    <Route exact path="/" component={Productos} />
                    <Route path="/compras" component={Compras} />
                    <Route path="/autenticacion" component={Autenticacion} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/crearproducto" component={CrearProducto} />
                    <Route path="/modificarproducto" component={ModificarProducto} />
                </Switch>
            </Router>
        );
    }

}