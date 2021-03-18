import React from 'react'
import './Navbar.css'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from "react-router-dom";
import { DataContext } from '../Context';


class Navbar extends React.Component {
    static contextType = DataContext;
    render() {
        const StyledBadge = withStyles((theme) => ({
            badge: {
                right: -3,
                top: 13,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }))(Badge);
        const { cart } = this.context;
        return (
            <div className="root">
                <React.Fragment>
                    <CssBaseline />
                    <AppBar>
                        <Toolbar className="toolbar">
                            <Typography variant="h3" className="titulo" component={Link} to="/">
                                Mercadito Online
                                </Typography>
                            <IconButton className="shopButtons" color="inherit" aria-label="user" component={Link} to="/autenticacion" onClick={() => console.log(this.props.EstaAutenticado())}>
                                {this.props.EstaAutenticado
                                    ? <ExitToAppIcon fontSize="large" />
                                    : <AccountCircleIcon fontSize="large" />
                                }
                            </IconButton>
                            <IconButton className="shopButtons" color="inherit" aria-label="cart" component={Link} to="/carrito">
                                <StyledBadge badgeContent={cart.length} color="secondary">
                                    <ShoppingCartIcon fontSize="large" />
                                </StyledBadge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className="espacio" />
                </React.Fragment>
            </div>
        );
    }
}

export default Navbar;