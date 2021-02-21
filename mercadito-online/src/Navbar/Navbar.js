import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Compras from "../Compras/Compras";
import Autenticacion from "../Autenticacion/Autenticacion";
import Producto from "../Producto/Producto";



class Navbar extends React.Component {
    render() {
        return (
            <SimpleNavbar />
        );
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    shopButtons: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        minHeight: 128,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


function SimpleNavbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <ElevationScroll {...props}>
                        <AppBar>
                            <Toolbar className={classes.toolbar} >
                                <Typography variant="h4" className={classes.title} component={Link} to="/">
                                    Mercadito Online
                                </Typography>
                                <IconButton className={classes.shopButtons} color="inherit" aria-label="user" component={Link} to="/autenticacion">
                                    <AccountCircleIcon fontSize="large" />
                                </IconButton>
                                <IconButton className={classes.shopButtons} color="inherit" aria-label="cart" component={Link} to="/compras">
                                    <ShoppingCartIcon fontSize="large" />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </ElevationScroll>
                    <Toolbar />
                    <Toolbar />
                    <Switch>
                        <Route exact path="/" component={Producto} />
                        <Route path="/autenticacion" component={Autenticacion} />
                        <Route path="/compras" component={Compras} />
                    </Switch>
                </Router>
            </React.Fragment>
        </div>
    );
}


export default Navbar;