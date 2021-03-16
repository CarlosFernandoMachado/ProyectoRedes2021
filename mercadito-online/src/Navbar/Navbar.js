import React from 'react'
import './Navbar.css'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import {  Link } from "react-router-dom";
import {DataContext} from '../Context';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = DataContext;
    render() {
        const {cart} = this.context;
        return (
            <div className="root">
                <React.Fragment>
                    <CssBaseline />
                    <AppBar>
                        <Toolbar className="toolbar">
                            <Typography variant="h3" className="titulo" component={Link} to="/">
                                Mercadito Online
                                </Typography>
                            <IconButton className="shopButtons" color="inherit" aria-label="user" component={Link} to="/autenticacion">
                                <AccountCircleIcon fontSize="large" />
                            </IconButton>
                            <IconButton className="shopButtons" color="inherit" aria-label="cart"  component={Link} to="/carrito">
                                <span>{cart.length}</span>
                                <ShoppingCartIcon fontSize="large" />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className="espacio"/>
                </React.Fragment>
            </div>
        );
    }
}

export default Navbar;