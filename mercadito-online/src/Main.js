import React from "react"
import Navegacion from './Navbar/Navbar'
import Productos from "./Producto/Producto";
import Compras from "./Compras/Compras";
import Autenticacion from "./Autenticacion/Autenticacion";
import Admin from "./Admin/Admin";
import CrearProducto from './Crear-Modificar-Eliminar-Productos/CrearProducto'
import ModificarProducto from './Crear-Modificar-Eliminar-Productos/ModificarProductos'
import Pedidos from './Pedidos/Pedidos'
import Cart from './carrito/Cart.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
        };
    }
    Autenticar = () => {
        this.setState({ logged: true });
    }
    Salir = () => {
        this.setState({ logged: false });
    }
    EstaAutenticado = () => {
        if (this.state.logged) {
            return true
        }
        return false
    }
    render() {
        return (
            <Router>
                <Navegacion EstaAutenticado={this.EstaAutenticado} />
                <Switch>
                    <Route exact path="/" component={Productos} />
                    <Route path="/compras" component={Compras} />
                    <Route path="/autenticacion" render={(props) => (<Autenticacion {...props} Autenticar={this.Autenticar} />)} />
                    <Route path="/admin" render={(props) => (<Admin {...props} Salir={this.Salir} />)} />
                    <Route path="/crearproducto" component={CrearProducto} />
                    <Route path="/modificarproducto" component={ModificarProducto} />
                    <Route path="/carrito" component={Cart} />
                    <Route path="/pedidos" component={Pedidos} />
                </Switch>
            </Router>
        );
    }

}